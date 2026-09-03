import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'

const yearFilters = ['All', ...site.journey.map((step) => step.year)]
const marketFilters = [
  'All markets',
  ...Array.from(new Set(site.journey.map((step) => step.market))),
]

function yearFromHash(hash: string): string | null {
  const match = hash.match(/^#journey-(\d{4})$/)
  return match?.[1] ?? null
}

export function JourneySection() {
  const [year, setYear] = useState(() => {
    if (typeof window === 'undefined') return 'All'
    const fromHash = yearFromHash(window.location.hash)
    return fromHash && site.journey.some((step) => step.year === fromHash)
      ? fromHash
      : 'All'
  })
  const [market, setMarket] = useState('All markets')

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
      <div className="section-head journey-head">
        <p className="section-kicker">Journey</p>
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
      </div>

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
              }}
            >
              Show full timeline
            </button>
          </div>
        ) : (
          filtered.map((step, index) => (
            <motion.article
              key={step.id}
              id={`journey-${step.year}`}
              className="journey-step"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.06, 0.24),
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
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  )
}
