/**
 * Google Drive URL helpers.
 * Embeds use /preview; secondary actions use /view.
 * Files must be shared as "Anyone with the link".
 */

export function drivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function driveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`
}

export function driveThumbnailUrl(fileId: string, size = 1200): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

export function isPlaceholderDriveId(fileId: string): boolean {
  return !fileId || fileId.startsWith('REPLACE_')
}
