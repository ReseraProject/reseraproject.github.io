export const OPPORTUNITY_FIELDS = [
  { value: 'natural-sciences', label: 'Natural sciences' },
  { value: 'technology', label: 'Technology' },
  { value: 'humanities', label: 'Humanities' },
  { value: 'social-impact', label: 'Social impact' },
  { value: 'other', label: 'Other' }
] as const

export type OpportunityField = typeof OPPORTUNITY_FIELDS[number]['value']
export type OpportunityStatusFilter = 'active' | 'past' | 'all'
export type OpportunityLocationFilter = 'all' | 'remote' | 'in-person'

export interface OpportunityRecord {
  slug: string
  title: string
  organization: string
  summary: string
  description: string
  field: OpportunityField
  location: string
  remote: boolean
  eligibility: string
  deadline: string | null
  source_url: string
  published_at: string
  featured: boolean
}

export interface OpportunityFilters {
  search?: string
  field?: OpportunityField | 'all'
  location?: OpportunityLocationFilter
  status?: OpportunityStatusFilter
}

const submissionBody = [
  'Organization:',
  'Opportunity title:',
  'Authoritative source URL:',
  'Eligibility:',
  'Location or remote:',
  'Deadline:',
  'Contact name and role:',
  'Short summary:'
].join('\n\n')

export const OPPORTUNITY_SUBMISSION_EMAIL = 'reseraresearch1@gmail.com'
export const OPPORTUNITY_SUBMISSION_HREF = `mailto:${OPPORTUNITY_SUBMISSION_EMAIL}?subject=${encodeURIComponent('RESERA Opportunity Submission')}&body=${encodeURIComponent(submissionBody)}`

export function opportunityFieldLabel(field: OpportunityField) {
  return OPPORTUNITY_FIELDS.find(option => option.value === field)?.label ?? 'Other'
}

export function isOpportunityClosed(opportunity: OpportunityRecord, now = new Date()) {
  return Boolean(opportunity.deadline && opportunity.deadline < now.toISOString().slice(0, 10))
}

export function sortOpportunities(opportunities: OpportunityRecord[]) {
  return [...opportunities].sort((left, right) => {
    if (left.featured !== right.featured) return left.featured ? -1 : 1
    if (left.deadline && right.deadline) return left.deadline.localeCompare(right.deadline)
    if (left.deadline) return -1
    if (right.deadline) return 1
    return right.published_at.localeCompare(left.published_at)
  })
}

export function filterOpportunities(
  opportunities: OpportunityRecord[],
  filters: OpportunityFilters,
  now = new Date()
) {
  const search = filters.search?.trim().toLocaleLowerCase() ?? ''

  return sortOpportunities(opportunities.filter((opportunity) => {
    const closed = isOpportunityClosed(opportunity, now)
    if ((filters.status ?? 'active') === 'active' && closed) return false
    if (filters.status === 'past' && !closed) return false
    if (filters.field && filters.field !== 'all' && opportunity.field !== filters.field) return false
    if (filters.location === 'remote' && !opportunity.remote) return false
    if (filters.location === 'in-person' && opportunity.remote) return false
    if (!search) return true

    return [
      opportunity.title,
      opportunity.organization,
      opportunity.summary,
      opportunity.description,
      opportunity.location,
      opportunity.eligibility,
      opportunityFieldLabel(opportunity.field)
    ].some(value => value.toLocaleLowerCase().includes(search))
  }))
}

export function formatOpportunityDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
}
