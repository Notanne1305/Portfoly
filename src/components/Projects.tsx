import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { SectionHeader } from './SectionHeader'
import styles from './Projects.module.css'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const { ref, visible } = useInView()
  const [activeIndex, setActiveIndex] = useState(0)

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length)
  }

  const signedOffset = (index: number) => {
    const length = projects.length
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
    <section id="projects" className={styles.section}>
      <SectionHeader
        title="Projects"
        subtitle="Selected work from development, security, and web experiments."
      />

      <div ref={ref} className={`${styles.showcase} ${visible ? styles.visible : ''}`}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={() => move(-1)}
          aria-label="Previous project"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </button>

        <div className={styles.stage} aria-live="polite">
          {projects.map((project, i) => {
            const offset = signedOffset(i)
            const isActive = offset === 0

            return (
              <article
                key={project.title}
                className={`${styles.card} ${positionClass(offset)}`}
                aria-hidden={!isActive}
              >
                {/* Visual container optimized to handle both raw dimensions or background images */}
                <div 
                  className={styles.visual} 
                  aria-hidden="true" 
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <span className={styles.visualLabel} style={{ zIndex: 2 }}>
                    {project.year}
                  </span>
                  
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        position: 'absolute', 
                        top: 0, 
                        left: 0 
                      }} 
                    />
                  ) : (
                    <>
                      <strong>{project.title.slice(0, 2)}</strong>
                      <div className={styles.codeLines}>
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.type}>Project</span>
                    <span className={styles.role}>{project.role}</span>
                  </div>

                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.links}>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        tabIndex={isActive ? 0 : -1}
                      >
                        Live demo
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        tabIndex={isActive ? 0 : -1}
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={() => move(1)}
          aria-label="Next project"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </button>

        <div className={styles.dots} aria-label="Project slides">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show ${project.title}`}
              aria-current={i === activeIndex}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
