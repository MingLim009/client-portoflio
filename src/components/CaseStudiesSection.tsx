import { motion } from 'framer-motion'
import {
  caseAssetToWorkItem,
  caseStudies,
  type CaseAsset,
  type CaseStudy,
} from '../data/cases'
import type { WorkItem } from '../data/works'
import { driveThumbnailUrl, isPlaceholderDriveId } from '../lib/drive'

type Props = {
  onSelect: (work: WorkItem, list: WorkItem[]) => void
}

function assetLabel(type: CaseAsset['type']) {
  if (type === 'video') return 'Video'
  if (type === 'script') return 'Script'
  if (type === 'result') return 'Result'
  return 'Context'
}

function assetFallback(type: CaseAsset['type']) {
  if (type === 'video') return '▶'
  if (type === 'script') return 'DOC'
  if (type === 'result') return 'ROI'
  return 'ADS'
}

function assetThumb(asset: CaseAsset): string | null {
  if (asset.thumbnail) return asset.thumbnail
  if (isPlaceholderDriveId(asset.driveFileId)) return null
  return driveThumbnailUrl(asset.driveFileId)
}

export function CaseStudiesSection({ onSelect }: Props) {
  return (
    <section className="section cases-section" id="cases">
      <div className="section-head">
        <p className="section-kicker">Case studies</p>
        <h2>One story, four sides</h2>
        <p className="section-lead">
          Script, finished creative, retention proof, and the craft context —
          shown together, because they belong to the same piece of work.
        </p>
      </div>

      <div className="cases-list">
        {caseStudies.map((study) => (
          <CaseStudyBlock key={study.id} study={study} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

function CaseStudyBlock({
  study,
  onSelect,
}: {
  study: CaseStudy
  onSelect: Props['onSelect']
}) {
  const list = study.assets.map((asset) => caseAssetToWorkItem(asset, study))

  return (
    <article className="case-block">
      <header className="case-head">
        <div>
          <p className="case-market">{study.market}</p>
          <h3>{study.title}</h3>
          <p className="case-summary">{study.summary}</p>
          {study.note ? <p className="case-note">{study.note}</p> : null}
        </div>
      </header>

      <div className="case-grid">
        {study.assets.map((asset, index) => {
          const pending = isPlaceholderDriveId(asset.driveFileId)
          const work = list[index]
          const thumb = assetThumb(asset)

          return (
            <motion.button
              key={asset.id}
              type="button"
              className="case-asset"
              onClick={() => onSelect(work, list)}
              aria-label={`Open ${asset.title}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.2),
              }}
            >
              <div className="case-media">
                {thumb ? (
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
                <div
                  className="work-media-fallback"
                  aria-hidden="true"
                  hidden={Boolean(thumb)}
                >
                  <span>{assetFallback(asset.type)}</span>
                </div>
                <span className="work-type">{assetLabel(asset.type)}</span>
                {pending && <span className="work-pending">Link soon</span>}
              </div>
              <div className="case-copy">
                <h4>{asset.title}</h4>
                <p className="case-subtitle">{asset.subtitle}</p>
                <p className="case-desc">{asset.description}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </article>
  )
}
