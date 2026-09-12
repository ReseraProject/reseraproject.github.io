<script setup lang="ts">
import {
  OPPORTUNITY_SUBMISSION_HREF,
  formatOpportunityDate,
  isOpportunityClosed,
  opportunityFieldLabel
} from '~/utils/opportunities'

const route = useRoute()
const { opportunities } = useOpportunityContent()
const opportunity = opportunities.find(item => item.slug === route.params.slug)

if (!opportunity) {
  throw createError({ statusCode: 404, statusMessage: 'Opportunity not found' })
}

const closed = isOpportunityClosed(opportunity)
const canonical = `https://reseraproject.github.io/opportunities/${opportunity.slug}/`

useSeoMeta({
  title: `${opportunity.title} — RESERA Opportunity`,
  description: opportunity.summary,
  ogTitle: opportunity.title,
  ogDescription: opportunity.summary,
  ogUrl: canonical,
  twitterTitle: opportunity.title,
  twitterDescription: opportunity.summary
})
useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: opportunity.title,
      url: canonical,
      description: opportunity.summary,
      datePublished: opportunity.published_at,
      isPartOf: {
        '@type': 'CollectionPage',
        name: 'RESERA Research Opportunities',
        url: 'https://reseraproject.github.io/opportunities/'
      }
    })
  }]
})
</script>

<template>
  <SiteHeader />
  <main class="opportunity-detail">
    <section class="opportunity-detail-hero">
      <NuxtLink class="detail-back" to="/opportunities/">← All opportunities</NuxtLink>
      <div class="opportunity-detail-grid">
        <div>
          <p class="eyebrow"><span /> {{ opportunityFieldLabel(opportunity.field) }}</p>
          <h1>{{ opportunity.title }}</h1>
          <p class="detail-summary">{{ opportunity.summary }}</p>
        </div>
        <aside>
          <span class="detail-status" :class="{ closed }">{{ closed ? 'Closed' : 'Open' }}</span>
          <dl>
            <div><dt>Organization</dt><dd>{{ opportunity.organization }}</dd></div>
            <div><dt>Location</dt><dd>{{ opportunity.remote ? opportunity.location ? `${opportunity.location} · Remote` : 'Remote' : opportunity.location }}</dd></div>
            <div><dt>Deadline</dt><dd>{{ opportunity.deadline ? formatOpportunityDate(opportunity.deadline) : 'Open deadline' }}</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="opportunity-detail-body">
      <article>
        <div class="section-label"><span>01</span> The opportunity</div>
        <h2>What to know.</h2>
        <p class="detail-description">{{ opportunity.description }}</p>
      </article>
      <aside>
        <div class="detail-eligibility">
          <span>Eligibility</span>
          <p>{{ opportunity.eligibility }}</p>
        </div>
        <a v-if="!closed" class="button button-light" :href="opportunity.source_url" target="_blank" rel="noreferrer">Apply at the source <span>↗</span></a>
        <a v-else class="button button-outline" :href="opportunity.source_url" target="_blank" rel="noreferrer">View original listing <span>↗</span></a>
        <p class="detail-source-note">Applications happen on the organization’s authoritative website. RESERA does not collect application information.</p>
      </aside>
    </section>

    <section class="opportunity-detail-footer">
      <p>Have a legitimate opportunity for student researchers?</p>
      <a class="arrow-link" :href="OPPORTUNITY_SUBMISSION_HREF">Introduce it to RESERA <span>→</span></a>
    </section>
  </main>
  <SiteFooter />
</template>
