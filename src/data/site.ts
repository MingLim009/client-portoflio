export type ContactLink = {
  id: 'whatsapp' | 'discord' | 'slack'
  label: string
  href: string
  description: string
}

export type SiteConfig = {
  name: string
  role: string
  tagline: string
  about: string
  heroLine1: string
  heroLine2: string
  services: string
  availability: string
  location: string
  origin: string
  email?: string
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

/**
 * Update this file with the client's real details once materials arrive.
 * Leave unused contact hrefs empty to hide them from the UI.
 */
export const site: SiteConfig = {
  name: 'Benjamim Rhuan',
  role: 'Writer & Visual Storyteller',
  tagline:
    'Scripts and films shaped for clarity, pace, and emotional precision.',
  about:
    'I craft screenplays and video pieces that move with intention — from first page to final cut. This portfolio collects selected scripts and films, each available to preview here and open from Google Drive when you need the source file.',
  heroLine1: 'Scripts &',
  heroLine2: 'films',
  services: 'Scripts / Videos / Treatments',
  availability: 'Currently available for projects worldwide',
  location: 'Based worldwide',
  origin: 'Stories in motion',
  email: '',
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
    title: 'Benjamim Rhuan — Portfolio',
    description:
      'Professional portfolio of scripts and videos. Preview work on-site or open the original files on Google Drive.',
    ogImage: '/og-image.svg',
  },
}
