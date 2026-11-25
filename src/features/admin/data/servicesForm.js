export const initialServicesForm = {
  sectionHeader: {
    eyebrow: 'SERVICES',
    heading: '',
    highlightHeading: '',
    description: '',
  },
  services: [{
    title: '',
    description: '',
    features: [''],
    button: { text: 'Learn more', link: '/contact' },
  }],
}

export const toServicesForm = (service) => ({
  sectionHeader: {
    ...initialServicesForm.sectionHeader,
    ...service.sectionHeader,
  },
  services: service.services?.map((item) => ({
    title: item.title ?? '',
    description: item.description ?? '',
    features: item.features?.length ? [...item.features] : [''],
    button: {
      text: item.button?.text ?? '',
      link: item.button?.link ?? '',
    },
  })) ?? [],
})

export const toServicesPayload = (form) => ({
  sectionHeader: Object.fromEntries(
    Object.entries(form.sectionHeader).map(([key, value]) => [key, value.trim()])
  ),
  services: form.services.map((service) => ({
    title: service.title.trim(),
    description: service.description.trim(),
    features: service.features.map((feature) => feature.trim()).filter(Boolean),
    button: {
      text: service.button.text.trim(),
      link: service.button.link.trim(),
    },
  })),
})
