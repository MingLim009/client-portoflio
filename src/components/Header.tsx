import { useEffect, useState } from 'react'
import { site } from '../data/site'

const timelineYears = site.journey.map((step) => step.year)

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
      <nav className="nav nav-timeline" aria-label="Primary">
        <a href="#proof">Proof</a>
        {timelineYears.map((year, index) => (
          <a
            key={year}
            href={`#journey-${year}`}
            className="nav-year"
            title={`${year}: ${site.journey[index].title}`}
          >
            {year}
          </a>
        ))}
        <a href="#work">Work</a>
      </nav>
    </header>
  )
}
