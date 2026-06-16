import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './MediaLightbox.module.css'

function isPdfSource(url: string): boolean {
  return /\.pdf(\?|#|$)/i.test(url)
}

interface MediaLightboxProps {
  open: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  title: string
  subtitle?: string
  src: string
  description?: string
}

export function MediaLightbox({ open, onClose, onNext, onPrev, title, subtitle, src, description }: MediaLightboxProps) {
  const isPdf = isPdfSource(src)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, onNext, onPrev])

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
          {onPrev && (
            <button
              type="button"
              className={styles.navBtn}
              onClick={onPrev}
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          <div className={styles.mediaInner}>
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
          {onNext && (
            <button
              type="button"
              className={styles.navBtn}
              onClick={onNext}
              aria-label="Next"
            >
              ›
            </button>
          )}
        </div>

        {description && (
          <div className={styles.footer}>
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
