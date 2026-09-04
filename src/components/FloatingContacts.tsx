import { site } from '../data/site'

const short: Record<string, string> = {
  whatsapp: 'WA',
  telegram: 'TG',
  discord: 'DC',
  x: 'X',
  email: '@',
}

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
        >
          <span aria-hidden="true">{short[item.id]}</span>
          <span className="sr-only">{item.label}</span>
        </a>
      ))}
    </aside>
  )
}
