export type WorkType = 'script' | 'video' | 'result'

export type WorkItem = {
  id: string
  title: string
  type: WorkType
  /** Role / function shown on the card */
  function: string
  category: string
  description: string
  /** Google Drive file ID only — not the full URL */
  driveFileId: string
  /** Optional custom thumbnail URL */
  thumbnail?: string
  /** Inline metric card — preferred over thumbnail for Results */
  cardHighlight?: {
    value: string
    label: string
    detail: string
    tone?: 'blue' | 'mint'
  }
  featured?: boolean
  market?: string
}

/**
 * Content layer — add / edit / remove items here.
 * Replace driveFileId values when the client sends Drive links.
 *
 * driveFileId: extract from any Drive share link:
 *   https://drive.google.com/file/d/FILE_ID_HERE/view?...
 * Sharing must be "Anyone with the link" (Viewer).
 */
export const works: WorkItem[] = [
  {
    id: 'meta-sfk-hub',
    title: 'Meta Ads — SFK Hub',
    type: 'result',
    function: 'Creative Strategy',
    category: 'Results',
    market: 'United States',
    description:
      '$267,778.67 across 88 campaigns · 5,837 purchases · $45.88 per purchase. Account-level proof from the info-product funnel.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    cardHighlight: {
      value: '$267,778',
      label: 'Meta Ads · SFK Hub',
      detail: '88 campaigns · 5,837 purchases · $45.88 CPA',
      tone: 'blue',
    },
    featured: true,
  },
  {
    id: 'meta-liver-support',
    title: 'Meta Ads — Liver Support',
    type: 'result',
    function: 'Creative Strategy',
    category: 'Results',
    market: 'Verdaia',
    description:
      '$82,225.16 spent · 4.05x average ROAS · best ad set at 12.27x on the Liver Support offer.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    cardHighlight: {
      value: '4.05x',
      label: 'Meta Ads · Liver Support',
      detail: '$82,225 spent · peak ad set 12.27x ROAS',
      tone: 'mint',
    },
    featured: true,
  },
  {
    id: 'prostapime-retention',
    title: 'ProstaPrime VSL — Retention',
    type: 'result',
    function: 'VSL Strategy',
    category: 'Results',
    market: 'United States',
    description:
      '13.3M plays on VTurb. 18.42% still watching at 33:55 — 92% into a 36:43 video.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    featured: true,
  },
  {
    id: 'vision-vsl',
    title: 'Vision Offer VSL',
    type: 'video',
    function: 'Full VSL',
    category: 'VSL',
    market: 'United States',
    description: 'Eye-health VSL for the US market.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'prostate-vsl-us',
    title: 'Prostate VSL — US',
    type: 'video',
    function: 'Full VSL',
    category: 'VSL',
    market: 'United States',
    description: 'Prostate VSL produced for the US market.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'zepbound-script',
    title: 'ZepBound 2.0 VSL — Script',
    type: 'script',
    function: 'VSL Script',
    category: 'Script',
    market: 'United States',
    description: 'GLP-1 angle VSL script — the document behind the creative.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'memory-advertorials',
    title: 'Memory Advertorials',
    type: 'script',
    function: 'Advertorial',
    category: 'Script',
    market: 'United States',
    description: 'Native-ad format advertorials for a memory offer.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'memocore-upsell',
    title: 'Memocore Upsell 1',
    type: 'script',
    function: 'Upsell Script',
    category: 'Script',
    market: 'United States',
    description: 'Post-purchase upsell flow script.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'longform-scripts',
    title: 'Long-form Ad Scripts',
    type: 'script',
    function: 'Ad Scripts',
    category: 'Script',
    market: 'United States',
    description: 'Long-form paid social scripts — the format scaling in selected niches.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'https-47-script',
    title: 'HTTPS-47 — VSL Script',
    type: 'script',
    function: 'VSL Script + Brief',
    category: 'Infoproduct',
    market: 'HTTPS-47',
    description:
      'Updated VSL script + brief for HTTPS-47 (infoproduct). Wire 27 was removed as requested.',
    driveFileId: '10Xdh0vhnA2gEpOsY3msCKo3yOGZ5947s0acdTEQKRpE',
    featured: false,
  },
  {
    id: 'liver-research',
    title: 'Liver Support — Competitor Research',
    type: 'script',
    function: 'Competitor analysis',
    category: 'Nutraceuticals (Liver Support)',
    market: 'Verdaia',
    description:
      'Research before writing: competitor teardown, best public segments, persona & mechanism insights used to build the ads.',
    driveFileId: '1vpONqeSLWQeZ_iitPZtLhccKov2aCxTAqH9b5UxPeZ8',
    featured: false,
  },
  {
    id: 'liver-script-07',
    title: 'Concept 07 — Script + Brief',
    type: 'script',
    function: 'VSL Script + Brief',
    category: 'Nutraceuticals (Liver Support)',
    market: 'Verdaia',
    description:
      'Updated script + brief for the Liver Support VSL set (Concept 07).',
    driveFileId: '14SM_krE_arlmWgCl3v8o8FCPU6vgpWf-rpGN6Skh4jc',
    featured: false,
  },
  {
    id: 'iron-rise-ads-doc',
    title: 'Iron Rise — Ads Library',
    type: 'script',
    function: 'Ads library / copy list',
    category: 'Nutraceuticals (Iron Rise)',
    market: 'Iron Rise',
    description:
      'All Iron Rise ads list from the client doc (includes the ad that needs replacement).',
    driveFileId: '1mz5Q2tP4yjLCipOG0gJe1jLa_-HEQsbMxsPAR2vH7Sg',
    featured: false,
  },
  {
    id: 'nad-telehealth-script',
    title: 'NAD+ — Telehealth Script',
    type: 'script',
    function: 'Telehealth scripts',
    category: 'Telehealth',
    market: 'NAD+',
    description:
      'Script doc for the NAD+ telehealth mini-VSLs / ads (replacement for “six signs” handled in the ads library doc).',
    driveFileId: '1L9oLwm_6W3YuqkVCDNBvnaU1gB-qWVINYQyjD_eLgew',
    featured: false,
  },
  {
    id: 'nad-3-0-talking-head-hook2',
    title:
      '3.0 Script — Persona Supplement-fatigued woman 40–55 (Hook 2)',
    type: 'script',
    function: 'Talking head script',
    category: 'Telehealth',
    market: 'NAD+',
    description:
      'Client script doc for the NAD+ talking head piece (Hook 2 / TOF-3.0).',
    driveFileId: '13ll9HoA2icUxBPHXeS7GDEH0sNs2MuV3tXr2HhEVlvM',
    featured: false,
  },
  {
    id: 'nad-4-0-podcast',
    title: '4.0 Script — Persona Woman 50+ (It’s Just Your Age)',
    type: 'script',
    function: 'Podcast script',
    category: 'Telehealth',
    market: 'NAD+',
    description:
      'Client script doc for the NAD+ 4.0 concept (Podcast angle / 3 hooks).',
    driveFileId: '1gXRLPsjYlCuLbL35-3UsK41Vr4lhf6RKGunJCODKhZI',
    featured: false,
  },
  {
    id: 'nad-whiteboard',
    title: 'Whiteboard',
    type: 'script',
    function: 'Production reference',
    category: 'Telehealth',
    market: 'NAD+',
    description: 'Client whiteboard doc for the NAD+ production set.',
    driveFileId: '1y6-7S3kl7MQME-TtUjvUeLrykn7rE0M49mELQfGMJdk',
    featured: false,
  },
  {
    id: 'liver-ad-set',
    title: 'Liver Support — Ad Set',
    type: 'video',
    function: 'Paid Social Ads',
    category: 'Ads',
    market: 'Verdaia',
    description:
      'Liver Support is a supplement that supports the liver. Creative strategy built from competitor research (see Liver Research doc) and paired with the $82K / 4.05x ROAS results.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    featured: true,
  },
  {
    id: 'iron-rise-ads',
    title: 'Iron Rise — Ad Set',
    type: 'video',
    function: 'Paid Social Ads',
    category: 'Ads',
    market: 'Verdaia',
    description:
      'Men’s health ads for Iron Rise — compliant creative in a difficult niche. Use the Iron Rise Ads Library doc for the full list (last ad will be replaced as requested).',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'telehealth-nads',
    title: 'Telehealth NAD+ — Mini-VSLs',
    type: 'video',
    function: 'Animated + UGC',
    category: 'Ads',
    market: 'Telehealth',
    description:
      'Current work: animated mini-VSLs and UGC talking heads for a telehealth NAD+ offer. Script reference: NAD+ Telehealth Script doc.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
]

export const typeFilters = [
  { id: 'all' as const, label: 'All work' },
  { id: 'script' as const, label: 'Scripts' },
  { id: 'video' as const, label: 'Ads & VSLs' },
  { id: 'result' as const, label: 'Results' },
]
