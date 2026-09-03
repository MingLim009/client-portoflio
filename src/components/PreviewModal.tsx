import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { WorkItem } from '../data/works'
import {
  drivePreviewUrl,
  driveViewUrl,
  isPlaceholderDriveId,
} from '../lib/drive'

type Props = {
  work: WorkItem | null
  onClose: () => void
}

export function PreviewModal({ work, onClose }: Props) {
  useEffect(() => {
    if (!work) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [work, onClose])

  if (!work) return null

  const pending = isPlaceholderDriveId(work.driveFileId)
  const previewSrc = pending ? '' : drivePreviewUrl(work.driveFileId)
  const driveHref = pending ? '#' : driveViewUrl(work.driveFileId)

  return (
    <div className="modal-root" role="presentation" onClick={onClose}>
      <motion.div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-top">
          <div>
            <p className="work-function">
              {work.function} · {work.type}
            </p>
            <h2 id="preview-title">{work.title}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close preview">
            ✕
          </button>
        </div>

        <div className={`preview-frame ${work.type}`}>
          {pending ? (
            <div className="preview-placeholder">
              <p>Drive file ID not set yet.</p>
              <p>Once the client shares the file, replace the ID in the data layer.</p>
            </div>
          ) : (
            <iframe
              title={`${work.title} preview`}
              src={previewSrc}
              allow="autoplay"
              allowFullScreen
            />
          )}
        </div>

        <p className="modal-desc">{work.description}</p>

        <div className="modal-actions">
          <a
            className="btn btn-ghost"
            href={driveHref}
            target="_blank"
            rel="noreferrer"
            aria-disabled={pending}
            onClick={(event) => {
              if (pending) event.preventDefault()
            }}
          >
            Open in Drive
          </a>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
