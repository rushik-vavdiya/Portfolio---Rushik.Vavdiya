import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home.jsx'))
const AdminLayout = lazy(() => import('../features/admin/layout/AdminLayout.jsx'))
const AdminDashboardPage = lazy(() => import('../features/admin/pages/DashboardPage.jsx'))
const HomePageSectionsLayout = lazy(() => import('../features/admin/layout/HomePageSectionsLayout.jsx'))
const HomeSectionsPage = lazy(() => import('../features/admin/pages/home/HomeSectionsPage.jsx'))
const HeroSectionPage = lazy(() => import('../features/admin/pages/home/HeroSectionPage.jsx'))
const HeroCreatePage = lazy(() => import('../features/admin/pages/hero/HeroCreatePage.jsx'))
const HeroEditPage = lazy(() => import('../features/admin/pages/hero/HeroEditPage.jsx'))
const AboutSectionPage = lazy(() => import('../features/admin/pages/home/AboutSectionPage.jsx'))
const ServicesSectionPage = lazy(() => import('../features/admin/pages/home/ServicesSectionPage.jsx'))
const AboutCreatePage = lazy(() => import('../features/admin/pages/about/AboutCreatePage.jsx'))
const AboutEditPage = lazy(() => import('../features/admin/pages/about/AboutEditPage.jsx'))
const ServicesCreatePage = lazy(() => import('../features/admin/pages/services/ServicesCreatePage.jsx'))
const ServicesEditPage = lazy(() => import('../features/admin/pages/services/ServicesEditPage.jsx'))
const BuildSectionPage = lazy(() => import('../features/admin/pages/home/BuildSectionPage.jsx'))
const BuildEntryPage = lazy(() => import('../features/admin/pages/build/BuildEntryPage.jsx'))
const AdminAuthPage = lazy(() => import('../features/admin/pages/auth/AdminAuthPage.jsx'))
const AdminRoute = lazy(() => import('../features/admin/guards/AdminRoute.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))
const FAQ = lazy(() => import('../pages/FAQ.jsx'))
const ComingSoon = lazy(() => import('../pages/ComingSoon.jsx'))
const ServiceDetail = lazy(() => import('../features/services/ServiceDetailPage.jsx'))
const Projects = lazy(() => import('../pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail.jsx'))
const Work = lazy(() => import('../pages/Work.jsx'))
const Blog = lazy(() => import('../pages/Blog.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

export default function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminAuthPage mode="login" />} />
        <Route path="/admin/register" element={<AdminAuthPage mode="register" />} />
        <Route path="/admin/*" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="home" element={<HomePageSectionsLayout />}>
              <Route index element={<HomeSectionsPage />} />
              <Route path="hero" element={<HeroSectionPage />} />
              <Route path="hero/create" element={<HeroCreatePage />} />
              <Route path="hero/edit" element={<HeroEditPage />} />
              <Route path="hero/edit/:heroId" element={<HeroEditPage />} />
              <Route path="about" element={<AboutSectionPage />} />
              <Route path="about/create" element={<AboutCreatePage />} />
              <Route path="about/edit" element={<AboutEditPage />} />
              <Route path="about/edit/:aboutId" element={<AboutEditPage />} />
              <Route path="services" element={<ServicesSectionPage />} />
              <Route path="services/create" element={<ServicesCreatePage />} />
              <Route path="services/edit" element={<ServicesEditPage />} />
              <Route path="services/edit/:serviceId" element={<ServicesEditPage />} />
              <Route path="build" element={<BuildSectionPage />} />
              <Route path="build/create" element={<BuildEntryPage />} />
              <Route path="build/edit/:buildId" element={<BuildEntryPage />} />
            </Route>
            <Route path="hero/create" element={<Navigate to="/admin/home/hero/create" replace />} />
            <Route path="hero/edit" element={<Navigate to="/admin/home/hero/edit" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<ComingSoon pageName="About" description="I’m putting together more about my approach and the work I do. Check back soon." />} />
        <Route path="/services" element={<ComingSoon pageName="Services" description="I’m preparing a clear overview of the ways I can help with your store or website." />} />
        <Route path="/pricing" element={<ComingSoon pageName="Pricing" description="Pricing details are on the way. Contact me for an estimate tailored to your project." />} />
        <Route path="/process" element={<ComingSoon pageName="Process" description="I’m outlining the steps I use to take a project from first conversation to launch." />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
