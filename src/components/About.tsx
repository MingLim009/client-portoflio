import { motion } from 'framer-motion'
import { site } from '../data/site'

export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-layout">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">About</p>
          <h2>{site.aboutTitle}</h2>
        </motion.div>
        <motion.p
          className="about-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {site.about} Browse scripts, videos, and results inside{' '}
          <a className="text-link" href="#journey">
            How I got here
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
