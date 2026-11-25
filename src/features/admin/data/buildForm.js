export const initialBuildForm = {
  sectionHeader: {
    eyebrow: 'INSIDE THE BUILD',
    heading: 'From clear thinking to working code',
    highlightHeading: 'working code',
    description: 'A transparent build process, thoughtful code, and every detail designed to move your project forward.',
  },
  leftPanel: { title: 'Built with intention', subtitle: 'Readable, responsive code as it comes together', status: 'Live code' },
  rightPanel: { title: 'Progress you can follow', subtitle: 'From first brief through final checks', status: 'In progress' },
  processLabels: ['Strategy', 'Design', 'Development', 'Launch'],
  coreStack: ['Shopify', 'React', 'Next.js', 'MERN'],
  principles: ['Thoughtful structure', 'Responsive by design', 'Careful launch checks'],
  processSteps: [
    { title: 'Discover', description: 'Understand the goal, audience, and project scope.', deliverable: 'clear brief' },
  ],
}

export const toBuildForm = (entry) => ({
  sectionHeader: { ...initialBuildForm.sectionHeader, ...entry?.sectionHeader },
  leftPanel: { ...initialBuildForm.leftPanel, ...entry?.leftPanel },
  rightPanel: { ...initialBuildForm.rightPanel, ...entry?.rightPanel },
  processLabels: entry?.processLabels?.length ? [...entry.processLabels] : [...initialBuildForm.processLabels],
  coreStack: entry?.coreStack?.length ? [...entry.coreStack] : [...initialBuildForm.coreStack],
  principles: entry?.principles?.length ? [...entry.principles] : [...initialBuildForm.principles],
  processSteps: entry?.processSteps?.length ? entry.processSteps.map((step) => ({ ...step })) : [...initialBuildForm.processSteps],
})

export const toBuildPayload = (form) => ({
  sectionHeader: Object.fromEntries(Object.entries(form.sectionHeader).map(([key, value]) => [key, value.trim()])),
  leftPanel: Object.fromEntries(Object.entries(form.leftPanel).map(([key, value]) => [key, value.trim()])),
  rightPanel: Object.fromEntries(Object.entries(form.rightPanel).map(([key, value]) => [key, value.trim()])),
  processLabels: form.processLabels.map((value) => value.trim()).filter(Boolean),
  coreStack: form.coreStack.map((value) => value.trim()).filter(Boolean),
  principles: form.principles.map((value) => value.trim()).filter(Boolean),
  processSteps: form.processSteps.map((step) => ({
    title: step.title.trim(),
    description: step.description.trim(),
    deliverable: step.deliverable?.trim() ?? '',
  })).filter((step) => step.title && step.description),
})
