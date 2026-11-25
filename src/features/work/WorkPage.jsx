import WorkHero from './components/WorkHero.jsx'
import ExperienceTimeline from './components/ExperienceTimeline.jsx'
import FocusAreas from './components/FocusAreas.jsx'

export default function WorkPage() {
  return <div className="min-h-[60vh] bg-[var(--site-bg)] text-[var(--site-text)]"><WorkHero /><ExperienceTimeline /><FocusAreas /></div>
}
