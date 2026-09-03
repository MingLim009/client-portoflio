/**
 * Google Drive / Docs URL helpers.
 * Files use /file/d/.../preview; Google Docs use docs.google.com/.../preview.
 * Sharing must be "Anyone with the link".
 */

export type DriveKind = 'file' | 'doc'

export function drivePreviewUrl(fileId: string, kind: DriveKind = 'file'): string {
  if (kind === 'doc') {
    return `https://docs.google.com/document/d/${fileId}/preview`
  }
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function driveViewUrl(fileId: string, kind: DriveKind = 'file'): string {
  if (kind === 'doc') {
    return `https://docs.google.com/document/d/${fileId}/edit`
  }
  return `https://drive.google.com/file/d/${fileId}/view`
}

export function driveThumbnailUrl(fileId: string, size = 1200): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

export function isPlaceholderDriveId(fileId: string): boolean {
  return !fileId || fileId.startsWith('REPLACE_')
}

/** Scripts are usually Google Docs unless driveKind is set explicitly. */
export function resolveDriveKind(
  kind: DriveKind | undefined,
  type: string,
): DriveKind {
  if (kind) return kind
  return type === 'script' ? 'doc' : 'file'
}
