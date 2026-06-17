import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import type { Certification, SkillGroup } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { MediaLightbox } from './MediaLightbox'
import styles from './Skills.module.css'

interface SkillsProps {
  skills: SkillGroup[]
  certifications: Certification[]
}

interface LogoSkill {
  label: string
  icon: string
}

type LogoStyle = CSSProperties & {
  '--i': number
  '--stagger': string
  '--angle': string
}

function credentialTitle(cert: Certification): string {
  const text = `${cert.name} ${cert.issuer}`.toLowerCase()

  if (text.includes('database')) return 'IT Specialist - Databases'
  if (text.includes('cyber')) return 'Introduction - Cybersecurity'

  return cert.name
}

const logoSets: LogoSkill[][] = [
  [
    { label: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },//
    { label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    { label: 'CSS3', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/960px-CSS3_logo.svg.png' },//
    { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { label: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },//
    { label: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },//
    { label: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
    { label: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },//
  ],
  [
    { label: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/F89820' },//
    { label: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },//
    { label: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },//
    { label: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },//
    { label: 'Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/960px-Adobe_Illustrator_CC_icon.svg.png' },//
    { label: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },//
    { label: 'WordPress', icon: 'https://cdn.simpleicons.org/wordpress/21759B' },//
    { label: 'Traditional Art', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pencil_green_icon.svg/960px-Pencil_green_icon.svg.png' },//
  ],
]

export function Skills({ skills, certifications }: SkillsProps) {
  const { ref, visible } = useInView()
  const [activeLogoSet, setActiveLogoSet] = useState(0)
  const [activeCertIndex, setActiveCertIndex] = useState(0)
  const [certificateOpen, setCertificateOpen] = useState(false)
  const [isLogoTransitioning, setIsLogoTransitioning] = useState(false)
  const technologies = useMemo(
    () =>
      Array.from(
        new Set([
          ...skills.flatMap((group) => group.items),
          'Laravel',
          'PHP',
          'WordPress',
          'Figma',
          'Photoshop',
          'Jupyter Notebook',
        ]),
      ),
    [skills],
  )

  const revolutionDuration = 8000

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsLogoTransitioning(true)
      window.setTimeout(() => {
        setActiveLogoSet((current) => (current + 1) % logoSets.length)
        setIsLogoTransitioning(false)
      }, 400)
    }, revolutionDuration)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="skills" className={styles.section}>
      <div ref={ref} className={`${styles.inner} ${visible ? styles.visible : ''}`}>
        <div className={styles.logoField} aria-label="Tools I work with">
          {logoSets[activeLogoSet].map((logo, index) => (
            <div
              key={`${activeLogoSet}-${logo.label}`}
              className={`${styles.logoTile} ${isLogoTransitioning ? styles.logoFading : ''}`}
              style={{
                '--i': index,
                '--stagger': `${index * 55}ms`,
                '--angle': `${(index * 360) / logoSets[activeLogoSet].length}deg`,
              } as LogoStyle}
              title={logo.label}
            >
              <img src={logo.icon} alt="" aria-hidden="true" />
              <span>{logo.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>About Me</p>
          <h2 className={styles.title}>
            My assets for thoughtful digital work<span aria-hidden="true">.</span>
          </h2>
          <p>
            I specialize in web design and front-end development, 
            turning ideas into engaging online experiences.
          </p>
          <p>
            My goal is to deliver well-structured code and create visually
             appealing websites that provide real value to users. 
             I focus on continuous learning and embrace new technologies 
             to enhance my skills and improve web experiences.
          </p>

          <div className={styles.block}>
            <h3>Certifications</h3>
            <div className={styles.credentials}>
              {certifications.map((cert, index) => (
                <button
                  key={cert.name}
                  type="button"
                  className={styles.credentialItem}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                  onClick={() => {
                    setActiveCertIndex(index)
                    setCertificateOpen(true)
                  }}
                  aria-label={`View ${credentialTitle(cert)} certificate`}
                >
                  <span className={styles.credentialBadge} aria-hidden="true">
                    {cert.badgeImageUrl ? (
                      <img src={cert.badgeImageUrl} alt={credentialTitle(cert)} className={styles.credentialLogo} />
                    ) : (
                      <span className={styles.badgeLetter}>IT</span>
                    )}
                  </span>

                  <span className={styles.credentialCopy}>
                    <span className={styles.credentialName}>{credentialTitle(cert)}</span>
                  </span>
                </button>
              ))}
            </div>

            <MediaLightbox
              open={certificateOpen}
              onClose={() => setCertificateOpen(false)}
              title={credentialTitle(certifications[activeCertIndex] ?? certifications[0])}
              subtitle={certifications[activeCertIndex]?.issuer}
              src={certifications[activeCertIndex]?.imageUrl ?? ''}
                credentialUrl={certifications[activeCertIndex]?.credentialUrl}
            />
          </div>

          <div className={styles.block}>
            <h3>Technologies I work with</h3>
            <div className={styles.pills}>
              {technologies.map((item) => (
                <span key={item} className={styles.pill}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
