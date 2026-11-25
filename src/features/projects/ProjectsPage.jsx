import ProjectGallery from './components/ProjectGallery.jsx'
import ProjectsCTA from './components/ProjectsCTA.jsx'

export default function ProjectsPage() {
  return <div className="min-h-[60vh] bg-[var(--site-bg)] text-[var(--site-text)]"><ProjectGallery /><ProjectsCTA /></div>
}
