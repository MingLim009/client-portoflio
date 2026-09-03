import { motion } from 'framer-motion'
import { site } from '../data/site'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-stage" aria-hidden="true">
        <span className="hero-orbit hero-orbit-a" />
        <span className="hero-orbit hero-orbit-b" />
        <span className="hero-rule" />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          {site.role}
        </motion.p>
        <h1 id="hero-heading" className="hero-brand">
          {site.name}
        </h1>
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {site.tagline}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.55 }}
        >
          <a className="btn btn-primary" href="#work">
            View work
          </a>
          <a className="btn btn-ghost" href="#about">
            About
          </a>
        </motion.div>
      </motion.div>

      <a className="hero-scroll" href="#work" aria-label="Scroll to work">
        <span />
        Scroll
      </a>
    </section>
  )
}
