import { motion } from 'framer-motion'
import { site } from '../data/site'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-role">{site.role}</p>
        <h1 id="hero-heading" className="hero-brand">
          {site.name}
        </h1>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">
            View work
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </motion.div>
    </section>
  )
}
