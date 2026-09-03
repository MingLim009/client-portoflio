import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { WorkItem, WorkType } from '../data/works'
import { typeFilters, works } from '../data/works'
import { getWorkThumbnail } from '../lib/workMedia'
import { isPlaceholderDriveId } from '../lib/drive'

type Props = {
  onSelect: (work: WorkItem, list: WorkItem[]) => void
}

export function WorkSection({ onSelect }: Props) {
  const [type, setType] = useState<'all' | WorkType>('all')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          works
            .filter((w) => type === 'all' || w.type === type)
            .map((w) => w.category),
        ),
      ).sort(),
    ],
    [type],
  )

  const filtered = useMemo(
    () =>
      works.filter((work) => {
        const typeOk = type === 'all' || work.type === type
        const categoryOk = category === 'All' || work.category === category
        return typeOk && categoryOk
      }),
    [type, category],
  )

  const resultLabel =
    filtered.length === 1
      ? '1 piece'
      : `${filtered.length} pieces`

  const activeTypeLabel =
    typeFilters.find((filter) => filter.id === type)?.label ?? 'All work'

  return (
    <section className="section work-section" id="work">
      <div className="section-head">
        <p className="section-kicker">Selected work</p>
        <h2>Scripts, ads & results</h2>
        <p className="section-lead">
          Not a video-editor reel — each piece pairs the writing with the creative
          outcome. Preview here; open Drive when the source file is linked.
        </p>
      </div>

      <div className="filters" role="group" aria-label="Filter work">
        <div className="filter-row">
          <p className="filter-label" id="filter-type-label">
            Type
          </p>
          <div
            className="filter-group"
            role="toolbar"
            aria-labelledby="filter-type-label"
          >
            {typeFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={type === filter.id ? 'chip active' : 'chip'}
                aria-pressed={type === filter.id}
                onClick={() => {
                  setType(filter.id)
                  setCategory('All')
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <p className="filter-label" id="filter-category-label">
            Category
          </p>
          <div
            className="filter-group"
            role="toolbar"
            aria-labelledby="filter-category-label"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={
                  category === cat ? 'chip chip-soft active' : 'chip chip-soft'
                }
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-bar" aria-live="polite">
        <p>
          Showing <strong>{resultLabel}</strong>
          {type !== 'all' || category !== 'All'
            ? ` · ${activeTypeLabel}${category !== 'All' ? ` / ${category}` : ''}`
            : null}
        </p>
        {(type !== 'all' || category !== 'All') && (
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setType('all')
              setCategory('All')
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="work-grid">
          {filtered.map((work, index) => {
            const thumb = getWorkThumbnail(work)
            const pending = isPlaceholderDriveId(work.driveFileId)

            return (
              <motion.button
                key={work.id}
                type="button"
                className="work-item"
                onClick={() => onSelect(work, filtered)}
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
                  {thumb ? (
                    <img src={thumb} alt="" loading="lazy" />
                  ) : (
                    <div className="work-media-fallback" aria-hidden="true">
                    <span>
                      {work.type === 'video'
                        ? '▶'
                        : work.type === 'result'
                          ? 'ROI'
                          : 'DOC'}
                    </span>
                  </div>
                  )}
                  <span className="work-type">{work.type}</span>
                  {pending && (
                    <span className="work-pending">Preview soon</span>
                  )}
                  <span className="work-hover-cue">Preview</span>
                </div>
                <div className="work-copy">
                  <p className="work-function">
                    {work.function}
                    {work.market ? ` · ${work.market}` : ''}
                  </p>
                  <h3>{work.title}</h3>
                  <p className="work-desc">{work.description}</p>
                  <p className="work-meta">{work.category}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <p>No pieces match these filters.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setType('all')
              setCategory('All')
            }}
          >
            Show all work
          </button>
        </div>
      )}
    </section>
  )
}
