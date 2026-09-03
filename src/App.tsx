import { useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreviewModal } from './components/PreviewModal'
import { WorkSection } from './components/WorkSection'
import { site } from './data/site'
import type { WorkItem } from './data/works'
import './index.css'

export default function App() {
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <WorkSection onSelect={setActiveWork} />
        <About />
        {site.showDirectContacts ? <Contact /> : null}
      </main>
      <Footer />
      <PreviewModal work={activeWork} onClose={() => setActiveWork(null)} />
    </div>
  )
}
