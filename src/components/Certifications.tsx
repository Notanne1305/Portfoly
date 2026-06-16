import type { Certification } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { CertificationMedia } from './CertificationMedia'
import { SectionHeader } from './SectionHeader'
import styles from './Certifications.module.css'

interface CertificationsProps {
  certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
  const { ref, visible } = useInView()

  return (
    <section id="certifications" className={styles.section}>
      <SectionHeader
        number="03"
        title="Certifications"
        subtitle="Formal credentials and professional certifications."
      />

      <div ref={ref} className={`${styles.grid} ${visible ? styles.visible : ''}`}>
        {certifications.map((cert, i) => (
          <article key={cert.name} className={styles.card} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className={styles.imageWrap}>
              <CertificationMedia name={cert.name} issuer={cert.issuer} imageUrl={cert.imageUrl} />
            </div>

            <div className={styles.body}>
              <span className={styles.date}>{cert.date}</span>
              <h3 className={styles.name}>{cert.name}</h3>
              <p className={styles.issuer}>{cert.issuer}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.verify}
                >
                  Verify credential →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
