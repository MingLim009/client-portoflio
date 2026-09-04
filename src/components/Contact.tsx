import { motion } from 'framer-motion'
import { site } from '../data/site'

const icons: Record<string, string> = {
  whatsapp: 'WA',
  telegram: 'TG',
  discord: 'DC',
  x: 'X',
  email: '@',
}

export function Contact() {
  const available = site.contacts.filter((c) => c.href.trim().length > 0)

  return (
    <section className="section contact-section" id="contact">
      <div className="section-head">
        <p className="section-kicker">Contact</p>
        <h2>Let’s talk</h2>
        <p className="section-lead">
          WhatsApp, Telegram, Discord, X, or email — pick the channel that
          works best for you.
        </p>
      </div>

      <div className="contact-grid">
        {available.map((contact, index) => (
          <motion.a
            key={contact.id}
            className="contact-link"
            href={contact.href}
            target={contact.id === 'email' ? undefined : '_blank'}
            rel={contact.id === 'email' ? undefined : 'noreferrer'}
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
              <span className="contact-desc">{contact.handle}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
