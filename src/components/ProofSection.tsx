import { motion } from 'framer-motion'
import { site } from '../data/site'
import { ExpandableText } from './ExpandableText'

const proofShots = [
  {
    id: 'nad-telehealth',
    src: '/proof/meta-embed-1.png',
    eyebrow: 'Meta Ads Manager',
    title: 'Telehealth, NAD+ — Turning Creative Into Spend',
    summary:
      'My role went beyond writing individual ads. I worked around the creative logic behind the funnel, from the initial angle to the conversion path that followed.',
    accent: 'blue' as const,
  },
  {
    id: 'liver-support',
    src: '/proof/meta-embed-2.png',
    eyebrow: 'Meta Ads Manager',
    title: 'DTC Supplement — Finding Profitable Angles',
    summary:
      'This is where my Direct Response background became especially valuable in DTC: understanding that the winning ad is usually the result of the right market insight, mechanism, promise and funnel congruence working together.',
    accent: 'mint' as const,
  },
]

export function ProofSection() {
  return (
    <section className="section proof-section" id="proof">
      <div className="section-head is-centered">
        <p className="section-kicker">Proof</p>
        <h2>The numbers behind the work</h2>
        <ExpandableText
          className="section-lead is-centered"
          preview={
            <p>
              I’ve spent the last few years working in environments where
              creative is judged by one thing: <em>performance</em>.
            </p>
          }
          hook="These are real results from accounts and funnels I worked on…"
          more={
            <>
              <p>
                These are real results from accounts and funnels I worked on:
                across <em>telehealth</em>, <em>supplements</em>, and{' '}
                <em>direct-response</em> offers. The numbers below aren’t
                isolated wins. They’re the result of understanding how the
                creative, offer, mechanism, funnel and media buying all work
                together.
              </p>
            </>
          }
        />
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
            <div className="proof-metric-spark" aria-hidden="true" />
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
              <a
                className="proof-shot-open"
                href={shot.src}
                target="_blank"
                rel="noreferrer"
              >
                Full screenshot
                <span aria-hidden="true"> ↗</span>
              </a>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="proof-source-note">
        These numbers changed how I approached creative. I stopped looking at
        ads as isolated assets and started looking at the entire customer
        journey as one connected system.
      </p>
    </section>
  )
}
