import { driveThumbnailUrl, isPlaceholderDriveId } from '../lib/drive'
import type { WorkItem } from '../data/works'

export function getWorkThumbnail(work: WorkItem): string | null {
  if (work.thumbnail) return work.thumbnail
  if (isPlaceholderDriveId(work.driveFileId)) return null
  return driveThumbnailUrl(work.driveFileId)
}
