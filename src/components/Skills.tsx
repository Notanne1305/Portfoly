import type { SkillGroup } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { SectionHeader } from './SectionHeader'
import styles from './Skills.module.css'

interface SkillsProps {
  skills: SkillGroup[]
}

export function Skills({ skills }: SkillsProps) {
  const { ref, visible } = useInView()

  return (
    <section id="skills" className={styles.section}>
      <SectionHeader number="01" title="Skills" subtitle="Tools and disciplines I work with daily." />

      <div ref={ref} className={`${styles.grid} ${visible ? styles.visible : ''}`}>
        {skills.map((group, gi) => (
          <div key={group.category} className={styles.group} style={{ transitionDelay: `${gi * 0.1}s` }}>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.dot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
