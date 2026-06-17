import { useMemo, useState } from 'react'
import type { ArtGroup } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { MediaLightbox } from './MediaLightbox'
import { SectionHeader } from './SectionHeader'
import styles from './Arts.module.css'

interface ArtsProps {
  artGroups: ArtGroup[]
}

export function Arts({ artGroups }: ArtsProps) {
  const { ref, visible } = useInView()
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const pieces = useMemo(
    () =>
      artGroups.flatMap((group) =>
        group.pieces.map((piece) => ({
          ...piece,
          category: group.category,
        })),
      ),
    [artGroups],
  )

  const activePiece = pieces[activeIndex]

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + pieces.length) % pieces.length)
  }

  const signedOffset = (index: number) => {
    const length = pieces.length
    let offset = index - activeIndex

    if (offset > length / 2) offset -= length
    if (offset < -length / 2) offset += length

    return offset
  }

  const positionClass = (offset: number) => {
    if (offset === 0) return styles.active
    if (offset === -1) return styles.previous
    if (offset === 1) return styles.next
    return styles.hidden
  }

  return (
    <section id="arts" className={styles.section}>
      <SectionHeader
        title="Art"
        subtitle="Selected visual work, commissions, and design explorations."
      />

      <div ref={ref} className={`${styles.showcase} ${visible ? styles.visible : ''}`}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={() => move(-1)}
          aria-label="Previous artwork"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </button>

        <div className={styles.stage} aria-live="polite">
          {pieces.map((piece, i) => {
            const offset = signedOffset(i)
            const isActive = offset === 0

            return (
              <article
                key={`${piece.category}-${piece.title}`}
                className={`${styles.card} ${positionClass(offset)}`}
                aria-hidden={!isActive}
              >
                <div className={styles.visual}>
                  {piece.imageUrl ? (
                    <img src={piece.imageUrl} alt="" aria-hidden="true" />
                  ) : (
                    <div className={styles.fallbackVisual} aria-hidden="true" />
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.type}>{piece.category}</span>
                    <span className={styles.year}>{piece.year}</span>
                  </div>

                  <h3 className={styles.title}>{piece.title}</h3>
                  {piece.description && <p className={styles.description}>{piece.description}</p>}

                  {piece.imageUrl && (
                    <button
                      type="button"
                      className={styles.viewFull}
                      onClick={() => setLightboxOpen(true)}
                      tabIndex={isActive ? 0 : -1}
                    >
                      View full
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={() => move(1)}
          aria-label="Next artwork"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </button>

        <div className={styles.dots} aria-label="Artwork slides">
          {pieces.map((piece, i) => (
            <button
              key={`${piece.category}-${piece.title}-dot`}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show ${piece.title}`}
              aria-current={i === activeIndex}
            />
          ))}
        </div>
      </div>

      {activePiece?.imageUrl && (
        <MediaLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() => move(1)}
          onPrev={() => move(-1)}
          title={activePiece.title}
          subtitle={`${activePiece.category} - ${activePiece.year}`}
          src={activePiece.imageUrl}
          description={activePiece.description}
        />
      )}
    </section>
  )
}
