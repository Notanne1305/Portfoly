import { Arts } from './components/Arts'
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
        <Skills skills={portfolio.skills} certifications={portfolio.certifications} />
        <Projects projects={portfolio.projects} />
        <Arts artGroups={portfolio.artGroups} />
        <Contact personal={portfolio.personal} socials={portfolio.socials} />
      </main>
    </>
  )
}

export default App
