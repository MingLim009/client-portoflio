import type { WorkVertical } from './works'

export type ContactLink = {
  id: 'whatsapp' | 'discord' | 'telegram' | 'x' | 'email'
  label: string
  href: string
  description: string
  handle: string
}

export type ProofMetric = {
  value: string
  label: string
  detail: string
}

export type JourneyStep = {
  id: string
  year: string
  era: string
  market: string
  title: string
  summary: string
  focus: string[]
  /** Work verticals shown inside this timeline chapter */
  verticals: WorkVertical[]
}

export type SiteConfig = {
  name: string
  role: string
  tagline: string
  about: string
  aboutTitle: string
  heroLine1: string
  heroLine2: string
  services: string
  availability: string
  location: string
  origin: string
  email?: string
  phone?: string
  proofIntro: string
  proofMetrics: ProofMetric[]
  journeyIntro: string
  journeyGuideTitle: string
  journeyGuide: string
  journeyGuidePoints: string[]
  journey: JourneyStep[]
  experience: { period: string; company: string; role: string; points: string[] }[]
  /**
   * Keep false while sharing review links on freelancing platforms.
   * Set true only at final delivery so WhatsApp / Discord / Slack appear.
   */
  showDirectContacts: boolean
  contacts: ContactLink[]
  seo: {
    title: string
    description: string
    ogImage: string
  }
}

export const site: SiteConfig = {
  name: 'Benjamin Rhuan',
  role: 'Creative Strategist',
  tagline: 'Creative strategy built around the entire funnel, not just the ad.',
  aboutTitle: 'Strategy first. Creative that scales.',
  about:
    'My Direct Response background taught me to look far beyond the ad itself.',
  heroLine1: 'Creative Strategy Built to Convert and Scale',
  heroLine2: '',
  services: 'Creative Strategy / VSLs / Paid Social',
  availability: '100% available to start now',
  location: 'Brazil · US · EU markets',
  origin: '56 pieces · 5 markets',
  journeyIntro:
    'Curriculum order — latest chapter first. Each step includes the real work from that era. Filter by year, market, or format.',
  journeyGuideTitle: 'How I build creative',
  journeyGuide:
    'Every project here follows the same process: research the market first, identify the strongest TOF opportunities, turn those insights into angles and concepts, then build the script and production brief around them.',
  journeyGuidePoints: [
    'Research before writing',
    'Strategy before scripting',
    'Production built around the idea',
  ],
  email: 'benjamimrhuan@hotmail.com',
  phone: '+55 81 98699-7127',
  proofIntro:
    'I’ve spent the last few years working in environments where creative is judged by one thing: performance.',
  proofMetrics: [
    {
      value: '$267,778.67',
      label: 'Scaled Spend',
      detail:
        'Across 88 campaigns in a telehealth account, with 5,837 purchases and a $45.88 average CPA.',
    },
    {
      value: '4.05x',
      label: 'Profitable Scale',
      detail:
        'Average purchase ROAS across $82,225.16 in spend for a DTC supplement offer, with the strongest ad set reaching 12.27x.',
    },
    {
      value: '13.3M',
      label: 'Retention at Scale',
      detail:
        '13.3M VSL plays, with 18.4% of viewers still watching at the 92% mark.',
    },
  ],
  journey: [
    {
      id: '2026-tele',
      year: '2026',
      era: '2026',
      market: 'Telehealth',
      title: 'Telehealth creative strategy',
      summary:
        'Expanded into telehealth, applying a Direct Response foundation to TOF ads, long-form scripts, landing experiences, quizzes, and full-funnel creative strategy.',
      focus: ['NAD+', 'TOF Ads', 'Long-form', 'Full Funnel'],
      verticals: ['telehealth'],
    },
    {
      id: '2024-supp',
      year: '2024',
      era: '2024–2026',
      market: 'Supplements',
      title: 'DTC supplement brands',
      summary:
        'Built creative systems for DTC supplement brands, combining market research, angle development, scripting, production direction, and performance feedback from live ad accounts.',
      focus: ['Iron Rise', 'Liver Support', '4.05x ROAS'],
      verticals: ['liver-support', 'iron-rise'],
    },
    {
      id: '2023-info',
      year: '2023',
      era: '2023–2024',
      market: 'Infoproducts',
      title: 'Infoproduct creative strategy',
      summary:
        'Moved deeper into strategy for performance offers, turning research, customer awareness, and positioning into briefs, VSL concepts, and acquisition creatives.',
      focus: ['HTTPS-47', 'US & DE Markets', 'VSL Retention'],
      verticals: ['infoproducts'],
    },
    {
      id: '2021-nutra',
      year: '2021',
      era: '2021–2023',
      market: 'Nutraceuticals',
      title: 'Direct Response foundation',
      summary:
        'Built my core skill set in nutraceuticals through VSLs, advertorials, presells, upsells, and complete sales funnels across Brazil, the US, and Europe.',
      focus: ['VSLs', 'Advertorials', 'Presells', 'Full Funnels'],
      verticals: ['direct-response'],
    },
  ],
  experience: [
    {
      period: '2025 – 2026',
      company: 'Verdaia',
      role: 'Creative Strategist',
      points: [
        'Creative for two nutraceutical supplements: Iron Rise and Liver Support.',
        'Liver Support: $82K spend at 4.05x average ROAS.',
      ],
    },
    {
      period: '2024 – 2025',
      company: 'Telemedicine Brand',
      role: 'Creative Strategist',
      points: [
        'Built full funnels: ad creative, sales pages, and quizzes.',
        'Owned creative strategy end to end — not only copy.',
      ],
    },
    {
      period: '2023 – 2024',
      company: 'SFK Hub',
      role: 'Creative Strategist & Copywriter',
      points: [
        'Health, weight-loss, and extra-income offers for US and German markets.',
        'Source of the $267K Meta campaign set: research-backed briefs.',
      ],
    },
    {
      period: '2021 – 2023',
      company: 'Bedigital',
      role: 'Copywriter Trainee → Senior Copywriter',
      points: [
        'Ads, advertorials, and VSLs for Brazil, US, and Europe.',
        'VSLs scaled past $20M in tracked spend by the time I left.',
      ],
    },
  ],
  showDirectContacts: true,
  contacts: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/5581986997127',
      handle: '+55 81 98699-7127',
      description: 'Message me directly',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/benjaminrhuan',
      handle: '@benjaminrhuan',
      description: 'Ping me on Telegram',
    },
    {
      id: 'discord',
      label: 'Discord',
      href: 'https://discord.com/users/benjaminrhuan',
      handle: '@benjaminrhuan',
      description: 'Chat on Discord',
    },
    {
      id: 'x',
      label: 'X',
      href: 'https://x.com/creativbnjamin',
      handle: '@creativbnjamin',
      description: 'Follow the work on X',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:benjamimrhuan@hotmail.com',
      handle: 'benjamimrhuan@hotmail.com',
      description: 'Write me a note',
    },
  ],
  seo: {
    title: 'Benjamin Rhuan — Creative Strategist',
    description:
      'Creative strategist for direct-response brands. Scripts, ads, VSL retention, and Meta Ads proof from scaled campaigns.',
    ogImage: '/og-image.svg',
  },
}
