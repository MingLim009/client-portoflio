import type { WorkVertical } from './works'

export type ContactLink = {
  id: 'whatsapp' | 'discord' | 'slack'
  label: string
  href: string
  description: string
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
  tagline:
    'Direct response creative for performance brands — scripts, ads, and the results behind them.',
  aboutTitle: 'Strategy first. Creative that scales.',
  about:
    'I build creative strategy for direct-response and performance brands: research, angles, scripts, briefs, and the ads that carry them. This portfolio shows both sides of the work — the writing and the proof from the ad accounts.',
  heroLine1: 'Scripts,',
  heroLine2: 'ads & results',
  services: 'Creative Strategy / VSLs / Paid Social',
  availability: '100% available to start now',
  location: 'Brazil · US · EU markets',
  origin: '37 pieces · 5 markets',
  journeyIntro:
    'How I got here — and the work from each chapter. Filter by year, market, or format to move through the path.',
  email: 'benjamimrhuan@hotmail.com',
  phone: '+55 81 98699-7127',
  proofIntro:
    'The screenshots below are direct captures from Meta Ads Manager — the same Business Manager view used to run the accounts. The first export is from the Telehealth / NAD+ lane. Totals are readable in the export itself, not rebuilt into custom charts.',
  proofMetrics: [
    {
      value: '$267,778.67',
      label: 'Meta spend · Telehealth',
      detail: 'NAD+ lane · 88 campaigns · 5,837 purchases · $45.88 CPA',
    },
    {
      value: '4.05x',
      label: 'Average ROAS',
      detail: '$82,225.16 on Liver Support (supplement) · peak 12.27x',
    },
    {
      value: '13.3M',
      label: 'VSL plays',
      detail: 'ProstaPrime · 18.4% still watching at 92% of the video',
    },
  ],
  journey: [
    {
      id: '2021-dr',
      year: '2021',
      era: '2021 – 2023',
      market: 'Direct response',
      title: 'Direct response market',
      summary:
        'Started in the craft: ads, advertorials, and VSLs across Brazil, US, and Europe — learning funnel structure from the ground up.',
      focus: ['Bedigital', 'VSLs', 'Copy systems'],
      verticals: ['direct-response'],
    },
    {
      id: '2023-info',
      year: '2023',
      era: '2023 – 2024',
      market: 'Infoproducts',
      title: 'Infoproduct creative strategy',
      summary:
        'Moved into strategy for performance offers — research-backed briefs and creatives for info-product funnels.',
      focus: ['HTTPS-47', 'US & DE markets', 'Pitch retention'],
      verticals: ['infoproducts'],
    },
    {
      id: '2024-tele',
      year: '2024',
      era: '2024 – 2025',
      market: 'Telehealth',
      title: 'Telehealth · NAD+',
      summary:
        'Owned creative end to end for telemedicine — ads, sales pages, quizzes, and the NAD+ Meta proof below.',
      focus: ['NAD+', 'Full funnels', 'UGC + VSL'],
      verticals: ['telehealth'],
    },
    {
      id: '2025-supp',
      year: '2025',
      era: '2025 – 2026',
      market: 'Supplements',
      title: 'Supplement markets',
      summary:
        'Creative for two separate supplement brands — Iron Rise and Liver Support — with account-level ROAS proof.',
      focus: ['Iron Rise', 'Liver Support', '4.05x ROAS'],
      verticals: ['iron-rise', 'liver-support'],
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
  showDirectContacts: false,
  contacts: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: '',
      description: 'Message me directly',
    },
    {
      id: 'discord',
      label: 'Discord',
      href: '',
      description: 'Chat on Discord',
    },
    {
      id: 'slack',
      label: 'Slack',
      href: '',
      description: 'Reach me on Slack',
    },
  ],
  seo: {
    title: 'Benjamin Rhuan — Creative Strategist',
    description:
      'Creative strategist for direct-response brands. Scripts, ads, VSL retention, and Meta Ads proof from scaled campaigns.',
    ogImage: '/og-image.svg',
  },
}
