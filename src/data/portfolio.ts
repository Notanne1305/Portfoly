export interface SocialLink {
  platform: string
  url: string
  label: string
}

export interface Project {
  title: string
  role: string
  description: string
  tags: string[]
  url?: string
  repo?: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  /** Image (.jpg, .png, .webp, .svg) or PDF (.pdf) in public/ */
  imageUrl: string
  credentialUrl?: string
}

export interface ArtPiece {
  title: string
  year: string
  imageUrl?: string
  description?: string
}

export interface ArtGroup {
  category: string
  pieces: ArtPiece[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface PortfolioData {
  personal: {
    name: string
    title: string
    location: string
    email: string
    bio: string
    avatarInitials: string
  }
  skills: SkillGroup[]
  projects: Project[]
  certifications: Certification[]
  artGroups: ArtGroup[]
  socials: SocialLink[]
}

export const portfolio: PortfolioData = {
  personal: {
    name: 'Jonathan G. Sindo',
    title: 'Developer · Designer · Creator',
    location: 'Davao City, Philippines',
    email: 'jonathan.g.sindo@gmail.com',
    bio: 'I build thoughtful digital experiences at the intersection of code and craft. From full-stack applications to visual art, I care about work that feels intentional — technically sound, visually considered, and built to last.',
    avatarInitials: ' ',
  },
  skills: [
    {
      category: 'Languages',
      items: ['Java', 'Python', 'JavaScript','TypeScript', 'SQL'],
    },
    {
      category: 'Frontend',
      items: ['Tailwind', 'HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
      category: 'Backend & Security',
      items: ['Node.js', 'MySQL', 'Cybersecurity and Threat Detection', 'Git'],
    },
    {
      category: 'Design',
      items: ['Figma', 'Photoshop', 'Illustrator', 'Affinity', 'Traditional Art'],
    },
  ],

  projects: [
    {
      title: 'Caesar Cipher Encypt-Decrypt Activity',
      role: 'Author',
      description:
        'A programming project focused on Caesar encryption and decryption concepts.',
      tags: ['Python'],
      repo: 'https://github.com/Notanne1305/Caesar_Cipher',
      year: '2026',
    },
    {
      title: 'Malware Detection ML',
      role: 'Collaborator',
      description:
      'A machine learning project for malware detection on Android devices.',
      tags: ['Python', 'Jupyter Notebook'],
      repo: 'https://github.com/loftyyyy/MalwareDetectionML',
      year: '2026',
    },
    {
      title: 'Second Gear',
      role: 'Collaborator',
      description:
        'A web development project intended to give a selling platform for second-hand vehicles.',
      tags: ['Laravel', 'Tailwind', 'MySQL'],
      repo: 'https://github.com/loftyyyy/SecondGear',
      year: '2025',
    },
  ],

  certifications: [
    {
      name: 'DTI Introduction to Cybersecurity Program',
      issuer: 'DTI / Cisco',
      date: '2026',
      imageUrl: '/certifications/Introduction_to_Cybersecurity_certificate_j-sindo-545117-umindanao-edu-ph_ce72dc17-c847-4e82-9bbc-e2015a32f91a.pdf',
      
    },
    {
      name: 'Databases Certification',
      issuer: 'Certiport / Pearson',
      date: '2025',
      imageUrl: '/certifications/Databases Certificate.pdf',
    },
    // {
    //   name: 'Network Security',
    //   issuer: 'Certiport',
    //   date: '2026',
    //   imageUrl: '/certifications/google-ux.svg',
    // },
  ],

  artGroups: [
    {
      category: 'Shirt Designs',
      pieces: [
        {
          title: 'CCE 2024-25 Official Shirt',
          year: '2024',
          imageUrl: '/arts/WinningDesign24-25.jpg',
          description: 'Winning Design for Intramurals Shirt Design Contest 2024-2025 CCE under College of Computing Education',
        },
        {
          title: 'HCM OLA Class Commission',
          year: '2025',
          imageUrl: '/arts/OLA_Shirt.jpg',
          description: 'Commission work for section OLA of Holy Cross of Mintal, AY. 2025-2026',
        },
        {
          title: 'Shirt Design Entry',
          year: '2025',
          imageUrl: '/arts/Entry2025-26.png',
          description: 'Shirt design entry for the AY. 2025-2026 Intramurals Shirt Design Contest',
        },
        {
          title: 'UM CHE MICE Uniform Commission',
          year: '2026',
          imageUrl: '/arts/CHE_MICE_UNIFORM_WHITE_VER.jpg',
          description: 'Commission Work for the College of Hospitality Education - MICE',
        }
      ],
    },
    {
      category: 'Brochures',
      pieces: [
        {
          title: 'Lake Sebu Brochure (Front)',
          year: '2025',
          imageUrl:'/arts/front.png',
          description: 'Tri-fold layout highlighting features Lake Sebu.',
        },
        {
          title: 'Lake Sebu Brochure (Back)',
          year: '2025',
          imageUrl:'/arts/back.png',
          description: 'Tri-fold layout highlighting features Lake Sebu.',
        },
      ],
    },
    {
      category: 'Publication Materials',
      pieces: [
        {
          title: 'JBECP Event Publication Material',
          year: '2025',
          imageUrl:'/arts/JBECP.png',
          description: 'Publication material for Junior Blockchain Education Consortium of the Philippines',
        },
      ],
    },
    {
      category: 'Digital Arts',
      pieces: [
        {
          title: 'Porsche 911',
          year: '2025',
          imageUrl:'/arts/landing_page_pic.png',
          description: 'Digital arts to serve as the background for project Second Gear',
        },
      ],
    },
    {
      category: 'Tarpaulins',
      pieces: [
        {
          title: 'Pipoy Piso Wifi',
          year: '2025',
          imageUrl:'/arts/Pipoy_Peso_Wifi.jpg',
          description: 'Tarpaulin design for Pipoy Pisowifi Business',
        },
        {
          title: 'Graduation1',
          year: '2025',
          imageUrl:'/arts/Sir_Marvin.png',
          description: "Tarpaulin design for Mr. Batican's graduation",
        },
        {
          title: 'Graduation2',
          year: '2025',
          imageUrl:'/arts/Maam_Abby.png',
          description: "Tarpaulin design og Ms. Macanta's graduation ",
        },
      ],
    },
  ],
  socials: [
    { platform: 'GitHub', url: 'https://github.com/Notanne1305', label: 'Notanne1305' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jonathan-sindo-4a8805298/', label: 'Jonathan Sindo' },
    { platform: 'Instagram', url: 'https://www.instagram.com/nahtzzz/', label: '@nahtzzz' },
    { platform: 'Behance', url: 'https://behance.net', label: 'Portfolio' },
  ],
}
