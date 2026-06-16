import type { PortfolioData } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { SectionHeader } from './SectionHeader'
import styles from './Contact.module.css'

interface ContactProps {
  personal: PortfolioData['personal']
  socials: PortfolioData['socials']
}

export function Contact({ personal, socials }: ContactProps) {
  const { ref, visible } = useInView()

  return (
    <section id="contact" className={styles.section}>
      <SectionHeader
        number="05"
        title="Connect"
        subtitle="Find me online or drop a line."
      />

      <div ref={ref} className={`${styles.content} ${visible ? styles.visible : ''}`}>
        <div className={styles.cta}>
          <p className={styles.prompt}>Have a project in mind?</p>
          <a href={`mailto:${personal.email}`} className={styles.email}>
            {personal.email}
          </a>
        </div>

        <ul className={styles.socials}>
          {socials.map((social) => (
            <li key={social.platform}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <span className={styles.platform}>{social.platform}</span>
                <span className={styles.handle}>{social.label}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {personal.name}. Built with care.</p>
      </footer>
    </section>
  )
}
