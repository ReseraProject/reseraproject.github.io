import { describe, expect, test } from 'bun:test'
import {
  filterOpportunities,
  isOpportunityClosed,
  sortOpportunities,
  type OpportunityRecord
} from '../app/utils/opportunities'
import { validateOpportunities } from '../scripts/validate-opportunities'

const today = new Date('2026-09-12T12:00:00Z')

function opportunity(overrides: Partial<OpportunityRecord> = {}): OpportunityRecord {
  return {
    slug: 'open-lab-role',
    title: 'Open lab role',
    organization: 'Example Institute',
    summary: 'Investigate a focused research question.',
    description: 'Work with a research team on a focused question.',
    field: 'natural-sciences',
    location: '',
    remote: true,
    eligibility: 'Students interested in research.',
    deadline: '2026-10-01',
    source_url: 'https://example.org/apply',
    published_at: '2026-09-01',
    featured: false,
    ...overrides
  }
}

describe('opportunity content', () => {
  test('accepts an empty launch dataset', () => {
    expect(validateOpportunities([])).toEqual([])
  })

  test('accepts active, expired, remote, in-person, and deadline-free records', () => {
    const records = [
      opportunity(),
      opportunity({ slug: 'expired', deadline: '2026-09-01' }),
      opportunity({ slug: 'in-person', remote: false, location: 'Seattle, WA' }),
      opportunity({ slug: 'open-ended', deadline: null })
    ]
    expect(validateOpportunities(records)).toEqual([])
    expect(isOpportunityClosed(records[1], today)).toBe(true)
    expect(isOpportunityClosed(records[3], today)).toBe(false)
  })

  test('filters by status, field, location, and keyword', () => {
    const records = [
      opportunity({ slug: 'featured-ai', title: 'AI fellowship', field: 'technology', featured: true }),
      opportunity({ slug: 'past-biology', deadline: '2026-09-01' }),
      opportunity({ slug: 'local-policy', title: 'Policy archive', field: 'humanities', remote: false, location: 'Boston, MA' })
    ]
    expect(filterOpportunities(records, { status: 'active' }, today).map(item => item.slug)).toEqual(['featured-ai', 'local-policy'])
    expect(filterOpportunities(records, { status: 'past' }, today).map(item => item.slug)).toEqual(['past-biology'])
    expect(filterOpportunities(records, { field: 'humanities', location: 'in-person', search: 'Boston', status: 'all' }, today).map(item => item.slug)).toEqual(['local-policy'])
  })

  test('sorts featured records first and deadlines before open-ended records', () => {
    const records = [
      opportunity({ slug: 'open-ended', deadline: null }),
      opportunity({ slug: 'later', deadline: '2026-11-01' }),
      opportunity({ slug: 'featured', deadline: null, featured: true })
    ]
    expect(sortOpportunities(records).map(item => item.slug)).toEqual(['featured', 'later', 'open-ended'])
  })

  test('rejects malformed records and duplicate slugs', () => {
    const malformed = opportunity({ source_url: 'javascript:alert(1)' })
    const duplicate = opportunity()
    const errors = validateOpportunities([malformed, duplicate])
    expect(errors.some(error => error.includes('source_url must use HTTPS'))).toBe(true)
    expect(errors.some(error => error.includes('duplicates the slug'))).toBe(true)
  })
})
