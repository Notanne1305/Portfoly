import { useInView } from '../hooks/useInView'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  number: string
  title: string
  subtitle?: string
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <header
      ref={ref}
      className={`${styles.header} ${visible ? styles.visible : ''}`}
    >
      <span className={styles.number}>{number}</span>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  )
}
