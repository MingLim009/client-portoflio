import { site } from '../data/site'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        {site.name}
      </a>
      <nav className="nav" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}
