import { site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {year} {site.name}
      </p>
      <p>Scripts · Videos</p>
    </footer>
  )
}
