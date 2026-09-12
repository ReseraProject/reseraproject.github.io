import { OPPORTUNITY_FIELDS, type OpportunityRecord } from '../app/utils/opportunities'

const requiredFields = [
  'slug',
  'title',
  'organization',
  'summary',
  'description',
  'field',
  'location',
  'remote',
  'eligibility',
  'deadline',
  'source_url',
  'published_at',
  'featured'
] as const

const allowedFields = new Set(OPPORTUNITY_FIELDS.map(field => field.value))
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

function isRealDate(value: string) {
  if (!datePattern.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}

export function validateOpportunities(input: unknown) {
  const errors: string[] = []
  if (!Array.isArray(input)) return ['The opportunity dataset must be a JSON array.']

  const seenSlugs = new Set<string>()
  input.forEach((value, index) => {
    const label = `Opportunity #${index + 1}`
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`${label} must be an object.`)
      return
    }

    const record = value as Record<string, unknown>
    const unexpected = Object.keys(record).filter(key => !requiredFields.includes(key as typeof requiredFields[number]))
    if (unexpected.length) errors.push(`${label} has unsupported fields: ${unexpected.join(', ')}.`)

    for (const field of requiredFields) {
      if (!(field in record)) errors.push(`${label} is missing "${field}".`)
    }

    const textFields = ['slug', 'title', 'organization', 'summary', 'description', 'eligibility', 'source_url', 'published_at'] as const
    for (const field of textFields) {
      if (typeof record[field] !== 'string' || !record[field].trim()) {
        errors.push(`${label} requires a non-empty "${field}".`)
      }
    }

    if (typeof record.location !== 'string') errors.push(`${label} requires a string "location".`)
    if (typeof record.remote !== 'boolean') errors.push(`${label} requires a boolean "remote".`)
    if (typeof record.featured !== 'boolean') errors.push(`${label} requires a boolean "featured".`)
    if (typeof record.field !== 'string' || !allowedFields.has(record.field as OpportunityRecord['field'])) {
      errors.push(`${label} has an unsupported research field.`)
    }
    if (record.remote === false && typeof record.location === 'string' && !record.location.trim()) {
      errors.push(`${label} requires a location when "remote" is false.`)
    }

    if (typeof record.slug === 'string') {
      if (!slugPattern.test(record.slug)) errors.push(`${label} has an invalid slug.`)
      if (seenSlugs.has(record.slug)) errors.push(`${label} duplicates the slug "${record.slug}".`)
      seenSlugs.add(record.slug)
    }

    if (record.deadline !== null && (typeof record.deadline !== 'string' || !isRealDate(record.deadline))) {
      errors.push(`${label} has an invalid deadline; use YYYY-MM-DD or null.`)
    }
    if (typeof record.published_at === 'string' && !isRealDate(record.published_at)) {
      errors.push(`${label} has an invalid published_at date; use YYYY-MM-DD.`)
    }
    if (typeof record.source_url === 'string') {
      try {
        const url = new URL(record.source_url)
        if (url.protocol !== 'https:') errors.push(`${label} source_url must use HTTPS.`)
      } catch {
        errors.push(`${label} has an invalid source_url.`)
      }
    }
  })

  return errors
}

if (import.meta.main) {
  const input = await Bun.file(new URL('../content/opportunities.json', import.meta.url)).json()
  const errors = validateOpportunities(input)
  if (errors.length) {
    console.error(errors.map(error => `- ${error}`).join('\n'))
    process.exit(1)
  }
  console.log(`Validated ${Array.isArray(input) ? input.length : 0} approved opportunities.`)
}
