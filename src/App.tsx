import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreviewModal } from './components/PreviewModal'
import { ProofSection } from './components/ProofSection'
import { WorkSection } from './components/WorkSection'
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
        <WorkSection onSelect={openWork} />
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
