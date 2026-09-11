<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const base = runtimeConfig.app.baseURL
const leaderApplicationUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfnL9KBe2QLWl1RL76e_vUT587pOCBe7dZ0qECLaXua_0br0w/viewform?usp=sharing&ouid=101849059006373619329'

const impact = [
  { value: '25+', label: 'papers being written', detail: 'Active teams moving research forward' },
  { value: '2+', label: 'completed and published', detail: 'Finished work shared beyond the team' },
  { value: '1,230+', label: 'student researchers', detail: 'A growing worldwide community' },
  { value: '12+', label: 'academic disciplines', detail: 'From AI and medicine to policy and finance' }
]

const researchPillars = [
  { number: '01', title: 'Join a real team', text: 'Work with students who are committed to the same question—not on another disposable classroom exercise.' },
  { number: '02', title: 'Lead the direction', text: 'Bring a research idea, organize a team, and develop the habits that turn curiosity into sustained work.' },
  { number: '03', title: 'Finish what you start', text: 'Move through evidence, analysis, drafting, and revision with a community that wants the paper to exist.' }
]

const fields = [
  { number: '01', title: 'AI & Technology', text: 'Build, test, and question the systems shaping what comes next.' },
  { number: '02', title: 'Medicine & Biology', text: 'Study living systems, human health, and the science of better outcomes.' },
  { number: '03', title: 'Physics & Aerospace', text: 'Follow questions from fundamental forces to the edge of exploration.' },
  { number: '04', title: 'Finance & Economics', text: 'Use evidence and models to understand markets, incentives, and decisions.' },
  { number: '05', title: 'Social Sciences', text: 'Investigate how people, institutions, and communities shape one another.' },
  { number: '06', title: 'Humanities & Policy', text: 'Examine the ideas, histories, and choices that give research its context.' }
]

const process = [
  { step: '01', title: 'Choose a direction', text: 'Start with a field, a problem, or the question you cannot stop thinking about.' },
  { step: '02', title: 'Join or lead a team', text: 'Find collaborators already moving—or apply to organize a research direction of your own.' },
  { step: '03', title: 'Do the work', text: 'Build the source trail, method, analysis, and draft that make the idea defensible.' },
  { step: '04', title: 'Finish and publish', text: 'Revise the paper, share the result, and contribute something real to the wider conversation.' }
]

useReveal()
useSeoMeta({
  title: 'RESERA — Student Research Teams, Mentorship, and Publication',
  description: 'Join 1,230+ student researchers across 12+ disciplines working in real teams to investigate questions, write papers, and publish meaningful work.',
  ogTitle: 'RESERA — Turn Curiosity Into Published Research',
  ogDescription: 'Join 1,230+ student researchers working across 12+ disciplines and 25+ active papers.',
  ogUrl: 'https://reseraproject.github.io/',
  twitterTitle: 'RESERA — Turn Curiosity Into Published Research',
  twitterDescription: 'A worldwide community of 1,230+ student researchers working toward real papers.'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://reseraproject.github.io/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RESERA',
      url: 'https://reseraproject.github.io/',
      logo: 'https://reseraproject.github.io/resera-logo.png',
      description: 'A worldwide community of 1,230+ student researchers across 12+ academic disciplines.',
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
        <p class="hero-copy">Join 1,230+ student researchers across 12+ disciplines working in real teams to ask harder questions, write serious papers, and finish what they start.</p>
        <div class="hero-actions">
          <a class="button button-light" href="#research">Explore the research <span>↓</span></a>
          <a class="text-link" :href="leaderApplicationUrl" target="_blank" rel="noreferrer">Apply to lead a team <span>↗</span></a>
        </div>
      </div>
      <div class="member-proof"><strong>1,230+</strong><span>student<br>researchers</span></div>
      <div class="hero-side-label">Curiosity has no depth limit</div>
      <div class="scroll-note"><span>Scroll to descend</span><i /></div>
    </section>

    <section id="about" class="manifesto">
      <div class="section-label reveal"><span>01</span> About RESERA</div>
      <div class="manifesto-grid">
        <p class="manifesto-kicker reveal">The questions worth asking<br>rarely have easy answers.</p>
        <div class="manifesto-copy reveal">
          <h2>We help students turn<br><em>curiosity into contribution.</em></h2>
          <p>RESERA is a worldwide community of more than 1,230 student researchers. We build teams around promising questions and create the structure to carry an idea from its uncertain beginning to a completed paper.</p>
          <a class="arrow-link" href="#process">How we work <span>→</span></a>
        </div>
      </div>
      <div class="statement reveal">
        <span>We believe research should feel less like a closed door</span>
        <strong>and more like an open ocean.</strong>
      </div>
    </section>

    <section class="impact-strip" aria-label="RESERA research in numbers">
      <article v-for="stat in impact" :key="stat.label" class="impact-stat reveal">
        <strong>{{ stat.value }}</strong>
        <div><span>{{ stat.label }}</span><p>{{ stat.detail }}</p></div>
      </article>
    </section>

    <section id="research" class="research-program">
      <div class="research-intro">
        <div class="section-label reveal"><span>02</span> The research</div>
        <h2 class="reveal">A question is only<br>the <em>beginning.</em></h2>
      </div>
      <div class="research-body">
        <div class="research-lead reveal">
          <p>RESERA puts students on research teams built to move. Members collaborate across borders and disciplines, develop a serious body of evidence, and push each project toward a paper worth sharing.</p>
          <p>You do not need a perfect résumé or a finished proposal. You need curiosity, consistency, and a willingness to contribute.</p>
          <a class="button research-apply" :href="leaderApplicationUrl" target="_blank" rel="noreferrer">Apply to lead a team <span>↗</span></a>
        </div>
        <div class="research-pillar-list">
          <article v-for="pillar in researchPillars" :key="pillar.number" class="research-pillar reveal">
            <span>{{ pillar.number }}</span>
            <div><h3>{{ pillar.title }}</h3><p>{{ pillar.text }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section id="explore" class="fields">
      <div class="fields-intro">
        <div class="section-label reveal"><span>03</span> Explore</div>
        <h2 class="reveal">Every field is<br>worth <em>diving into.</em></h2>
        <p class="reveal">Our work spans more than 12 academic disciplines. These are some of the directions members are exploring now.</p>
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
      <div class="depth-meter" aria-hidden="true"><span>0m</span><i /><span>1,230m</span></div>
    </section>

    <OpportunityBoard />

    <section class="partner-invite">
      <div class="partner-invite-copy reveal">
        <p class="eyebrow"><span /> For organizations</p>
        <h2>Bring the opportunity.<br><em>We’ll bring the curiosity.</em></h2>
      </div>
      <div class="partner-invite-action reveal">
        <p>Help 1,230+ young researchers access mentors, workshops, challenges, resources, and work that matters.</p>
        <NuxtLink class="button button-light" to="/partners/">Partner with RESERA <span>↗</span></NuxtLink>
      </div>
    </section>

    <section id="process" class="process-section">
      <div class="process-heading">
        <div class="section-label reveal"><span>05</span> The process</div>
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
        <div class="community-actions">
          <a class="button button-light" href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">Join us on Discord <span>↗</span></a>
          <a class="text-link" :href="leaderApplicationUrl" target="_blank" rel="noreferrer">Lead a research team <span>↗</span></a>
        </div>
        <div class="community-stat"><strong>1,230+ researchers</strong><span>and growing across the world.</span></div>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="contact-top">
        <div class="section-label reveal"><span>06</span> Start here</div>
        <h2 class="reveal">What will<br><em>you discover?</em></h2>
      </div>
      <div class="contact-bottom reveal">
        <p>Bring the question.<br>We’ll help you go deeper.</p>
        <div class="contact-links">
          <a href="mailto:reseraresearch1@gmail.com">Email us <span>↗</span></a>
          <a href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">Join Discord <span>↗</span></a>
          <a :href="leaderApplicationUrl" target="_blank" rel="noreferrer">Apply to lead <span>↗</span></a>
          <a href="https://www.instagram.com/reseraa_a" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>
