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
    thumbnail: '/proof/thumb-sfk-hub.svg',
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
    thumbnail: '/proof/thumb-liver-support.svg',
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
    id: 'bizzopp-retention',
    title: 'BizzOpp — Pitch Retention',
    type: 'result',
    function: 'VSL Strategy',
    category: 'Results',
    market: 'BizzOpp',
    description:
      '47.61% pitch retention on a 22:51 video · 1,526 views · 658 plays · 49.39% play rate.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
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
    id: 'bizzopp-vsl',
    title: 'BizzOpp VSL — Wire 27',
    type: 'video',
    function: 'Full VSL',
    category: 'VSL',
    market: 'BizzOpp',
    description: 'Cold-traffic money offer VSL — “What do you usually do on Mondays?”',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'liver-ad-set',
    title: 'Liver Support — Ad Set',
    type: 'video',
    function: 'Paid Social Ads',
    category: 'Ads',
    market: 'Verdaia',
    description:
      'Selected Liver Support ads from the Verdaia account — creative paired with the $82K / 4.05x ROAS results.',
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
      'Men’s health ads for Iron Rise — compliant creative in one of the hardest niches to keep live.',
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
      'Current work: animated mini-VSLs and UGC talking heads for a telehealth NAD+ offer.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
]

export const typeFilters = [
  { id: 'all' as const, label: 'All work' },
  { id: 'script' as const, label: 'Scripts' },
  { id: 'video' as const, label: 'Ads & VSLs' },
  { id: 'result' as const, label: 'Results' },
]
