import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import {
  getWorkVertical,
  typeFilters,
  works,
  type WorkItem,
  type WorkType,
  type WorkVertical,
} from '../data/works'
import { WorkCard } from './WorkCard'

type Props = {
  onSelect: (work: WorkItem, list: WorkItem[]) => void
}

type FormatFilter = 'all' | WorkType

const yearFilters = ['All', ...site.journey.map((step) => step.year)]
const marketFilters = [
  'All markets',
  ...Array.from(new Set(site.journey.map((step) => step.market))),
]

const formatSections: { id: WorkType; label: string }[] = [
  { id: 'script', label: 'Scripts' },
  { id: 'video', label: 'Videos' },
  { id: 'result', label: 'Results' },
]

function yearFromHash(hash: string): string | null {
  const match = hash.match(/^#(?:journey|work)-(\d{4})$/)
  return match?.[1] ?? null
}

function worksForStep(verticals: WorkVertical[], format: FormatFilter) {
  return works.filter((work) => {
    const verticalOk = verticals.includes(getWorkVertical(work))
    const formatOk = format === 'all' || work.type === format
    return verticalOk && formatOk
  })
}

export function JourneySection({ onSelect }: Props) {
  const [year, setYear] = useState(() => {
    if (typeof window === 'undefined') return 'All'
    const fromHash = yearFromHash(window.location.hash)
    return fromHash && site.journey.some((step) => step.year === fromHash)
      ? fromHash
      : 'All'
  })
  const [market, setMarket] = useState('All markets')
  const [format, setFormat] = useState<FormatFilter>('all')

  useEffect(() => {
    const applyHash = () => {
      const fromHash = yearFromHash(window.location.hash)
      if (fromHash && site.journey.some((step) => step.year === fromHash)) {
        setYear(fromHash)
        setMarket('All markets')
      }
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const filtered = useMemo(
    () =>
      site.journey.filter((step) => {
        const yearOk = year === 'All' || step.year === year
        const marketOk = market === 'All markets' || step.market === market
        return yearOk && marketOk
      }),
    [year, market],
  )

  const totalPieces = useMemo(
    () =>
      filtered.reduce(
        (count, step) => count + worksForStep(step.verticals, format).length,
        0,
      ),
    [filtered, format],
  )

  const selectYear = (next: string) => {
    setYear(next)
    if (next === 'All') {
      history.replaceState(null, '', '#journey')
      return
    }
    history.replaceState(null, '', `#journey-${next}`)
  }

  return (
    <section className="section journey-section" id="journey">
      <div className="section-head journey-head" id="work">
        <p className="section-kicker">Journey + work</p>
        <h2>How I got here</h2>
        <p className="section-lead">{site.journeyIntro}</p>
      </div>

      <div className="journey-shortcuts" role="group" aria-label="Timeline filters">
        <div className="filter-row">
          <p className="filter-label">Timeline</p>
          <div className="filter-group">
            {yearFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={year === item ? 'chip active' : 'chip'}
                aria-pressed={year === item}
                onClick={() => selectYear(item)}
              >
                {item === 'All' ? 'Full path' : item}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-row">
          <p className="filter-label">Market focus</p>
          <div className="filter-group">
            {marketFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  market === item ? 'chip chip-soft active' : 'chip chip-soft'
                }
                aria-pressed={market === item}
                onClick={() => setMarket(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-row">
          <p className="filter-label">Format</p>
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
      </div>

      <div className="results-bar journey-results" aria-live="polite">
        <p>
          Showing <strong>{totalPieces}</strong>{' '}
          {totalPieces === 1 ? 'piece' : 'pieces'} inside the timeline
          {year !== 'All' ? ` · ${year}` : ''}
          {market !== 'All markets' ? ` · ${market}` : ''}
          {format !== 'all'
            ? ` · ${typeFilters.find((item) => item.id === format)?.label}`
            : ''}
        </p>
        {(year !== 'All' || market !== 'All markets' || format !== 'all') && (
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              selectYear('All')
              setMarket('All markets')
              setFormat('all')
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="journey-body">
        <div className="journey-track" aria-live="polite">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No steps match these filters.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  selectYear('All')
                  setMarket('All markets')
                  setFormat('all')
                }}
              >
                Show full timeline
              </button>
            </div>
          ) : (
            filtered.map((step, index) => {
              const stepWorks = worksForStep(step.verticals, format)
              const groups = formatSections
                .map((section) => ({
                  ...section,
                  items: stepWorks.filter((work) => work.type === section.id),
                }))
                .filter((group) => group.items.length > 0)

              return (
                <motion.article
                  key={step.id}
                  id={`journey-${step.year}`}
                  className="journey-step"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                >
                  <div className="journey-step-rail" aria-hidden="true">
                    <span className="journey-dot" />
                    {index < filtered.length - 1 ? (
                      <span className="journey-line" />
                    ) : null}
                  </div>
                  <div className="journey-step-card">
                    <div className="journey-step-top">
                      <p className="journey-year">
                        {step.year}
                        <span> · {step.era}</span>
                      </p>
                      <span className="journey-market">{step.market}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p className="journey-summary">{step.summary}</p>
                    <div className="journey-focus">
                      {step.focus.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    {groups.length > 0 ? (
                      <div className="journey-work">
                        {groups.map((group) => (
                          <div key={group.id} className="journey-work-group">
                            <div className="format-section-head">
                              <h4>{group.label}</h4>
                              <span>
                                {group.items.length}{' '}
                                {group.items.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                            <div className="work-grid journey-work-grid">
                              {group.items.map((work, workIndex) => (
                                <WorkCard
                                  key={work.id}
                                  work={work}
                                  index={workIndex}
                                  list={group.items}
                                  onSelect={onSelect}
                                  compact
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="journey-work-empty">
                        No pieces in this chapter for the current format filter.
                      </p>
                    )}
                  </div>
                </motion.article>
              )
            })
          )}
        </div>

        <aside className="journey-aside" aria-label="Timeline guide">
          <div className="journey-aside-panel">
            <p className="journey-aside-kicker">{site.journeyGuideTitle}</p>
            <p className="journey-aside-blurb">{site.journeyGuide}</p>
            <ul className="journey-aside-points">
              {site.journeyGuidePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="journey-aside-effect" aria-hidden="true">
              <span className="journey-aside-line" />
              <img
                className="journey-aside-spark"
                src="/brand/sparkline-symbol.svg"
                alt=""
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
