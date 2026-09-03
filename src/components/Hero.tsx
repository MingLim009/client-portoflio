import { motion } from 'framer-motion'
import { site } from '../data/site'

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
        <p className="hero-role">{site.role}</p>
        <h1 id="hero-heading" className="hero-brand">
          {site.name}
        </h1>
        <p className="hero-craft">
          {site.heroLine1} {site.heroLine2}
        </p>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#proof">
            See proof
          </a>
          <a className="btn btn-ghost" href="#work">
            Browse work
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-meta"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.65 }}
      >
        <div className="hero-meta-block">
          <p className="hero-meta-strong">{site.services}</p>
          <p className="hero-meta-soft">{site.availability}</p>
        </div>
        <div className="hero-meta-block">
          <p className="hero-meta-strong">{site.location}</p>
          <p className="hero-meta-soft">{site.origin}</p>
        </div>
      </motion.div>
    </section>
  )
}
