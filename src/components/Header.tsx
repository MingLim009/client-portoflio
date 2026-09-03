import { useEffect, useState } from 'react'
import { site } from '../data/site'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#top" aria-label={`${site.name}, home`}>
        <span className="brand-name">{site.name}</span>
      </a>
      <nav className="nav" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}
