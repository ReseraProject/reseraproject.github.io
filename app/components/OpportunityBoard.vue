<script setup lang="ts">
const { apiBase, listApproved } = useOpportunityApi()
const opportunities = ref<Opportunity[]>([])
const state = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')

onMounted(async () => {
  if (!apiBase) return
  state.value = 'loading'
  try {
    opportunities.value = (await listApproved()).opportunities
    state.value = 'ready'
  } catch {
    state.value = 'error'
  }
})
</script>

<template>
  <section id="opportunities" class="opportunities">
    <div class="opportunities-heading reveal">
      <div class="section-label"><span>04</span> Opportunities</div>
      <h2>Find work worth<br><em>showing up for.</em></h2>
      <p>Research openings are reviewed by RESERA moderators before they reach the collective.</p>
      <NuxtLink class="button opportunity-action" to="/partners/">
        Share an opportunity <span>→</span>
      </NuxtLink>
    </div>

    <div class="opportunity-feed reveal" aria-live="polite">
      <p v-if="state === 'loading'" class="opportunity-notice">Looking for approved opportunities…</p>
      <p v-else-if="state === 'error'" class="opportunity-notice">The opportunity service is temporarily unavailable.</p>
      <template v-else-if="opportunities.length">
        <article v-for="item in opportunities" :key="item.id" class="opportunity-card">
          <div>
            <span>{{ item.field_label }}</span>
            <span v-if="item.deadline">Closes {{ item.deadline }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="opportunity-org">
            {{ item.organization }}<template v-if="item.location"> · {{ item.location }}</template><template v-if="item.remote"> · Remote</template>
          </p>
          <p>{{ item.summary }}</p>
          <a :href="item.source_url" target="_blank" rel="noreferrer">View source <span>↗</span></a>
        </article>
      </template>
      <div v-else class="opportunity-empty">
        <span>Reviewed listings are coming</span>
        <h3>The board is opening soon.</h3>
        <p>RESERA is preparing a moderated feed of research opportunities. Organizations can introduce an opening through our partnership page.</p>
        <NuxtLink to="/partners/">Partner with RESERA <span>↗</span></NuxtLink>
      </div>
    </div>
  </section>
</template>
