import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SiteEffects from './SiteEffects.jsx'
import FloatingActions from './FloatingActions.jsx'
import CookieNotice from './CookieNotice.jsx'
import EnquiryModal from '../ui/EnquiryModal.jsx'

export default function Layout({ children }) {
  return <div className="min-h-screen bg-black text-[var(--site-text)]"><SiteEffects /><Navbar /><main className="bg-black animate-site-route-enter motion-reduce:animate-none">{children}</main><Footer /><FloatingActions /><CookieNotice /><EnquiryModal /></div>
}
