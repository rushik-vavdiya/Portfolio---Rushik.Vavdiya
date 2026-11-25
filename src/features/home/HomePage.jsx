import SEO from '../../components/SEO.jsx'
import seoConfig from '../../seo/seoConfig.js'
import Hero from './sections/Hero/Hero.jsx'
import { lazy, Suspense } from 'react'

const TechStack = lazy(() => import('./sections/Technology.jsx'))
const Services = lazy(() => import('./sections/Services.jsx'))
const About = lazy(() => import('./sections/About.jsx'))
const Projects = lazy(() => import('./sections/Projects.jsx'))
const CodeShowcase = lazy(() => import('./sections/CodeShowcase.jsx'))
const Testimonials = lazy(() => import('./sections/Testimonials.jsx'))
const PricingPreview = lazy(() => import('./sections/PricingPreview.jsx'))
const FAQPreview = lazy(() => import('./sections/FAQPreview.jsx'))

function SectionFallback() {
  return null
}

const Home = () => {
  return (
    <div className="home-page min-h-screen bg-[#000] text-[var(--site-text)]">
       <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        url="https://your-portfolio.vercel.app/"
      />
      <Hero />
      <Suspense fallback={<SectionFallback />}><About /></Suspense>
      <Suspense fallback={<SectionFallback />}><Services /></Suspense>
      <Suspense fallback={<SectionFallback />}><CodeShowcase /></Suspense>
      <Suspense fallback={<SectionFallback />}><TechStack /></Suspense>
      <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><PricingPreview /></Suspense>
      <Suspense fallback={<SectionFallback />}><FAQPreview /></Suspense>
    </div>
  )
}

export default Home
