<script setup lang="ts">
import {
  OPPORTUNITY_SUBMISSION_HREF,
  filterOpportunities,
  formatOpportunityDate,
  opportunityFieldLabel
} from '~/utils/opportunities'

const { opportunities } = useOpportunityContent()
const featuredOpportunities = computed(() => filterOpportunities(opportunities, { status: 'active' }).slice(0, 3))
</script>

<template>
  <section id="opportunities" class="opportunities">
    <div class="opportunities-heading reveal">
      <div class="section-label"><span>04</span> Opportunities</div>
      <h2>Find work worth<br><em>showing up for.</em></h2>
      <p>Every listing is reviewed before it reaches the collective and links back to an authoritative source.</p>
      <div class="opportunity-heading-actions">
        <NuxtLink class="button opportunity-action" to="/opportunities/">
          View marketplace <span>→</span>
        </NuxtLink>
        <a class="arrow-link" :href="OPPORTUNITY_SUBMISSION_HREF">Share an opportunity <span>↗</span></a>
      </div>
    </div>

    <div class="opportunity-feed reveal">
      <template v-if="featuredOpportunities.length">
        <article v-for="item in featuredOpportunities" :key="item.slug" class="opportunity-card">
          <div>
            <span>{{ opportunityFieldLabel(item.field) }}</span>
            <span>{{ item.deadline ? `Closes ${formatOpportunityDate(item.deadline)}` : 'Open deadline' }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="opportunity-org">
            {{ item.organization }}<template v-if="item.location"> · {{ item.location }}</template><template v-if="item.remote"> · Remote</template>
          </p>
          <p>{{ item.summary }}</p>
          <NuxtLink :to="`/opportunities/${item.slug}/`">View opportunity <span>↗</span></NuxtLink>
        </article>
        <NuxtLink class="opportunity-view-all" to="/opportunities/">View all opportunities <span>→</span></NuxtLink>
      </template>
      <div v-else class="opportunity-empty">
        <span>Opening the board</span>
        <h3>The first reviewed listings are on the way.</h3>
        <p>RESERA is building a focused collection of legitimate research opportunities. Nothing appears here until our team has reviewed it.</p>
        <div>
          <NuxtLink to="/opportunities/">Explore the marketplace <span>→</span></NuxtLink>
          <a :href="OPPORTUNITY_SUBMISSION_HREF">Submit by email <span>↗</span></a>
        </div>
      </div>
    </div>
  </section>
</template>
