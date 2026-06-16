import { Arts } from './components/Arts'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { portfolio } from './data/portfolio'
import styles from './App.module.css'

function App() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Hero personal={portfolio.personal} />
        <Skills skills={portfolio.skills} />
        <Projects projects={portfolio.projects} />
        <Certifications certifications={portfolio.certifications} />
        <Arts artGroups={portfolio.artGroups} />
        <Contact personal={portfolio.personal} socials={portfolio.socials} />
      </main>
    </>
  )
}

export default App
