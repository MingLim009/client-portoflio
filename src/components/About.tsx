import { motion } from 'framer-motion'
import { site } from '../data/site'
import { ContactIcon } from './ContactIcons'
import { ExpandableText } from './ExpandableText'

export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-layout is-centered">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">About me</p>
          <h2>{site.aboutTitle}</h2>
        </motion.div>
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <ExpandableText
            preview={
              <p>
                My Direct Response background taught me to look far beyond the
                ad itself.
              </p>
            }
            more={
              <>
                <p>
                  I think about <em>hooks</em>, <em>angles</em>, and{' '}
                  <em>formats</em>, but also the promise behind them, the
                  mechanism being introduced, the audience’s level of
                  awareness, and most importantly, how all of that carries
                  through the funnel.
                </p>
                <p>
                  That’s how I approach creative strategy today:{' '}
                  <em>research before execution</em>,{' '}
                  <em>strategy before scripting</em>, and every creative built
                  to make the next step of the customer journey feel more
                  natural, more congruent, and easier to convert.
                </p>
                <p>
                  I don’t see creative as a collection of isolated ads. I see
                  each piece as the beginning of a system that needs to work
                  all the way through conversion and continue working as spend
                  scales.
                </p>
                <p>If you’re looking for someone who thinks beyond the ad, let’s talk.</p>
              </>
            }
          />
          <div className="about-contacts" aria-label="Contact channels">
            {site.contacts.map((item) => (
              <a
                key={item.id}
                className="about-contact-link"
                href={item.href}
                target={item.id === 'email' ? undefined : '_blank'}
                rel={item.id === 'email' ? undefined : 'noreferrer'}
                title={`${item.label} · ${item.handle}`}
                aria-label={`${item.label}: ${item.handle}`}
              >
                <ContactIcon id={item.id} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
