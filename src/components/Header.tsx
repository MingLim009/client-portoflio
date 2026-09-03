import { site } from '../data/site'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">{site.name}</span>
      </a>
      <nav className="nav" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
