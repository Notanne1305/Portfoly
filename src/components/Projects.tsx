import type { Project } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { SectionHeader } from './SectionHeader'
import styles from './Projects.module.css'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const { ref, visible } = useInView()

  return (
    <section id="projects" className={styles.section}>
      <SectionHeader
        number="02"
        title="Projects"
        subtitle="Selected work — shipped products, experiments, and open source."
      />

      <div ref={ref} className={`${styles.list} ${visible ? styles.visible : ''}`}>
        {projects.map((project, i) => (
          <article
            key={project.title}
            className={styles.card}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className={styles.meta}>
              <span className={styles.year}>{project.year}</span>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.titleRow}>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.role}>{project.role}</span>
            </div>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.links}>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Live demo →
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Source →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
