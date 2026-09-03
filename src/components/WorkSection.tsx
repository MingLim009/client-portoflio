import { useState } from 'react'
import { motion } from 'framer-motion'
import type { WorkItem, WorkType } from '../data/works'
import { typeFilters, works } from '../data/works'
import { getWorkThumbnail } from '../lib/workMedia'
import { isPlaceholderDriveId } from '../lib/drive'

type Props = {
  onSelect: (work: WorkItem) => void
}

export function WorkSection({ onSelect }: Props) {
  const [type, setType] = useState<'all' | WorkType>('all')
  const [category, setCategory] = useState('All')

  const categories = [
    'All',
    ...Array.from(
      new Set(
        works
          .filter((w) => type === 'all' || w.type === type)
          .map((w) => w.category),
      ),
    ).sort(),
  ]

  const filtered = works.filter((work) => {
    const typeOk = type === 'all' || work.type === type
    const categoryOk = category === 'All' || work.category === category
    return typeOk && categoryOk
  })

  return (
    <section className="section work-section" id="work">
      <div className="section-head">
        <p className="section-kicker">Selected work</p>
        <h2>Scripts & videos</h2>
        <p className="section-lead">
          Preview each piece on this page. Open Google Drive when you need the
          original file.
        </p>
      </div>

      <div className="filters" role="toolbar" aria-label="Filter work">
        <div className="filter-group">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={type === filter.id ? 'chip active' : 'chip'}
              onClick={() => {
                setType(filter.id)
                setCategory('All')
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="filter-group">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? 'chip chip-soft active' : 'chip chip-soft'}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="work-grid">
        {filtered.map((work, index) => {
          const thumb = getWorkThumbnail(work)
          const pending = isPlaceholderDriveId(work.driveFileId)

          return (
            <motion.button
              key={work.id}
              type="button"
              className="work-item"
              onClick={() => onSelect(work)}
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
                    <span>{work.type === 'video' ? '▶' : 'SCR'}</span>
                  </div>
                )}
                <span className="work-type">{work.type}</span>
                {pending && <span className="work-pending">Link pending</span>}
              </div>
              <div className="work-copy">
                <p className="work-function">{work.function}</p>
                <h3>{work.title}</h3>
                <p className="work-desc">{work.description}</p>
                <p className="work-meta">{work.category}</p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No pieces in this filter yet.</p>
      )}
    </section>
  )
}
