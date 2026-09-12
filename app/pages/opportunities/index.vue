<script setup lang="ts">
import type {
  OpportunityField,
  OpportunityLocationFilter,
  OpportunityStatusFilter
} from '~/utils/opportunities'
import {
  OPPORTUNITY_FIELDS,
  OPPORTUNITY_SUBMISSION_HREF,
  filterOpportunities,
  formatOpportunityDate,
  isOpportunityClosed,
  opportunityFieldLabel
} from '~/utils/opportunities'

const route = useRoute()
const router = useRouter()
const { opportunities } = useOpportunityContent()

function queryString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function replaceQuery(key: string, value: string, defaultValue = '') {
  const query = { ...route.query }
  if (!value || value === defaultValue) delete query[key]
  else query[key] = value
  void router.replace({ query })
}

const search = computed({
  get: () => queryString(route.query.q),
  set: value => replaceQuery('q', value)
})

const field = computed<OpportunityField | 'all'>({
  get: () => {
    const value = queryString(route.query.field)
    return OPPORTUNITY_FIELDS.some(option => option.value === value) ? value as OpportunityField : 'all'
  },
  set: value => replaceQuery('field', value, 'all')
})

const location = computed<OpportunityLocationFilter>({
  get: () => ['remote', 'in-person'].includes(queryString(route.query.location))
    ? queryString(route.query.location) as OpportunityLocationFilter
    : 'all',
  set: value => replaceQuery('location', value, 'all')
})

const status = computed<OpportunityStatusFilter>({
  get: () => ['past', 'all'].includes(queryString(route.query.status))
    ? queryString(route.query.status) as OpportunityStatusFilter
    : 'active',
  set: value => replaceQuery('status', value, 'active')
})

const visibleOpportunities = computed(() => filterOpportunities(opportunities, {
  search: search.value,
  field: field.value,
  location: location.value,
  status: status.value
}))

const activeCount = computed(() => opportunities.filter(item => !isOpportunityClosed(item)).length)
const filtersActive = computed(() => Boolean(search.value || field.value !== 'all' || location.value !== 'all' || status.value !== 'active'))

function clearFilters() {
  void router.replace({ query: {} })
}

useReveal()
useSeoMeta({
  title: 'Research Opportunities — RESERA',
  description: 'Browse reviewed research opportunities for student researchers across disciplines, locations, and experience levels.',
  ogTitle: 'Research Opportunities — RESERA',
  ogDescription: 'Find reviewed research opportunities for students, or introduce an opportunity to the RESERA community.',
  ogUrl: 'https://reseraproject.github.io/opportunities/',
  twitterTitle: 'Research Opportunities — RESERA',
  twitterDescription: 'Reviewed opportunities for RESERA student researchers.'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://reseraproject.github.io/opportunities/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'RESERA Research Opportunities',
      url: 'https://reseraproject.github.io/opportunities/',
      description: 'Reviewed research opportunities for student researchers.',
      isPartOf: { '@type': 'WebSite', name: 'RESERA', url: 'https://reseraproject.github.io/' }
    })
  }]
})
</script>

<template>
  <SiteHeader />
  <main class="marketplace-page">
    <section class="marketplace-hero">
      <div class="marketplace-hero-copy">
        <p class="eyebrow"><span /> Reviewed by RESERA</p>
        <h1>Find your next<br><em>research direction.</em></h1>
        <p>Explore opportunities selected for student researchers. Every listing links back to an authoritative source and is reviewed before it appears here.</p>
      </div>
      <div class="marketplace-hero-actions">
        <a class="button button-light" :href="OPPORTUNITY_SUBMISSION_HREF">Share an opportunity <span>↗</span></a>
        <NuxtLink class="text-link" to="/partners/">Partner with RESERA <span>↗</span></NuxtLink>
      </div>
      <div class="marketplace-count" aria-label="Active opportunity count">
        <strong>{{ activeCount }}</strong>
        <span>active<br>opportunities</span>
      </div>
    </section>

    <section class="marketplace-surface">
      <div class="marketplace-heading">
        <div>
          <div class="section-label"><span>01</span> Opportunity board</div>
          <h2>Reviewed listings,<br><em>ready to explore.</em></h2>
        </div>
        <p>Search by topic or organization, narrow by discipline and location, or revisit past listings.</p>
      </div>

      <form class="opportunity-filters" role="search" @submit.prevent>
        <label class="filter-search">
          <span>Search</span>
          <input v-model="search" type="search" name="q" placeholder="Topic, organization, or keyword">
        </label>
        <label>
          <span>Discipline</span>
          <select v-model="field" name="field">
            <option value="all">All disciplines</option>
            <option v-for="option in OPPORTUNITY_FIELDS" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <select v-model="location" name="location">
            <option value="all">Any location</option>
            <option value="remote">Remote</option>
            <option value="in-person">In person</option>
          </select>
        </label>
        <label>
          <span>Status</span>
          <select v-model="status" name="status">
            <option value="active">Active</option>
            <option value="past">Past</option>
            <option value="all">All</option>
          </select>
        </label>
      </form>

      <div class="marketplace-results-heading" aria-live="polite">
        <span>{{ visibleOpportunities.length }} {{ visibleOpportunities.length === 1 ? 'result' : 'results' }}</span>
        <button v-if="filtersActive" type="button" @click="clearFilters">Clear filters</button>
      </div>

      <div v-if="visibleOpportunities.length" class="marketplace-list">
        <article v-for="item in visibleOpportunities" :key="item.slug" class="marketplace-card">
          <div class="marketplace-card-meta">
            <span>{{ opportunityFieldLabel(item.field) }}</span>
            <span :class="{ closed: isOpportunityClosed(item) }">{{ isOpportunityClosed(item) ? 'Closed' : item.deadline ? `Closes ${formatOpportunityDate(item.deadline)}` : 'Open deadline' }}</span>
          </div>
          <h3><NuxtLink :to="`/opportunities/${item.slug}/`">{{ item.title }}</NuxtLink></h3>
          <p class="marketplace-organization">{{ item.organization }}<template v-if="item.location"> · {{ item.location }}</template><template v-if="item.remote"> · Remote</template></p>
          <p>{{ item.summary }}</p>
          <NuxtLink class="arrow-link" :to="`/opportunities/${item.slug}/`">View opportunity <span>→</span></NuxtLink>
        </article>
      </div>

      <div v-else-if="opportunities.length" class="marketplace-empty">
        <span>No matches</span>
        <h3>No opportunities fit those filters.</h3>
        <p>Try a broader search, another discipline, or include past listings.</p>
        <button class="button opportunity-action" type="button" @click="clearFilters">Clear filters <span>↺</span></button>
      </div>

      <div v-else class="marketplace-empty marketplace-intake">
        <span>Opening the board</span>
        <h3>The first reviewed listings are on the way.</h3>
        <p>RESERA is building a focused collection of legitimate research opportunities for students. We will publish each listing only after it has been reviewed.</p>
        <div>
          <a class="button button-light" :href="OPPORTUNITY_SUBMISSION_HREF">Submit by email <span>↗</span></a>
          <NuxtLink class="text-link" to="/partners/">How partnerships work <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>
