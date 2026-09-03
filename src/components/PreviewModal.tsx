import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { WorkItem } from '../data/works'
import {
  drivePreviewUrl,
  driveViewUrl,
  isPlaceholderDriveId,
  resolveDriveKind,
} from '../lib/drive'

type Props = {
  work: WorkItem | null
  list: WorkItem[]
  onClose: () => void
  onNavigate: (work: WorkItem) => void
}

export function PreviewModal({ work, list, onClose, onNavigate }: Props) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const index = work ? list.findIndex((item) => item.id === work.id) : -1
  const hasPrev = index > 0
  const hasNext = index >= 0 && index < list.length - 1

  useEffect(() => {
    if (!work) return

    setIframeLoaded(false)
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && index > 0) onNavigate(list[index - 1])
      if (event.key === 'ArrowRight' && index >= 0 && index < list.length - 1) {
        onNavigate(list[index + 1])
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [work, index, list, onClose, onNavigate])

  if (!work) return null

  const hasLocal = Boolean(work.localPreviewUrl)
  const localIsVideo = Boolean(
    work.localPreviewUrl?.match(/\.(mp4|webm|mov|ogg)(\?|$)/i),
  )
  const pendingDrive = isPlaceholderDriveId(work.driveFileId)
  const driveKind = resolveDriveKind(work.driveKind, work.type)
  const previewSrc = pendingDrive
    ? ''
    : drivePreviewUrl(work.driveFileId, driveKind)
  const driveHref = pendingDrive
    ? undefined
    : driveViewUrl(work.driveFileId, driveKind)

  return (
    <div className="modal-root" role="presentation" onClick={onClose}>
      <motion.div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-top">
          <div>
            <p className="work-function">
              {work.function} · {work.type}
              {list.length > 1 && index >= 0
                ? ` · ${index + 1} of ${list.length}`
                : null}
            </p>
            <h2 id={titleId}>{work.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>

        <div
          className={`preview-frame ${
            work.type === 'script'
              ? 'script'
              : hasLocal && !localIsVideo
                ? 'stats'
                : 'video'
          }`}
        >
          {hasLocal && localIsVideo ? (
            <video
              className="preview-video"
              src={work.localPreviewUrl}
              controls
              playsInline
            />
          ) : hasLocal ? (
            <img
              className="preview-image"
              src={work.localPreviewUrl}
              alt={`${work.title} preview`}
            />
          ) : pendingDrive ? (
            <div className="preview-placeholder">
              <p>Drive file not linked yet.</p>
              <p>
                {work.type === 'result'
                  ? 'Result proof is shown on the Proof section. The original dashboard file will open here once the Drive link is added.'
                  : 'This piece is listed from the portfolio. The Google Drive file will open here once the client sends the share link.'}
              </p>
            </div>
          ) : (
            <>
              {!iframeLoaded && (
                <div className="preview-loading" aria-live="polite">
                  Loading preview…
                </div>
              )}
              <iframe
                title={`${work.title} preview`}
                src={previewSrc}
                allow="autoplay"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
              />
            </>
          )}
        </div>

        <p className="modal-desc">{work.description}</p>

        <div className="modal-nav">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={!hasPrev}
            onClick={() => hasPrev && onNavigate(list[index - 1])}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={!hasNext}
            onClick={() => hasNext && onNavigate(list[index + 1])}
          >
            Next →
          </button>
        </div>

        <div className="modal-actions">
          {driveHref ? (
            <a
              className="btn btn-ghost"
              href={driveHref}
              target="_blank"
              rel="noreferrer"
            >
              {driveKind === 'doc' ? 'Open document' : 'Open in Drive'}
            </a>
          ) : hasLocal ? null : (
            <button type="button" className="btn btn-ghost" disabled>
              Drive link pending
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Back to work
          </button>
        </div>
      </motion.div>
    </div>
  )
}
