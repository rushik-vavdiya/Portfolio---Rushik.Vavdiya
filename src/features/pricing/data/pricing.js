/** Quote-based service packages. No prices are published without an approved rate. */
export const pricingPlans = [
  { slug: 'shopify-store', name: 'Shopify Store', description: 'Redesign your store or customize a theme around your products and customers.', projectLabel: 'Shopify store project', monthlyLabel: 'Custom quote', priceLabel: 'Custom quote', featured: false, features: ['Store review and project planning', 'Store design or theme features', 'Responsive product and collection pages', 'Testing and launch support'] },
  { slug: 'custom-website', name: 'Custom Website', description: 'Build a fast, responsive website with React or Next.js.', projectLabel: 'Custom website project', monthlyLabel: 'Custom quote', priceLabel: 'Custom quote', featured: true, features: ['Project discovery and page planning', 'Custom React or Next.js build', 'Responsive interface', 'SEO basics and launch review'] },
  { slug: 'mern-web-app', name: 'Web App (MERN)', description: 'Plan and build a full stack web app around your workflows.', projectLabel: 'MERN web app project', monthlyLabel: 'Custom quote', priceLabel: 'Custom quote', featured: false, features: ['Feature and data planning', 'React interface and API development', 'Authentication or dashboard features', 'Testing and deployment support'] },
]

export const pricingComparison = [
  { feature: 'Responsive design and development', shopify: true, website: true, mern: true },
  { feature: 'Shopify theme customization', shopify: true, website: false, mern: false },
  { feature: 'Full Shopify store redesign', shopify: true, website: false, mern: false },
  { feature: 'React or Next.js website', shopify: false, website: true, mern: false },
  { feature: 'MERN web app features', shopify: false, website: false, mern: true },
  { feature: 'Custom theme features', shopify: 'As scoped', website: false, mern: false },
  { feature: 'Launch support', shopify: true, website: true, mern: true },
]

export const pricingAddOns = ['Additional store pages or templates', 'Custom Liquid sections and features', 'Content and product migration', 'Post-launch maintenance']

export const pricingPageCopy = {
  previewEyebrow: 'PROJECT PACKAGES',
  previewTitle: 'A plan shaped around',
  previewAccent: 'your project.',
  previewDescription: 'Choose a starting point. I’ll confirm the scope, timeline, and quote before work begins.',
  pageEyebrow: 'PRICING',
  pageTitle: 'Clear scope.',
  pageAccent: 'Get a quote.',
  pageDescription: 'Choose the package that fits your project. Your proposal will confirm the work, timing, and payment milestones.',
  popular: 'MOST POPULAR',
  projectLabel: 'PROJECT PACKAGE',
  supportLabel: 'SUPPORT PACKAGE',
  request: 'Get a quote',
  comparisonEyebrow: 'PLAN COMPARISON', comparisonIncluded: 'Included', comparisonPlanLabels: ['Shopify Store', 'Custom Website', 'Web App (MERN)'],
  addOnsEyebrow: 'OPTIONAL ADD-ONS', addOnsTitle: 'Add only what', addOnsAccent: 'the work needs',
  nextStepEyebrow: 'NEXT STEP', nextStepTitle: 'Get a clear', nextStepAccent: 'project proposal',
  nextStepDescription: 'Tell me what you’re building, the main features, and any timing you have in mind. I’ll respond with questions or a sensible next step.',
  nextStepButton: 'Talk through your project', faqEyebrow: 'PRICING FAQ', faqTitle: 'A few answers', faqAccent: 'before we begin',
  compareTitle: 'What each package',
  compareAccent: 'can include',
  compareDescription: 'The final proposal confirms the scope for your project.',
  faq: [
    ['How is a project priced?', 'After clarifying the goals and scope, you’ll get a proposal with deliverables, timing, and payment milestones.'],
    ['Are these fixed packages?', 'They are starting points for a conversation. The final scope is tailored to the work and agreed before it begins.'],
    ['Can support continue after launch?', 'Yes. Ongoing fixes and improvements can be scoped around your site and the cadence you need.'],
  ],
}
