import { site } from '../data/site'
import { ContactIcon } from './ContactIcons'

export function FloatingContacts() {
  const links = site.contacts.filter((item) => item.href.trim().length > 0)

  if (!site.showDirectContacts || links.length === 0) return null

  return (
    <aside className="contact-dock" aria-label="Direct contact">
      {links.map((item) => (
        <a
          key={item.id}
          className="contact-dock-link"
          href={item.href}
          target={item.id === 'email' ? undefined : '_blank'}
          rel={item.id === 'email' ? undefined : 'noreferrer'}
          title={`${item.label} · ${item.handle}`}
          aria-label={`${item.label}: ${item.handle}`}
        >
          <ContactIcon id={item.id} />
        </a>
      ))}
    </aside>
  )
}
