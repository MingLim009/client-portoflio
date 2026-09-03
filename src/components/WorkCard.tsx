import { motion } from 'framer-motion'
import type { WorkItem } from '../data/works'
import { getWorkVertical, verticalFilters } from '../data/works'
import { getWorkThumbnail } from '../lib/workMedia'
import { isPlaceholderDriveId } from '../lib/drive'
import { ResultCardMedia } from './ResultCardMedia'

type Props = {
  work: WorkItem
  index: number
  list: WorkItem[]
  onSelect: (work: WorkItem, list: WorkItem[]) => void
  compact?: boolean
}

function marketLabel(work: WorkItem) {
  const vertical = getWorkVertical(work)
  return verticalFilters.find((item) => item.id === vertical)?.label ?? vertical
}

export function WorkCard({ work, index, list, onSelect, compact }: Props) {
  const thumb = getWorkThumbnail(work)
  const pending =
    !work.localPreviewUrl && isPlaceholderDriveId(work.driveFileId)

  return (
    <motion.button
      type="button"
      className={compact ? 'work-item work-item-compact' : 'work-item'}
      onClick={() => onSelect(work, list)}
      aria-label={`Preview ${work.title}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="work-media">
        {work.cardHighlight ? (
          <ResultCardMedia {...work.cardHighlight} />
        ) : thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
              const fallback = event.currentTarget.nextElementSibling
              if (fallback instanceof HTMLElement) {
                fallback.hidden = false
              }
            }}
          />
        ) : null}
        {!work.cardHighlight ? (
          <div
            className="work-media-fallback"
            aria-hidden="true"
            hidden={Boolean(thumb)}
          >
            <span>
              {work.type === 'video'
                ? '▶'
                : work.type === 'result'
                  ? 'ROI'
                  : 'DOC'}
            </span>
          </div>
        ) : null}
        <span className="work-type">{work.type}</span>
        {pending && <span className="work-pending">Preview soon</span>}
        <span className="work-hover-cue">Preview</span>
      </div>
      <div className="work-copy">
        <p className="work-function">
          {work.function}
          {work.market ? ` · ${work.market}` : ''}
        </p>
        <h3>{work.title}</h3>
        <p className="work-desc">{work.description}</p>
        <p className="work-meta">{marketLabel(work)}</p>
      </div>
    </motion.button>
  )
}
