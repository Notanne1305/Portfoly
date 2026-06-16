import type { ArtGroup } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { ArtCategoryStack } from './ArtCategoryStack'
import { SectionHeader } from './SectionHeader'
import styles from './Arts.module.css'

interface ArtsProps {
  artGroups: ArtGroup[]
}

export function Arts({ artGroups }: ArtsProps) {
  const { ref, visible } = useInView()

  return (
    <section id="arts" className={styles.section}>
      <SectionHeader
        number="04"
        title="Art"
        subtitle="Tap each category to flip through the gallery."
      />

      <div ref={ref} className={`${styles.row} ${visible ? styles.visible : ''}`}>
        {artGroups.map((group, i) => (
          <ArtCategoryStack key={group.category} group={group} colorOffset={i} />
        ))}
      </div>
    </section>
  )
}
