import { motion } from 'framer-motion'
import { site } from '../data/site'

export function ProofSection() {
  return (
    <section className="section proof-section" id="proof">
      <div className="section-head">
        <p className="section-kicker">Proof</p>
        <h2>Results from the ad accounts</h2>
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

      <motion.figure
        className="proof-figure"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img
          src={site.proofImage}
          alt="Meta Ads Manager screenshots showing campaign spend, purchases, and ROAS"
          loading="lazy"
        />
        <figcaption>
          Meta Ads · SFK Hub — $267,778.67 across 88 campaigns · 5,837 purchases · $45.88 CPA.
          Meta Ads · Liver Support — $82,225.16 spent · 4.05x average ROAS · best ad set 12.27x.
        </figcaption>
      </motion.figure>
    </section>
  )
}
