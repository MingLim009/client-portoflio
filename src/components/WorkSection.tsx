import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { WorkItem, WorkType, WorkVertical } from '../data/works'
import {
  getWorkVertical,
  typeFilters,
  verticalFilters,
  works,
} from '../data/works'
import { getWorkThumbnail } from '../lib/workMedia'
import { isPlaceholderDriveId } from '../lib/drive'
import { ResultCardMedia } from './ResultCardMedia'

type Props = {
  onSelect: (work: WorkItem, list: WorkItem[]) => void
}

type FormatFilter = 'all' | WorkType
type MarketFilter = 'all' | WorkVertical

const formatSections: { id: WorkType; label: string }[] = [
  { id: 'script', label: 'Scripts' },
  { id: 'video', label: 'Videos' },
  { id: 'result', label: 'Results' },
]

function marketLabel(vertical: WorkVertical) {
  return verticalFilters.find((item) => item.id === vertical)?.label ?? vertical
}

export function WorkSection({ onSelect }: Props) {
  const [market, setMarket] = useState<MarketFilter>('telehealth')
  const [format, setFormat] = useState<FormatFilter>('all')

  const filtered = useMemo(
    () =>
      works.filter((work) => {
        const vertical = getWorkVertical(work)
        const marketOk = market === 'all' || vertical === market
        const formatOk = format === 'all' || work.type === format
        return marketOk && formatOk
      }),
    [market, format],
  )

  const marketSections = useMemo(() => {
    const ids =
      market === 'all'
        ? (verticalFilters
            .map((item) => item.id)
            .filter((id) => id !== 'all') as WorkVertical[])
        : [market]

    return ids
      .map((id) => {
        const meta = verticalFilters.find((item) => item.id === id)!
        const items = filtered.filter((work) => getWorkVertical(work) === id)
        return { id, meta, items }
      })
      .filter((section) => section.items.length > 0)
  }, [filtered, market])

  const resultLabel =
    filtered.length === 1 ? '1 piece' : `${filtered.length} pieces`

  return (
    <section className="section work-section" id="work">
      <div className="section-head">
        <p className="section-kicker">Selected work</p>
        <h2>Markets, scripts & videos</h2>
        <p className="section-lead">
          Pick a market on the left. Each market keeps scripts and videos in
          separate groups — Telehealth, Iron Rise, Liver Support, Infoproducts,
          and Direct response stay apart.
        </p>
      </div>

      <div className="work-shell">
        <aside className="work-sidebar" aria-label="Markets">
          <p className="work-sidebar-title">Markets</p>
          <nav className="work-sidebar-nav">
            {verticalFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  market === item.id
                    ? 'work-sidebar-link is-active'
                    : 'work-sidebar-link'
                }
                aria-pressed={market === item.id}
                onClick={() => setMarket(item.id)}
              >
                <span>{item.label}</span>
                {item.id !== 'all' ? (
                  <small>{item.blurb}</small>
                ) : (
                  <small>Browse every market</small>
                )}
              </button>
            ))}
          </nav>

          <div className="work-sidebar-formats">
            <p className="work-sidebar-title">Format</p>
            <div className="filter-group">
              {typeFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    format === item.id
                      ? 'chip chip-soft active'
                      : 'chip chip-soft'
                  }
                  aria-pressed={format === item.id}
                  onClick={() => setFormat(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="work-main">
          <div className="results-bar" aria-live="polite">
            <p>
              Showing <strong>{resultLabel}</strong>
              {market !== 'all'
                ? ` · ${marketLabel(market as WorkVertical)}`
                : ' · All markets'}
              {format !== 'all'
                ? ` / ${typeFilters.find((item) => item.id === format)?.label}`
                : ''}
            </p>
            {(market !== 'all' || format !== 'all') && (
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  setMarket('all')
                  setFormat('all')
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {marketSections.length > 0 ? (
            <div className="market-sections">
              {marketSections.map((section) => (
                <MarketBlock
                  key={section.id}
                  title={section.meta.label}
                  blurb={section.meta.blurb}
                  items={section.items}
                  format={format}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No pieces match these filters.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setMarket('all')
                  setFormat('all')
                }}
              >
                Show all work
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function MarketBlock({
  title,
  blurb,
  items,
  format,
  onSelect,
}: {
  title: string
  blurb: string
  items: WorkItem[]
  format: FormatFilter
  onSelect: Props['onSelect']
}) {
  const groups = formatSections
    .map((section) => ({
      ...section,
      items: items.filter((work) => work.type === section.id),
    }))
    .filter((group) => group.items.length > 0)
    .filter((group) => format === 'all' || group.id === format)

  return (
    <article className="market-block">
      <header className="market-block-banner">
        <div>
          <p className="market-block-kicker">Market</p>
          <h3>{title}</h3>
          <p className="market-block-blurb">{blurb}</p>
        </div>
        <p className="market-block-count">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'}
        </p>
      </header>

      <div className="format-sections">
        {groups.map((group) => (
          <div key={group.id} className="format-section">
            <div className="format-section-head">
              <h4>{group.label}</h4>
              <span>
                {group.items.length}{' '}
                {group.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="work-grid">
              {group.items.map((work, index) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={index}
                  list={group.items}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function WorkCard({
  work,
  index,
  list,
  onSelect,
}: {
  work: WorkItem
  index: number
  list: WorkItem[]
  onSelect: Props['onSelect']
}) {
  const thumb = getWorkThumbnail(work)
  const pending =
    !work.localPreviewUrl && isPlaceholderDriveId(work.driveFileId)
  const vertical = getWorkVertical(work)

  return (
    <motion.button
      type="button"
      className="work-item"
      onClick={() => onSelect(work, list)}
      aria-label={`Preview ${work.title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
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
        <p className="work-meta">{marketLabel(vertical)}</p>
      </div>
    </motion.button>
  )
}
