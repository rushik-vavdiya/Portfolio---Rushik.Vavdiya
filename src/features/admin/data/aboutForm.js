export const initialAboutForm = {
  sectionHeader: {
    eyebrow: 'ABOUT ME',
    heading: 'The developer behind',
    highlightHeading: 'the work.',
    description: 'A quick look at who I am, what I build, and how I approach every project.',
  },
  profileImage: '/images/profile-rushik.png',
  name: 'Astrix Code',
  role: 'Web designer & developer',
  description: 'I build Shopify stores, custom websites, and full stack web apps, with practical AI integrations when they support the product.',
  availability: { status: 'open', message: 'Open to work' },
  location: 'Available worldwide',
  stats: [
    { value: '01', label: 'Experience' },
    { value: '04', label: 'Services' },
    { value: '20', label: 'Technologies' },
  ],
  specialties: ['Shopify', 'React websites', 'Next.js websites', 'Full stack & AI apps'],
  button: { label: 'Start a project', link: '/contact' },
  experienceHeader: {
    eyebrow: 'EXPERIENCE',
    heading: 'Work and contribution',
    highlightHeading: '',
    description: 'Professional experience building and improving online stores.',
  },
  experiences: [{
    title: 'Shopify Developer',
    company: 'KG Krunch Solution',
    period: 'June 2026 – Present',
    duration: '5+ Months',
    description: 'Developed and customized Shopify stores, implemented custom features, optimized performance, and improved user experience.',
    technology: 'Shopify',
  }],
}

export const toAboutForm = (about) => ({
  ...initialAboutForm,
  ...about,
  sectionHeader: { ...initialAboutForm.sectionHeader, ...about.sectionHeader },
  availability: { ...initialAboutForm.availability, ...about.availability },
  button: { ...initialAboutForm.button, ...about.button },
  experienceHeader: { ...initialAboutForm.experienceHeader, ...about.experienceHeader },
  stats: about.stats?.map((stat) => ({ value: stat.value ?? '', label: stat.label ?? '' })) ?? [],
  specialties: about.specialties ? [...about.specialties] : [],
  experiences: about.experiences?.map((experience) => ({
    title: experience.title ?? '',
    company: experience.company ?? '',
    period: experience.period ?? '',
    duration: experience.duration ?? '',
    description: experience.description ?? '',
    technology: experience.technology ?? '',
  })) ?? [],
})

export const toAboutPayload = (form) => ({
  ...form,
  name: form.name.trim(),
  role: form.role.trim(),
  profileImage: form.profileImage.trim(),
  description: form.description.trim(),
  location: form.location.trim(),
  sectionHeader: Object.fromEntries(
    Object.entries(form.sectionHeader).map(([key, value]) => [key, value.trim()])
  ),
  availability: {
    status: form.availability.status.trim(),
    message: form.availability.message.trim(),
  },
  stats: form.stats
    .map((stat) => ({ value: stat.value.trim(), label: stat.label.trim() }))
    .filter((stat) => stat.value && stat.label),
  specialties: form.specialties.map((item) => item.trim()).filter(Boolean),
  button: {
    label: form.button.label.trim(),
    link: form.button.link.trim(),
  },
  experienceHeader: Object.fromEntries(
    Object.entries(form.experienceHeader).map(([key, value]) => [key, value.trim()])
  ),
  experiences: form.experiences.map((experience) => ({
    ...experience,
    title: experience.title.trim(),
    company: experience.company.trim(),
    period: experience.period.trim(),
    duration: experience.duration.trim(),
    description: experience.description.trim(),
    technology: experience.technology.trim(),
  })).filter((experience) => experience.title && experience.company && experience.period),
})
