import { site } from './siteConfig.js'

export const socialLinks = [
  { label: 'LinkedIn', href: site.contact.linkedin || 'https://www.linkedin.com/', icon: 'linkedin', external: true },
  { label: 'Instagram', href: site.contact.instagram || 'https://www.instagram.com/', icon: 'instagram', external: true },
  { label: 'GitHub', href: site.contact.github || 'https://github.com/', icon: 'github', external: true },
  { label: 'Call by phone', href: `tel:${site.contact.phone.replace(/[^+\d]/g, '')}`, icon: 'phone' },
]
