import type { PortfolioData } from '../data/portfolio'
import styles from './Hero.module.css'

interface HeroProps {
  personal: PortfolioData['personal']
}

export function Hero({ personal }: HeroProps) {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.avatar} aria-hidden="true">
          {personal.avatarInitials}
        </div>

        <p className={styles.eyebrow}>{personal.location}</p>

        <h1 className={styles.name}>
          {personal.name.split(' ').map((word, i) => (
            <span key={i} className={styles.nameWord} style={{ animationDelay: `${i * 0.1}s` }}>
              {word}
            </span>
          ))}
        </h1>

        <p className={styles.title}>{personal.title}</p>

        <p className={styles.bio}>{personal.bio}</p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.primaryBtn}>
            View work
          </a>
          <a href={`mailto:${personal.email}`} className={styles.secondaryBtn}>
            {personal.email}
          </a>
        </div>
      </div>
      
      <div className={styles.portrait} aria-hidden="true">
        <img src="/portrait.png" alt="" />
      </div>

      <div className={styles.decor} aria-hidden="true">
        <span className={styles.decorLine} />
        <span className={styles.decorYear}>{new Date().getFullYear()}</span>
      </div>
    </section>
  )
}
