import { motion } from 'framer-motion'
import { site } from '../data/site'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-orb" aria-hidden="true" />

      <motion.h1
        id="hero-heading"
        className="hero-title"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero-line hero-line-1">{site.heroLine1}</span>
        <span className="hero-line hero-line-2">{site.heroLine2}</span>
      </motion.h1>

      <motion.div
        className="hero-meta"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65 }}
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
