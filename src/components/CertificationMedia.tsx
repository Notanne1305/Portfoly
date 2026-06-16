import { useState } from 'react'
import { MediaLightbox } from './MediaLightbox'
import styles from './Certifications.module.css'

function isPdfSource(url: string): boolean {
  return /\.pdf(\?|#|$)/i.test(url)
}

interface CertificationMediaProps {
  name: string
  issuer: string
  imageUrl: string
}

export function CertificationMedia({ name, issuer, imageUrl }: CertificationMediaProps) {
  const [open, setOpen] = useState(false)
  const label = `${name} certificate`
  const isPdf = isPdfSource(imageUrl)

  return (
    <>
      <button
        type="button"
        className={styles.mediaButton}
        onClick={() => setOpen(true)}
        aria-label={`View ${name} certificate`}
      >
        {isPdf ? (
          <iframe
            src={`${imageUrl}#toolbar=0&navpanes=0&view=FitH`}
            title={label}
            className={styles.pdf}
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <img src={imageUrl} alt="" className={styles.image} loading="lazy" aria-hidden="true" />
        )}
        <span className={styles.viewOverlay}>View full</span>
      </button>

      <MediaLightbox
        open={open}
        onClose={() => setOpen(false)}
        title={name}
        subtitle={issuer}
        src={imageUrl}
      />
    </>
  )
}
