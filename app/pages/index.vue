<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const base = runtimeConfig.app.baseURL

const fields = [
  { number: '01', title: 'Natural Sciences', text: 'From living systems to the physics shaping our universe.' },
  { number: '02', title: 'Technology', text: 'Building, testing, and questioning the tools defining tomorrow.' },
  { number: '03', title: 'Humanities', text: 'Understanding the stories, systems, and ideas that move people.' },
  { number: '04', title: 'Social Impact', text: 'Research designed to make communities stronger and more just.' }
]

const process = [
  { step: '01', title: 'Bring a question', text: 'Start with the thing you cannot stop wondering about. It does not need to be polished yet.' },
  { step: '02', title: 'Find your people', text: 'Connect with peers and mentors who challenge your assumptions and strengthen your approach.' },
  { step: '03', title: 'Follow the evidence', text: 'Build the habits, methods, and source trail that turn an idea into work you can stand behind.' },
  { step: '04', title: 'Share what you found', text: 'Publish, present, and contribute your perspective to a wider community of young researchers.' }
]

useReveal()
useSeoMeta({
  title: 'RESERA — Student Research Collective',
  description: 'RESERA is a student-led research collective of 1,200+ members helping young thinkers turn bold questions into meaningful work.',
  ogTitle: 'RESERA — Go Beyond the Surface',
  ogDescription: 'Join 1,200+ students exploring research, collaboration, and discovery.',
  ogUrl: 'https://reseraproject.github.io/Resera/',
  twitterTitle: 'RESERA — Go Beyond the Surface',
  twitterDescription: 'A student research collective of 1,200+ members built for curiosity and discovery.'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://reseraproject.github.io/Resera/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RESERA',
      url: 'https://reseraproject.github.io/Resera/',
      logo: 'https://reseraproject.github.io/Resera/resera-logo.png',
      description: 'A student-led research collective of 1,200+ members.',
      sameAs: ['https://www.instagram.com/reseraa_a', 'https://discord.gg/kJWRfURJY3']
    })
  }]
})
</script>

<template>
  <SiteHeader />
  <main>
    <section id="home" class="hero">
      <div class="hero-image" :style="{ backgroundImage: `url('${base}resera-banner.png')` }" aria-hidden="true" />
      <div class="hero-shade" aria-hidden="true" />
      <div class="bubbles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div class="hero-content">
        <p class="eyebrow hero-eyebrow"><span /> Student-led research collective</p>
        <h1>Go beyond<br>the <em>surface.</em></h1>
        <p class="hero-copy">For young thinkers ready to ask harder questions, find better evidence, and make discoveries that matter.</p>
        <div class="hero-actions">
          <a class="button button-light" href="#about">Discover RESERA <span>↓</span></a>
          <NuxtLink class="text-link" to="/partners/">Partner with us <span>↗</span></NuxtLink>
        </div>
      </div>
      <div class="member-proof"><strong>1,200+</strong><span>members<br>and growing</span></div>
      <div class="hero-side-label">Curiosity has no depth limit</div>
      <div class="scroll-note"><span>Scroll to descend</span><i /></div>
    </section>

    <section id="about" class="manifesto">
      <div class="section-label reveal"><span>01</span> About RESERA</div>
      <div class="manifesto-grid">
        <p class="manifesto-kicker reveal">The questions worth asking<br>rarely have easy answers.</p>
        <div class="manifesto-copy reveal">
          <h2>We help students turn<br><em>curiosity into contribution.</em></h2>
          <p>RESERA is a student-led research collective of more than 1,200 members and growing. We create the space, community, and structure to take an idea seriously—from its first uncertain question to work worth sharing.</p>
          <a class="arrow-link" href="#process">How we work <span>→</span></a>
        </div>
      </div>
      <div class="statement reveal">
        <span>We believe research should feel less like a closed door</span>
        <strong>and more like an open ocean.</strong>
      </div>
    </section>

    <section id="explore" class="fields">
      <div class="fields-intro">
        <div class="section-label reveal"><span>02</span> Explore</div>
        <h2 class="reveal">Every field is<br>worth <em>diving into.</em></h2>
        <p class="reveal">Follow your question wherever it leads. RESERA welcomes work across disciplines, methods, and borders.</p>
      </div>
      <div class="field-list">
        <article v-for="field in fields" :key="field.number" class="field-row reveal">
          <span class="field-number">{{ field.number }}</span>
          <h3>{{ field.title }}</h3>
          <p>{{ field.text }}</p>
          <span class="field-arrow">↗</span>
        </article>
      </div>
    </section>

    <section class="quote-panel" :style="{ backgroundImage: `linear-gradient(rgba(3,16,25,.35), rgba(3,16,25,.8)), url('${base}resera-banner.png')` }" aria-label="Research philosophy">
      <div class="quote-mark">“</div>
      <blockquote class="reveal">Research is not about knowing<br>the answer. It is about being<br><em>brave enough to look.</em></blockquote>
      <div class="depth-meter" aria-hidden="true"><span>0m</span><i /><span>1,200m</span></div>
    </section>

    <OpportunityBoard />

    <section class="partner-invite">
      <div class="partner-invite-copy reveal">
        <p class="eyebrow"><span /> For organizations</p>
        <h2>Bring the opportunity.<br><em>We’ll bring the curiosity.</em></h2>
      </div>
      <div class="partner-invite-action reveal">
        <p>Help 1,200+ young researchers access mentors, workshops, challenges, resources, and work that matters.</p>
        <NuxtLink class="button button-light" to="/partners/">Partner with RESERA <span>↗</span></NuxtLink>
      </div>
    </section>

    <section id="process" class="process-section">
      <div class="process-heading">
        <div class="section-label reveal"><span>04</span> The process</div>
        <h2 class="reveal">From a spark<br>to something <em>real.</em></h2>
      </div>
      <div class="process-list">
        <article v-for="item in process" :key="item.step" class="process-item reveal">
          <span class="process-number">{{ item.step }}</span>
          <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </article>
      </div>
    </section>

    <section class="community">
      <div class="community-card reveal">
        <p class="eyebrow"><span /> The collective</p>
        <h2>Research is deeper<br>when we do it <em>together.</em></h2>
        <p>Meet students exploring ideas across science, technology, culture, and society. Trade feedback, join a project, or bring your own question to the table.</p>
        <a class="button button-light" href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">Join us on Discord <span>↗</span></a>
        <div class="community-stat"><strong>1,200+ members</strong><span>and growing across the world.</span></div>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="contact-top">
        <div class="section-label reveal"><span>05</span> Start here</div>
        <h2 class="reveal">What will<br><em>you discover?</em></h2>
      </div>
      <div class="contact-bottom reveal">
        <p>Bring the question.<br>We’ll help you go deeper.</p>
        <div class="contact-links">
          <a href="mailto:reseraresearch1@gmail.com">Email us <span>↗</span></a>
          <a href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">Join Discord <span>↗</span></a>
          <a href="https://www.instagram.com/reseraa_a" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>
