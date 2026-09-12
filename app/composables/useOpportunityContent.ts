import opportunityData from '~~/content/opportunities.json'
import type { OpportunityRecord } from '~/utils/opportunities'

const opportunities = opportunityData as OpportunityRecord[]

export function useOpportunityContent() {
  return {
    opportunities
  }
}
