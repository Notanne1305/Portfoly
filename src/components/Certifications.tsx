import { useState } from 'react'
import type { Certification } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { MediaLightbox } from './MediaLightbox'
import styles from './Certifications.module.css'

interface CertificationsProps {
  certifications: Certification[]
}

function credentialTitle(cert: Certification): string {
  const text = `${cert.name} ${cert.issuer}`.toLowerCase()

  if (text.includes('database')) return 'IT Specialist - Databases'
  if (text.includes('cyber')) return 'IT Specialist - Cybersecurity'
  if (text.includes('github') || text.includes('javascript')) return 'Github and Javascript Workshop'

  return cert.name
}

export function Certifications({ certifications }: CertificationsProps) {
  const { ref, visible } = useInView()
  const [activeCert, setActiveCert] = useState<Certification | null>(null)

  return (
    <section id="certifications" className={styles.section}>
      <div ref={ref} className={`${styles.panel} ${visible ? styles.visible : ''}`}>
        <p className={styles.kicker}>Selected Credentials</p>

        <div className={styles.list}>
          {certifications.map((cert, i) => (
            <button
              key={cert.name}
              type="button"
              className={styles.item}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setActiveCert(cert)}
              aria-label={`View ${credentialTitle(cert)} certificate`}
            >
              <span className={styles.badge} aria-hidden="true">
                <span className={styles.badgeInner}>IT</span>
              </span>

              <span className={styles.copy}>
                <span className={styles.name}>{credentialTitle(cert)}</span>
                <span className={styles.issuer}>Verified on Credly</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeCert && (
        <MediaLightbox
          open={Boolean(activeCert)}
          onClose={() => setActiveCert(null)}
          title={credentialTitle(activeCert)}
          subtitle={activeCert.issuer}
          src={activeCert.imageUrl}
        />
      )}
    </section>
  )
}
