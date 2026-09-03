import { useCallback, useState } from 'react'
import { About } from './components/About'
import { CaseStudiesSection } from './components/CaseStudiesSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { JourneySection } from './components/JourneySection'
import { PreviewModal } from './components/PreviewModal'
import { ProofSection } from './components/ProofSection'
import { site } from './data/site'
import type { WorkItem } from './data/works'
import './index.css'

export default function App() {
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)
  const [activeList, setActiveList] = useState<WorkItem[]>([])

  const openWork = useCallback((work: WorkItem, list: WorkItem[]) => {
    setActiveWork(work)
    setActiveList(list)
  }, [])

  const closeWork = useCallback(() => {
    setActiveWork(null)
  }, [])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#proof">
        Skip to proof
      </a>
      <Header />
      <main>
        <Hero />
        <ProofSection />
        <JourneySection onSelect={openWork} />
        <CaseStudiesSection onSelect={openWork} />
        <About />
        {site.showDirectContacts ? <Contact /> : null}
      </main>
      <Footer />
      <PreviewModal
        work={activeWork}
        list={activeList}
        onClose={closeWork}
        onNavigate={setActiveWork}
      />
    </div>
  )
}
