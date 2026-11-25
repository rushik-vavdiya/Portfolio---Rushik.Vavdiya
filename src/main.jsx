import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/index.css'
import './styles/animations.css'
import App from './app/App.jsx'
import AppProviders from './app/providers/AppProviders.jsx'
import { getThemeRgb, themeHex } from './utils/themeColors.js'

const pageColor = themeHex(getThemeRgb('--site-bg-rgb'))
const accentColor = themeHex(getThemeRgb('--site-accent-rgb'))
const accentLightColor = themeHex(getThemeRgb('--site-accent-light-rgb'))
const whiteColor = themeHex(getThemeRgb('--site-white-rgb'))
const faviconMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="accent" x1="15" y1="9" x2="50" y2="55" gradientUnits="userSpaceOnUse"><stop stop-color="${whiteColor}"/><stop offset=".52" stop-color="${accentLightColor}"/><stop offset="1" stop-color="${accentColor}"/></linearGradient></defs><path d="M32 4.5 58 19.5v25L32 59.5 6 44.5v-25L32 4.5Z" fill="${pageColor}" stroke="${accentColor}" stroke-width="2"/><path d="m18.5 43 10.9-23.2a2.85 2.85 0 0 1 5.2 0L45.5 43M23 34h18" stroke="url(#accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="47" cy="17" r="2" fill="${accentLightColor}"/><circle cx="32" cy="32" r="2.7" fill="${whiteColor}"/></svg>`
const favicon = document.createElement('link')
favicon.rel = 'icon'
favicon.type = 'image/svg+xml'
favicon.href = `data:image/svg+xml,${encodeURIComponent(faviconMarkup)}`
document.head.append(favicon)
document.querySelector('meta[name="theme-color"]').content = pageColor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
