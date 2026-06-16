import styles from './Nav.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
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
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
