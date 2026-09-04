import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import {
  getWorkVertical,
  typeFilters,
  verticalFilters,
  works,
  type WorkItem,
  type WorkType,
  type WorkVertical,
} from '../data/works'
import { ExpandableText } from './ExpandableText'
import { WorkCard } from './WorkCard'

type Props = {
  onSelect: (work: WorkItem, list: WorkItem[]) => void
}

type FormatFilter = 'all' | WorkType

const hiddenInJourney = new Set([
  'meta-nad-telehealth',
  'meta-liver-support',
  'prostapime-retention',
])

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
    if (hiddenInJourney.has(work.id)) return false
    const verticalOk = verticals.includes(getWorkVertical(work))
    const formatOk = format === 'all' || work.type === format
    return verticalOk && formatOk
  })
}

function verticalLabel(vertical: WorkVertical) {
  return verticalFilters.find((item) => item.id === vertical)?.label ?? vertical
}

function workGroups(verticals: WorkVertical[], stepWorks: WorkItem[]) {
  const buckets =
    verticals.length > 1
      ? verticals.map((vertical) => ({
          key: vertical,
          label: verticalLabel(vertical),
          items: stepWorks.filter((work) => getWorkVertical(work) === vertical),
        }))
      : [{ key: 'all', label: '', items: stepWorks }]

  return buckets.flatMap((bucket) =>
    formatSections
      .map((section) => ({
        id: `${bucket.key}-${section.id}`,
        label: bucket.label
          ? `${bucket.label} · ${section.label}`
          : section.label,
        items: bucket.items.filter((work) => work.type === section.id),
      }))
      .filter((group) => group.items.length > 0),
  )
}

function yearChipLabel(year: string) {
  if (year === 'All') return 'Full path'
  return site.journey.find((step) => step.year === year)?.market ?? year
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

  const journeyPreview = (
    <>
      <p>
        I started in Direct Response in 2021, with{' '}
        <em className="name-mark">Stefan Georgi</em> as one of my biggest
        references, learning the craft through VSLs, advertorials, presells,
        and complete sales funnels.
      </p>
    </>
  )
  const journeyMore = (
    <>
      <p>
        Over time, that foundation evolved into creative strategy for DTC
        brands across <em>supplements</em> and <em>telehealth</em>, while
        keeping the same performance-first mindset.
      </p>
      <p>
        This timeline shows that evolution through the actual work: research,
        briefs, scripts, finished creatives, and the results behind them.
      </p>
    </>
  )

  return (
    <section className="section journey-section" id="journey">
      <div className="section-head journey-head is-centered" id="work">
        <p className="section-kicker">Journey + work</p>
        <h2>How I got here</h2>
        <ExpandableText
          className="section-lead is-centered"
          preview={journeyPreview}
          hook="Over time, that foundation evolved into creative strategy…"
          more={journeyMore}
        />
        <p className="journey-ps">
          P.S. Start with the latest work, or filter by year, market or format.
        </p>
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
                {yearChipLabel(item)}
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
          {year !== 'All' ? ` · ${yearChipLabel(year)}` : ''}
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
              const groups = workGroups(step.verticals, stepWorks)

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
                        {step.era}
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

        <aside className="journey-aside" aria-label="How I build creative">
          <div className="journey-aside-panel">
            <p className="journey-aside-kicker">{site.journeyGuideTitle}</p>
            <ExpandableText
              className="journey-aside-blurb"
              preview={
                <p>
                  Every project here follows the same process: research the
                  market first, identify the strongest <em>TOF</em> opportunities,
                  turn those insights into angles and concepts, then build the
                  script and production brief around them.
                </p>
              }
              hook="Each creative is meant to be clickable…"
              more={
                <>
                  <p>
                    Each creative is meant to be clickable. Open any piece to
                    see not only the final ad, but the thinking behind it: the
                    brief I presented internally, the references I gave the
                    video editor, the script, and how the idea was translated
                    into production.
                  </p>
                  <p>
                    I focus primarily on <em>TOF creative</em>, where the job
                    is not just to sell: it’s to earn attention, create the
                    right belief, and make the next step in the funnel feel
                    natural.
                  </p>
                </>
              }
            />
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
