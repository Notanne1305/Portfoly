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
        title="Connect"
        subtitle="Whether you have a question, opportunity, or just want to say hi, my inbox is always open."
      />

      <div ref={ref} className={`${styles.content} ${visible ? styles.visible : ''}`}>
        <div className={styles.summaryCard}>
          <div className={styles.brandRow}>
            <img src="/logo.png" alt="Jonathan's logo" className={styles.logo} />
            <div>
              <p className={styles.label}>Ready to collaborate</p>
              <h3 className={styles.name}>{personal.name}</h3>
              <p className={styles.title}>{personal.title}</p>
            </div>
          </div>

          <p className={styles.description}>
            I build thoughtful digital experiences at the intersection of code and craft. If you have an idea, project, or question, I’m just one message away.
          </p>

          <a href={`mailto:${personal.email}`} className={styles.actionButton}>
            Email {personal.name.split(' ')[0]}
          </a>

          <div className={styles.metaRow}>
            <span>{personal.location}</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>

        <div className={styles.socialPanel}>
          <p className={styles.socialIntro}>Find me online</p>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.platform} className={styles.socialItem}>
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
      </div>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {personal.name}. Built with care.</p>
      </footer>
    </section>
  )
}
