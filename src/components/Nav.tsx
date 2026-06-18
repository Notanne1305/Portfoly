import styles from './Nav.module.css'

const links = [
  { href: '/resume/Resume.pdf', label: 'Download Resume', isResume: true },
  { href: '#about', label: 'Home' },
  { href: '#skills', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#arts', label: 'Art' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <a href="#" className={styles.logo} aria-label="Home">
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
      </a>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`${styles.link} ${link.isResume ? styles.resumeButton : ''}`}
              target={link.isResume ? '_blank' : undefined}
              rel={link.isResume ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}