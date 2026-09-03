import type { WorkType } from './works'

export type CaseAssetType = WorkType | 'mentorship'

export type CaseAsset = {
  id: string
  title: string
  type: CaseAssetType
  subtitle: string
  description: string
  driveFileId: string
  thumbnail?: string
}

export type CaseStudy = {
  id: string
  title: string
  market: string
  summary: string
  note?: string
  assets: CaseAsset[]
}

/**
 * Grouped case studies — one story with script + creative + result (+ context).
 * Replace driveFileId values when Drive links arrive.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'prostalax-brazil',
    title: 'Prostalax — Brazil',
    market: 'Brazil',
    summary:
      'One connected piece of work: the finished VSL, the script behind it, the retention result, and the mentorship context that shaped the ads craft.',
    note:
      'The mentorship panel features Diogo Kobata — one of the leading ads experts of that period in Brazil.',
    assets: [
      {
        id: 'prostalax-creative-vsl',
        title: 'Criativo VSL',
        type: 'video',
        subtitle: 'August 2022',
        description:
          'Finished VSL creative for the Prostalax offer — the video as it ran.',
        driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
      },
      {
        id: 'prostalax-script-vsl',
        title: 'Script VSL',
        type: 'script',
        subtitle: 'August 2022',
        description:
          'The sales script written for the same VSL — writing and structure behind the creative.',
        driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
      },
      {
        id: 'prostalax-retention',
        title: 'Retenção alcançada',
        type: 'result',
        subtitle: 'Retention goal hit',
        description:
          'VTurb retention dashboard for this VSL — proof that the creative held attention through the pitch.',
        driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
      },
      {
        id: 'prostalax-mentorship',
        title: 'Mentoria Diogo Kobata',
        type: 'mentorship',
        subtitle: '2021 · Ads Expert',
        description:
          'Mentorship session with Diogo Kobata, one of the biggest ads experts of that era — the training context behind this work.',
        driveFileId: 'REPLACE_WITH_DRIVE_FILE_ID',
      },
    ],
  },
]

/** Flatten case assets into WorkItem-compatible shape for the preview modal */
export function caseAssetToWorkItem(
  asset: CaseAsset,
  caseStudy: CaseStudy,
): import('./works').WorkItem {
  return {
    id: asset.id,
    title: asset.title,
    type: asset.type === 'mentorship' ? 'result' : asset.type,
    function:
      asset.type === 'mentorship'
        ? 'Mentorship'
        : asset.type === 'script'
          ? 'VSL Script'
          : asset.type === 'video'
            ? 'VSL Creative'
            : 'Retention',
    category: caseStudy.title,
    market: caseStudy.market,
    description: asset.description,
    driveFileId: asset.driveFileId,
    thumbnail: asset.thumbnail,
  }
}
