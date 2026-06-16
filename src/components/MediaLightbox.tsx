import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './MediaLightbox.module.css'

function isPdfSource(url: string): boolean {
  return /\.pdf(\?|#|$)/i.test(url)
}

interface MediaLightboxProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  src: string
}

export function MediaLightbox({ open, onClose, title, subtitle, src }: MediaLightboxProps) {
  const isPdf = isPdfSource(src)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className={styles.mediaWrap}>
          {isPdf ? (
            <iframe
              src={`${src}#toolbar=1&navpanes=0&view=FitH`}
              title={title}
              className={styles.pdf}
            />
          ) : (
            <img src={src} alt={title} className={styles.image} />
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
