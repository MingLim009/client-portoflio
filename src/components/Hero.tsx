import { motion } from 'framer-motion'
import { site } from '../data/site'

const tickerWords = [
  'DIRECT RESPONSE',
  'DTC',
  'CREATIVE STRATEGY',
  'VSLs',
  'PAID SOCIAL',
  'ADVERTORIALS',
  'PRESELLS',
  'MARKET RESEARCH',
  'OFFER MECHANISMS',
  'FUNNEL CONGRUENCE',
  'WINNING HOOKS',
  'SCALABLE ANGLES',
]

function TickerGroup({ suffix }: { suffix: string }) {
  return (
    <div className="hero-ticker-group" aria-hidden="true">
      {tickerWords.map((word) => (
        <span key={`${suffix}-${word}`} className="hero-ticker-chip">
          {word}
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-symbol" aria-hidden="true">
        <img src="/brand/sparkline-symbol.svg" alt="" />
      </div>
      <div className="hero-grain" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-role">
          <span className="hero-role-mark" aria-hidden="true" />
          {site.role}
        </p>
        <h1 id="hero-heading" className="hero-brand">
          {site.name}
        </h1>
        <p className="hero-since">Writing winning ADs since 2021</p>
        <p className="hero-craft">{site.heroLine1}</p>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#proof">
            See proof
          </a>
          <a className="btn btn-ghost" href="#journey">
            How I got here
          </a>
        </div>
      </motion.div>

      <div className="hero-ticker" role="presentation">
        <div className="hero-ticker-track">
          <TickerGroup suffix="a" />
          <TickerGroup suffix="b" />
        </div>
      </div>
    </section>
  )
}
