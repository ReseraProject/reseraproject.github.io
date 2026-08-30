<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const base = runtimeConfig.app.baseURL

const partnershipTypes = [
  { number: '01', title: 'Research opportunities', text: 'Share internships, assistant roles, fieldwork, calls for participation, and other meaningful openings.' },
  { number: '02', title: 'Mentorship', text: 'Give young researchers thoughtful access to people who can clarify a field, method, or path forward.' },
  { number: '03', title: 'Workshops', text: 'Lead practical sessions, journal clubs, demonstrations, or conversations grounded in real experience.' },
  { number: '04', title: 'Research challenges', text: 'Invite members to investigate a question, analyze evidence, or develop a response to a defined problem.' },
  { number: '05', title: 'Educational resources', text: 'Contribute tools, reading collections, datasets, guides, or access that can support responsible student research.' }
]

const steps = [
  { number: '01', title: 'Introduce your organization', text: 'Tell us who you are, what you would like to contribute, and which students or research fields it may serve.' },
  { number: '02', title: 'RESERA reviews the fit', text: 'Our team checks the proposal for clarity, relevance, and suitability before anything is shared with members.' },
  { number: '03', title: 'Coordinate the next step', text: 'If the fit is right, we work together on the clearest way to present the opportunity, event, or resource.' }
]

const faqs = [
  { question: 'Who can approach RESERA?', answer: 'Mission-aligned research groups, educational organizations, nonprofits, laboratories, student communities, and other teams with a relevant contribution are welcome to introduce themselves.' },
  { question: 'What can an organization contribute?', answer: 'Research opportunities, mentorship, workshops, research challenges, and educational resources are all possible starting points.' },
  { question: 'Is every submission shared with members?', answer: 'No. RESERA reviews proposed opportunities and collaborations for clarity, relevance, and suitability before sharing them with the community.' },
  { question: 'How do we begin?', answer: 'Send the structured partnership email or connect through Discord. Include enough context for the RESERA team to understand the organization and proposed contribution.' }
]

const emailBody = [
  'Organization name:',
  'Website:',
  'Contact name and role:',
  'Partnership type:',
  'What we would like to contribute:',
  'Relevant field or student audience:',
  'Preferred timeline:',
  'Anything else RESERA should know:'
].join('\n\n')
const emailHref = `mailto:reseraresearch1@gmail.com?subject=${encodeURIComponent('RESERA Partnership Inquiry')}&body=${encodeURIComponent(emailBody)}`

useReveal()
useSeoMeta({
  title: 'Partner with RESERA — Reach 1,200+ Young Researchers',
  description: 'Partner with RESERA to share research opportunities, mentorship, workshops, challenges, and educational resources with a growing student research community.',
  ogTitle: 'Partner with RESERA',
  ogDescription: 'Bring meaningful research access to a student-led collective of 1,200+ members.',
  ogUrl: 'https://reseraproject.github.io/Resera/partners/',
  twitterTitle: 'Partner with RESERA',
  twitterDescription: 'Connect your organization with a growing community of 1,200+ young researchers.'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://reseraproject.github.io/Resera/partners/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Partner with RESERA',
      url: 'https://reseraproject.github.io/Resera/partners/',
      description: 'Partnership opportunities with the RESERA student research collective.',
      isPartOf: { '@type': 'WebSite', name: 'RESERA', url: 'https://reseraproject.github.io/Resera/' }
    })
  }]
})
</script>

<template>
  <SiteHeader />
  <main class="partners-page">
    <section class="partners-hero">
      <div class="partners-hero-image" :style="{ backgroundImage: `url('${base}resera-banner.png')` }" aria-hidden="true" />
      <div class="partners-hero-shade" aria-hidden="true" />
      <div class="partners-hero-content">
        <p class="eyebrow"><span /> For organizations</p>
        <h1>Open a door.<br><em>We’ll help students enter.</em></h1>
        <p>Partner with a student-led collective of 1,200+ members who are ready to ask sharper questions and engage seriously with research.</p>
        <div class="hero-actions">
          <a class="button button-light" :href="emailHref">Introduce your organization <span>↗</span></a>
          <a class="text-link" href="#ways-to-partner">Explore partnership formats <span>↓</span></a>
        </div>
      </div>
      <div class="partner-proof"><strong>1,200+</strong><span>members<br>and growing</span></div>
    </section>

    <section class="partner-value">
      <div class="section-label reveal"><span>01</span> Why RESERA</div>
      <div class="partner-value-grid">
        <h2 class="reveal">Meet the next generation<br>of <em>serious curiosity.</em></h2>
        <div class="reveal">
          <p>RESERA brings together students across natural sciences, technology, humanities, and social impact. A partnership gives your organization a thoughtful way to make research more visible, approachable, and actionable for young people.</p>
          <p>We focus on fit and clarity. Every opportunity or collaboration is reviewed before it is introduced to the community.</p>
        </div>
      </div>
      <div class="partner-metrics reveal">
        <div><strong>1,200+</strong><span>community members</span></div>
        <div><strong>04</strong><span>core research fields</span></div>
        <div><strong>01</strong><span>student-led collective</span></div>
      </div>
    </section>

    <section id="ways-to-partner" class="partnership-types">
      <div class="partnership-types-heading">
        <div class="section-label reveal"><span>02</span> Ways to partner</div>
        <h2 class="reveal">Bring what you know.<br><em>Help curiosity travel further.</em></h2>
      </div>
      <div class="partnership-type-list">
        <article v-for="type in partnershipTypes" :key="type.number" class="partnership-type reveal">
          <span>{{ type.number }}</span><h3>{{ type.title }}</h3><p>{{ type.text }}</p>
        </article>
      </div>
    </section>

    <section class="partner-process">
      <div class="partner-process-heading reveal">
        <div class="section-label"><span>03</span> The process</div>
        <h2>Start with<br><em>a clear introduction.</em></h2>
        <p>No complicated portal. Tell us what your organization hopes to contribute, and the RESERA team will review the fit.</p>
      </div>
      <div class="partner-steps">
        <article v-for="step in steps" :key="step.number" class="partner-step reveal">
          <span>{{ step.number }}</span><div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
        </article>
      </div>
    </section>

    <section class="partner-faq">
      <div class="section-label reveal"><span>04</span> Questions</div>
      <div class="faq-grid">
        <h2 class="reveal">Before we<br><em>dive in.</em></h2>
        <div class="faq-list">
          <details v-for="faq in faqs" :key="faq.question" class="reveal">
            <summary>{{ faq.question }}<span>+</span></summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section class="partner-contact">
      <p class="eyebrow reveal"><span /> Begin a conversation</p>
      <h2 class="reveal">Bring an opportunity<br>worth <em>exploring.</em></h2>
      <p class="reveal">Introduce your organization by email, or meet the community through Discord.</p>
      <div class="partner-contact-actions reveal">
        <a class="button button-light" :href="emailHref">Email our team <span>↗</span></a>
        <a class="button button-outline" href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">Connect on Discord <span>↗</span></a>
      </div>
      <a class="partner-email reveal" href="mailto:reseraresearch1@gmail.com">reseraresearch1@gmail.com</a>
    </section>
  </main>
  <SiteFooter />
</template>
