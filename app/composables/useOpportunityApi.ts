export interface Opportunity {
  id: number
  title: string
  organization: string
  summary: string
  field: string
  field_label: string
  location: string
  remote: boolean
  eligibility: string
  deadline: string | null
  source_url: string
  status: 'approved'
}

export function useOpportunityApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase.replace(/\/$/, '')

  async function listApproved() {
    return await $fetch<{ opportunities: Opportunity[] }>(`${apiBase}/api/opportunities/`, {
      credentials: 'include'
    })
  }

  return { apiBase, listApproved }
}
