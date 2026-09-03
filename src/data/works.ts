export type WorkType = 'script' | 'video'

export type WorkItem = {
  id: string
  title: string
  type: WorkType
  /** Role / function shown on the card (e.g. Screenplay, Director, Editor) */
  function: string
  category: string
  description: string
  /** Google Drive file ID only — not the full URL */
  driveFileId: string
  /**
   * Optional custom thumbnail URL.
   * If empty, the site uses the Drive thumbnail for that file ID.
   */
  thumbnail?: string
  featured?: boolean
}

/**
 * Content layer — add / edit / remove items here.
 * No component changes needed when updating portfolio pieces.
 *
 * driveFileId: extract from any Drive share link:
 *   https://drive.google.com/file/d/FILE_ID_HERE/view?...
 * Sharing must be "Anyone with the link" (Viewer).
 */
export const works: WorkItem[] = [
  {
    id: 'sample-script-01',
    title: 'Midnight Transit',
    type: 'script',
    function: 'Screenplay',
    category: 'Drama',
    description:
      'A night-shift driver crosses the city with a passenger who knows too much about tomorrow.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    featured: true,
  },
  {
    id: 'sample-video-01',
    title: 'Soft Signal',
    type: 'video',
    function: 'Director / Editor',
    category: 'Short Film',
    description:
      'A quiet visual piece about missed calls and the light that stays on after midnight.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
    featured: true,
  },
  {
    id: 'sample-script-02',
    title: 'The Quiet Room',
    type: 'script',
    function: 'Treatment',
    category: 'Thriller',
    description:
      'Two strangers share a waiting room that never opens its door — until it does.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
  {
    id: 'sample-video-02',
    title: 'Frame by Frame',
    type: 'video',
    function: 'Editor',
    category: 'Reel',
    description:
      'Selected cuts showcasing pacing, transitions, and narrative rhythm.',
    driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
  },
]

export const categories = [
  'All',
  ...Array.from(new Set(works.map((w) => w.category))).sort(),
]

export const typeFilters = [
  { id: 'all' as const, label: 'All work' },
  { id: 'script' as const, label: 'Scripts' },
  { id: 'video' as const, label: 'Videos' },
]
