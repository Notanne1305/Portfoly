import styles from './Nav.module.css'

const links = [
  { href: '#download-resume', label: 'Download Resume' },
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
              className={`${styles.link} ${link.href === '#download-resume' ? styles.resumeButton : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
