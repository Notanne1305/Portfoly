import { useCallback, useState } from 'react'
import type { ArtGroup } from '../data/portfolio'
import { MediaLightbox } from './MediaLightbox'
import styles from './Arts.module.css'

const palette = [
  'linear-gradient(145deg, #2a1f14 0%, #c17f3a 50%, #0c0b09 100%)',
  'linear-gradient(160deg, #1a1520 0%, #4a3f6b 60%, #0c0b09 100%)',
  'linear-gradient(135deg, #141a14 0%, #3d5a3d 55%, #0c0b09 100%)',
  'linear-gradient(150deg, #1a1410 0%, #8b4513 45%, #1e1b18 100%)',
]

interface ArtCategoryStackProps {
  group: ArtGroup
  colorOffset: number
  delay?: string
}

export function ArtCategoryStack({ group, colorOffset, delay }: ArtCategoryStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { pieces } = group
  const count = pieces.length
  const current = pieces[activeIndex]

  const advance = useCallback(() => {
    if (count <= 1 || exiting) return
    setExiting(true)
  }, [count, exiting])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!exiting || e.propertyName !== 'transform') return
    setActiveIndex((i) => (i + 1) % count)
    setExiting(false)
  }

  const stackOffset = (index: number) => {
    return (index - activeIndex + count) % count
  }

  return (
    <div className={styles.column} style={delay ? { transitionDelay: delay } : undefined}>
      <h3 className={styles.category}>{group.category}</h3>

      <button
        type="button"
        className={styles.stack}
        onClick={advance}
        aria-label={`Browse ${group.category}. Showing ${current.title}. Tap for next.`}
      >
        <div className={styles.stackInner}>
          {pieces.map((piece, i) => {
            const offset = stackOffset(i)
            if (offset > 2) return null

            const isTop = offset === 0
            const color = palette[(colorOffset + i) % palette.length]

            return (
              <div
                key={piece.title}
                className={`${styles.card} ${isTop && exiting ? styles.cardExit : ''}`}
                style={{
                  zIndex: count - offset,
                  transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.04})`,
                  opacity: offset === 2 ? 0.55 : offset === 1 ? 0.8 : 1,
                }}
                onTransitionEnd={isTop ? handleTransitionEnd : undefined}
                aria-hidden={!isTop}
              >
                <div
                  className={styles.visual}
                  style={{
                    background: piece.imageUrl
                      ? `url(${piece.imageUrl}) center/cover`
                      : color,
                  }}
                />
              </div>
            )
          })}
        </div>

        <span className={styles.tapHint}>Tap to browse</span>
      </button>

      <div className={styles.caption} aria-live="polite">
        <h4 className={styles.title}>{current.title}</h4>
        <p className={styles.year}>{current.year}</p>
        {current.description && <p className={styles.description}>{current.description}</p>}
        {current.imageUrl && (
          <button
            type="button"
            className={styles.viewFull}
            onClick={() => setLightboxOpen(true)}
          >
            View full
          </button>
        )}
      </div>

      {/* Thumbnails for remaining pieces beyond the top 3 */}
      {pieces.length > 3 && (
        <div className={styles.moreRow} aria-hidden="false">
          {pieces.slice(3).map((p, idx) => (
            <button
              key={p.title}
              type="button"
              className={styles.thumb}
              onClick={() => setActiveIndex(3 + idx)}
              aria-label={`Show ${p.title}`}
            >
              <span
                className={styles.thumbImg}
                style={{
                  background: p.imageUrl ? `url(${p.imageUrl}) center/cover` : undefined,
                }}
              />
            </button>
          ))}
        </div>
      )}

      {current.imageUrl && (
        <MediaLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setActiveIndex((i) => (i + 1) % count)}
          onPrev={() => setActiveIndex((i) => (i - 1 + count) % count)}
          title={current.title}
          subtitle={`${group.category} · ${current.year}`}
          src={current.imageUrl}
          description={current.description}
        />
      )}

      {count > 1 && (
        <div className={styles.dots} aria-hidden="true">
          {pieces.map((piece, i) => (
            <span
              key={piece.title}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
