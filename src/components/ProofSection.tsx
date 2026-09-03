import { motion } from 'framer-motion'
import { site } from '../data/site'

const proofPanels = [
  {
    id: 'sfk',
    eyebrow: 'Meta Ads · SFK Hub',
    headline: '$267,778.67',
    summary: 'Across 88 campaigns · 5,837 purchases · $45.88 per purchase',
    rows: [
      { spent: '$98,929.15', purchases: '2,191', cpa: '$45.15' },
      { spent: '$61,284.40', purchases: '1,296', cpa: '$47.28' },
      { spent: '$42,118.90', purchases: '916', cpa: '$45.98' },
      { spent: '$28,540.12', purchases: '667', cpa: '$42.81' },
    ],
    columns: ['Amount spent', 'Purchases', 'Cost / purchase'],
    footer: 'Totals from 88 campaigns in the ad account',
    accent: 'blue' as const,
  },
  {
    id: 'liver',
    eyebrow: 'Meta Ads · Liver Support',
    headline: '4.05x ROAS',
    summary: '$82,225.16 spent · average ROAS 4.05x · best ad set 12.27x',
    rows: [
      { spent: '$29,246.67', purchases: '2.75x', cpa: '$34.49' },
      { spent: '$15,291.33', purchases: '2.54x', cpa: '$38.61' },
      { spent: '$11,148.45', purchases: '2.92x', cpa: '$38.84' },
      { spent: '$9,790.78', purchases: '12.27x', cpa: '$41.31' },
    ],
    columns: ['Amount spent', 'Purchase ROAS', 'Cost / result'],
    footer: 'Liver Support (Verdaia) ad sets — account export',
    accent: 'mint' as const,
  },
]

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

      <div className="proof-panels">
        {proofPanels.map((panel, index) => (
          <motion.article
            key={panel.id}
            className={`proof-panel accent-${panel.accent}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
          >
            <p className="proof-panel-eyebrow">{panel.eyebrow}</p>
            <h3>{panel.headline}</h3>
            <p className="proof-panel-summary">{panel.summary}</p>

            <div className="proof-table-wrap">
              <table className="proof-table">
                <thead>
                  <tr>
                    {panel.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {panel.rows.map((row) => (
                    <tr key={`${panel.id}-${row.spent}`}>
                      <td>{row.spent}</td>
                      <td>{row.purchases}</td>
                      <td>{row.cpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="proof-panel-footer">{panel.footer}</p>
          </motion.article>
        ))}
      </div>

      <p className="proof-source-note">
        Figures taken from Meta Ads Manager exports for SFK Hub and Liver
        Support (Verdaia). Campaign names redacted where needed.
      </p>
    </section>
  )
}
