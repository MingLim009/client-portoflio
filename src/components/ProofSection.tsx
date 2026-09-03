import { motion } from 'framer-motion'
import { site } from '../data/site'

const proofShots = [
  {
    id: 'sfk-hub',
    src: '/proof/meta-embed-1.png',
    eyebrow: 'Meta Ads Manager',
    title: 'SFK Hub — campaign export',
    summary:
      '$267,778.67 across 88 campaigns · 5,837 purchases · $45.88 cost per purchase',
    accent: 'blue' as const,
  },
  {
    id: 'liver-support',
    src: '/proof/meta-embed-2.png',
    eyebrow: 'Meta Ads Manager',
    title: 'Liver Support — nutraceutical account',
    summary:
      '$82,225.16 spent · 4.05x average purchase ROAS · best ad set at 12.27x',
    accent: 'mint' as const,
  },
]

export function ProofSection() {
  return (
    <section className="section proof-section" id="proof">
      <div className="section-head">
        <p className="section-kicker">Proof</p>
        <h2>Straight from Meta Ads Manager</h2>
        <p className="section-lead">{site.proofIntro}</p>
      </div>

      <div className="proof-metrics">
        {site.proofMetrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            className="proof-metric"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <p className="proof-value">{metric.value}</p>
            <p className="proof-label">{metric.label}</p>
            <p className="proof-detail">{metric.detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="proof-shots">
        {proofShots.map((shot, index) => (
          <motion.figure
            key={shot.id}
            className={`proof-shot accent-${shot.accent}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 + index * 0.08 }}
          >
            <div className="proof-shot-chrome" aria-hidden="true">
              <span className="proof-shot-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="proof-shot-chrome-label">{shot.eyebrow}</span>
            </div>
            <a
              className="proof-shot-frame"
              href={shot.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full ${shot.title} screenshot`}
            >
              <img
                src={shot.src}
                alt={`${shot.title} — original Meta Ads Manager screenshot`}
                loading="lazy"
              />
            </a>
            <figcaption className="proof-shot-caption">
              <div>
                <p className="proof-shot-eyebrow">{shot.eyebrow}</p>
                <h3>{shot.title}</h3>
                <p>{shot.summary}</p>
              </div>
              <a className="proof-shot-open" href={shot.src} target="_blank" rel="noreferrer">
                Full screenshot
                <span aria-hidden="true"> ↗</span>
              </a>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="proof-supplements" aria-label="Supplement accounts">
        <span className="proof-pill is-light">Nutraceuticals · Iron Rise</span>
        <span className="proof-pill is-dark">Nutraceuticals · Liver Support</span>
      </div>

      <p className="proof-source-note">
        These are original Meta Ads Manager captures — not redesigned charts.
        Campaign names are redacted where needed. Iron Rise and Liver Support
        are nutraceutical / supplement offers.
      </p>
    </section>
  )
}
