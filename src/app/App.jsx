import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/layout/MainLayout.jsx'
import useSiteScrollReveal from '../hooks/useSiteScrollReveal.js'
import { services } from '../features/services/data/services.js'
import { projects } from '../features/projects/data/projects.js'
import { pageLabels, site } from '../data/siteConfig.js'
import AppRouter from './router.jsx'
import useSmoothScroll from '../hooks/useSmoothScroll.js'

function App() {
  const { pathname, hash } = useLocation()
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/')

  useEffect(() => {
    const routePath = pathname.startsWith('/blog/') ? '/blog' : pathname
    let title = `${pageLabels[routePath] || 'Page not found'} | ${site.brand}`
    let description = routePath === '/' ? site.seo.home : site.seo.descriptions[routePath] || site.seo.descriptions['/services']
    const detail = pathname.match(/^\/(services|projects)\/([^/]+)/)
    if (detail) {
      const [, type, slug] = detail
      const item = type === 'services' ? services.find((entry) => entry.slug === slug)
        : projects.find((entry) => entry.slug === slug)
      if (item) {
        title = `${item.title || item.name} | ${site.brand}`
        description = item.description || item.summary || item.overview
      }
    }
    if (pathname.startsWith('/admin/home/hero/edit/')) {
      title = `Edit Hero | ${site.brand}`
    }
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [pathname])

  useSiteScrollReveal(`${pathname}${hash}`)
  useSmoothScroll(`${pathname}${hash}`, !isAdminPage)

  const page = (
    <div key={pathname}>
      <AppRouter />
    </div>
  )

  return isAdminPage ? page : <Layout>{page}</Layout>
}

export default App
