import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Background3D } from './components/Background3D'
import { Contact } from './components/Contact'
import { FloatingContacts } from './components/FloatingContacts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { JourneySection } from './components/JourneySection'
import { PreviewModal } from './components/PreviewModal'
import { ProofSection } from './components/ProofSection'
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
      <Background3D />
      <a className="skip-link" href="#proof">
        Skip to proof
      </a>
      <Header />
      <FloatingContacts />
      <main className="app-main">
        <Hero />
        <ProofSection />
        <JourneySection onSelect={openWork} />
        <About />
        <Contact />
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
