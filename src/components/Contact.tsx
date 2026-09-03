import { motion } from 'framer-motion'
import { site } from '../data/site'

const icons: Record<string, string> = {
  whatsapp: 'WA',
  discord: 'DC',
  slack: 'SL',
}

export function Contact() {
  const available = site.contacts.filter((c) => c.href.trim().length > 0)

  return (
    <section className="section contact-section" id="contact">
      <div className="section-head">
        <p className="section-kicker">Contact</p>
        <h2>Let’s talk</h2>
        <p className="section-lead">
          Prefer WhatsApp, Discord, or Slack? Reach out on the channel that
          works best for you.
        </p>
      </div>

      <div className="contact-grid">
        {(available.length > 0 ? available : site.contacts).map((contact, index) => {
          const ready = contact.href.trim().length > 0

          return (
            <motion.a
              key={contact.id}
              className={ready ? 'contact-link' : 'contact-link is-pending'}
              href={ready ? contact.href : undefined}
              target={ready ? '_blank' : undefined}
              rel={ready ? 'noreferrer' : undefined}
              aria-disabled={!ready}
              onClick={(event) => {
                if (!ready) event.preventDefault()
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <span className="contact-icon" aria-hidden="true">
                {icons[contact.id]}
              </span>
              <span>
                <strong>{contact.label}</strong>
                <span className="contact-desc">
                  {ready ? contact.description : 'Link pending from client'}
                </span>
              </span>
            </motion.a>
          )
        })}
      </div>

      {site.email ? (
        <p className="contact-email">
          Or email{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      ) : null}
    </section>
  )
}
