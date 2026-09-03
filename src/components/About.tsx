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
          {site.about}
        </motion.p>
      </div>

      <div className="experience-list">
        {site.experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            className="experience-item"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
          >
            <p className="experience-period">{item.period}</p>
            <h3>
              {item.role}
              <span> · {item.company}</span>
            </h3>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
