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
        <span>Benjamin</span>
        <span>Rhuan</span>
      </a>
      <nav className="nav nav-timeline" aria-label="Primary">
        <a href="#proof">Proof</a>
        {site.journey.map((step) => (
          <a
            key={step.id}
            href={`#journey-${step.year}`}
            className="nav-year"
            title={`${step.era}: ${step.title}`}
          >
            {step.market}
          </a>
        ))}
        <a href="#about">About me</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}
