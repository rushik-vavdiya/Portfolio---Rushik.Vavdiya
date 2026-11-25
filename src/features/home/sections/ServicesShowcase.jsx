import { useEffect, useId, useRef, useState } from 'react'
import { servicesPageCopy } from '../../services/data/services.js'
import useReducedMotion from '../../../hooks/useReducedMotion.js'
import { trackElementSize, trackViewport } from '../../../utils/viewport.js'

const showcaseServices = [
  { name: 'Rynova', headline: 'Where style meets story', url: 'rynova.store/collections', accent: 'var(--site-accent)', accentLight: 'var(--site-accent)', scene: 'store' },
  { name: 'Luma', headline: 'Features made for you', url: 'luma.shop', accent: 'var(--site-accent)', accentLight: 'var(--site-white)', scene: 'store' },
  { name: 'Nova', headline: 'A site that moves your business', url: 'novastudio.com', accent: 'var(--site-accent)', accentLight: 'var(--site-accent)', scene: 'site' },
  { name: 'Launchpad', headline: 'Launch with confidence', url: 'launchpad.io', accent: 'var(--site-accent)', accentLight: 'var(--site-accent-bright)', scene: 'site' },
  { name: 'Bookly', headline: '', url: 'app.bookly.com/book', accent: 'var(--site-accent)', accentLight: 'var(--site-accent)', scene: 'app' },
  { name: 'Insight', headline: '', url: 'admin.insight.app', accent: 'var(--site-accent)', accentLight: 'var(--site-accent)', scene: 'dash' },
  { name: 'Pulse', headline: '', url: 'pulse.dev', accent: 'var(--site-accent-bright)', accentLight: 'var(--site-accent)', scene: 'dash' },
]

const capabilities = [
  ['Shopify stores', 'Redesign · Themes', '▣'],
  ['Custom features', 'Liquid · Storefront', '◧'],
  ['Custom websites', 'React · Next.js · MERN', '▦'],
]

const products = [
  ['Aura Serum', 48],
  ['Nimbus Jar', 62],
  ['Eclipse Set', 39],
  ['Orbit Mist', 75],
]

const chartLines = [
  'M0 88 L45 72 L90 80 L130 48 L180 58 L230 24 L300 34',
  'M0 92 L50 62 L90 68 L140 40 L190 50 L240 32 L300 16',
  'M0 96 L40 90 L90 72 L140 76 L190 42 L250 30 L300 10',
]

const dashboardMetrics = [
  [48.2, 8431, 98],
  [132.6, 21930, 97],
  [391.4, 64210, 99],
]

const laptopKeyboardRows = [
  [['esc', 1.4], ...Array.from({ length: 12 }, (_, index) => [`F${index + 1}`, 1]), ['del', 1.4]],
  [['~', 1], ...'1234567890'.split('').map((key) => [key, 1]), ['-', 1], ['=', 1], ['backspace', 1.8]],
  [['tab', 1.5], ...'QWERTYUIOP'.split('').map((key) => [key, 1]), ['[', 1], [']', 1], ['\\', 1.5]],
  [['caps', 1.8], ...'ASDFGHJKL'.split('').map((key) => [key, 1]), [';', 1], ["'", 1], ['enter', 1.8]],
  [['shift', 2.1], ...'ZXCVBNM'.split('').map((key) => [key, 1]), [',', 1], ['.', 1], ['/', 1], ['shift', 2.1]],
  [['fn', 1], ['ctrl', 1.1], ['alt', 1.1], ['cmd', 1.1], ['space', 5], ['cmd', 1.1], ['alt', 1.1], ['←', 1], ['↓', 1], ['↑', 1], ['→', 1]],
]

function LaptopKeyboard() {
  return (
    <div aria-hidden="true" className="relative -mx-[6%] h-[36px] [clip-path:polygon(6%_0,94%_0,100%_100%,0_100%)] border-t border-[rgb(var(--site-white-rgb)/0.2)] bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.16),rgb(var(--site-white-rgb)/0.06)_20%,var(--site-black)_100%)] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.2),inset_0_-4px_8px_rgb(var(--site-black-rgb)/0.8)]">
      <div className="absolute inset-x-[8%] top-[2px] grid h-[22px] grid-rows-6 gap-[1px] rounded-[3px] border border-[rgb(var(--site-white-rgb)/0.1)] bg-[rgb(var(--site-black-rgb)/0.78)] p-[2px] [transform:perspective(140px)_rotateX(4deg)]">
        {laptopKeyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex min-h-0 gap-[1px]">
            {row.map(([label, width], keyIndex) => (
              <span
                key={`${label}-${keyIndex}`}
                className="grid min-w-0 place-items-center overflow-hidden rounded-[1.5px] border border-[rgb(var(--site-white-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.2),rgb(var(--site-white-rgb)/0.08)_42%,rgb(var(--site-black-rgb)/0.72))] text-[3.5px] leading-none font-medium text-[rgb(var(--site-white-rgb)/0.7)] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.16),0_1px_1px_rgb(var(--site-black-rgb)/0.7)]"
                style={{ flex: width }}
              >
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
      <i className="absolute bottom-[3px] left-1/2 h-[8px] w-1/4 -translate-x-1/2 rounded-[3px] border border-[rgb(var(--site-white-rgb)/0.18)] bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.08),rgb(var(--site-black-rgb)/0.28))] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.08)]" />
    </div>
  )
}

function ProductArt({ index, accent, accentLight }) {
  const palettes = [
    [accent, accentLight],
    ['var(--site-accent)', 'var(--site-white)'],
    ['var(--site-accent-bright)', 'var(--site-white)'],
    ['var(--site-accent-bright)', 'var(--site-white)'],
  ]
  const [start, end] = palettes[index % palettes.length]
  const gradientId = `service-product-${useId().replaceAll(':', '')}-${index}-${accent.replace('#', '')}`

  return (
    <svg viewBox="0 0 80 100" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={end} />
          <stop offset="1" stopColor={start} />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="95" rx="24" ry="4" fill="var(--site-black)" opacity=".15" />
      {index % 4 === 0 && <><rect x="32" y="6" width="16" height="12" rx="3" fill="var(--site-black)" /><rect x="25" y="16" width="30" height="76" rx="10" fill={`url(#${gradientId})`} /><rect x="30" y="36" width="20" height="28" rx="3" fill="var(--site-white)" opacity=".88" /><rect x="29" y="22" width="5" height="62" rx="2.5" fill="var(--site-white)" opacity=".28" /></>}
      {index % 4 === 1 && <><rect x="22" y="14" width="36" height="12" rx="4" fill="var(--site-black)" /><rect x="18" y="24" width="44" height="58" rx="14" fill={`url(#${gradientId})`} /><rect x="26" y="42" width="28" height="18" rx="3" fill="var(--site-white)" opacity=".88" /><rect x="24" y="30" width="6" height="46" rx="3" fill="var(--site-white)" opacity=".28" /></>}
      {index % 4 === 2 && <><rect x="14" y="30" width="52" height="52" rx="6" fill={`url(#${gradientId})`} /><rect x="36" y="30" width="8" height="52" fill="var(--site-white)" opacity=".55" /><rect x="14" y="48" width="52" height="8" fill="var(--site-white)" opacity=".4" /><path d="M40 30c-14-18-24 0-8 0zM40 30c14-18 24 0 8 0z" fill="none" stroke="var(--site-white)" strokeWidth="3" opacity=".8" /></>}
      {index % 4 === 3 && <><path d="M24 20h32l-4 66H28z" fill={`url(#${gradientId})`} /><rect x="20" y="14" width="40" height="9" rx="4" fill="var(--site-black)" /><rect x="31" y="40" width="18" height="20" rx="3" fill="var(--site-white)" opacity=".88" /><path d="M28 24l2 58" stroke="var(--site-white)" strokeWidth="4" opacity=".25" strokeLinecap="round" /></>}
    </svg>
  )
}

function BrowserChrome({ service }) {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-[15] flex h-[34px] items-center gap-1.5 border-b border-[var(--site-black)] bg-[var(--site-black)] px-3">
        <i className="size-[9px] rounded-full bg-[var(--site-accent)]" />
        <i className="size-[9px] rounded-full bg-[var(--site-accent-bright)]" />
        <i className="size-[9px] rounded-full bg-[var(--site-accent-light)]" />
        <div className="ml-2 flex items-center gap-1.5 whitespace-nowrap rounded-t-lg bg-[var(--site-black)] px-3 py-1.5 text-[10px] text-[var(--site-white)]">
          <b className="size-2.5 rounded-[3px] bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))]" />
          {service.name}
        </div>
        <div className="ml-2 flex h-[22px] min-w-0 flex-1 items-center gap-[7px] rounded-[11px] bg-[var(--site-black)] px-2.5 text-[10px] text-[var(--site-white)]">
          <i className="size-1.5 shrink-0 rounded-[2px] border-[1.5px] border-[var(--site-accent-bright)]" />
          <span className="truncate">{service.url}</span>
        </div>
      </div>
      <div className="absolute left-0 top-[34px] z-[16] h-0.5 w-full origin-left animate-[services-load_1s_ease-out_both] bg-[linear-gradient(90deg,var(--scene-accent),var(--scene-accent-light))] shadow-[0_0_8px_var(--scene-accent-light)] motion-reduce:animate-none" />
    </>
  )
}

function StoreScene({ service, step }) {
  const added = step >= 5
  const drawerOpen = step >= 8 && step <= 10
  const subscribed = step >= 14
  const pageOffset = step >= 11 ? -260 : 0
  const activeHover = step === 1 ? 'cta' : step === 3 || step === 4 || step === 5 ? 'product' : ''

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--site-black)]">
      <div
        className="absolute left-0 top-0 bg-white text-[var(--site-black)] transition-transform duration-1000 ease-in-out"
        style={{ width: 640, transform: `translateY(${pageOffset}px)` }}
      >
        <div className="bg-[var(--site-black)] px-2 py-1.5 text-center text-[9px] tracking-[.14em] text-white">FREE SHIPPING ON ORDERS OVER $50</div>
        <div className="flex items-center gap-[18px] border-b border-[var(--site-white)] px-6 py-3 text-[11px]">
          <b className="mr-auto text-[17px] tracking-[-.03em]">{service.name}</b>
          <span className="text-[var(--site-text-subtle)]">Shop</span><span className="text-[var(--site-text-subtle)]">Collections</span><span className="text-[var(--site-text-subtle)]">About</span>
          <span className={`rounded-lg border px-3 py-1.5 font-bold ${step === 7 ? 'border-[var(--scene-accent)]' : 'border-[var(--site-white)]'}`}>Cart <em className="ml-1 inline-grid size-4 place-items-center rounded-lg bg-[var(--scene-accent)] text-[9px] not-italic text-white">{added ? 3 : 2}</em></span>
        </div>
        <div className="flex items-center gap-2.5 bg-[linear-gradient(120deg,var(--site-white),var(--site-white))] px-7 py-7">
          <div className="flex-1">
            <small className="font-extrabold tracking-[.2em] text-[var(--scene-accent)]">NEW COLLECTION</small>
            <h1 className="my-2 text-[32px] leading-[1.05] tracking-[-.03em]">{service.headline}</h1>
            <p className="mb-3.5 max-w-[250px] text-[11px] leading-[1.6] text-[var(--site-black)]">Premium products, thoughtful design and a checkout that just works.</p>
            <span className={`inline-block rounded-[9px] bg-[var(--scene-accent)] px-[18px] py-[9px] text-[11px] font-bold text-white transition-all ${activeHover === 'cta' ? '-translate-y-px shadow-[0_8px_22px_-4px_var(--scene-accent)]' : ''}`}>Shop now →</span>
          </div>
          <div className="relative h-[190px] w-[170px] shrink-0 animate-[services-float_5s_ease-in-out_infinite] motion-reduce:animate-none">
            <ProductArt index={0} accent={service.accent} accentLight={service.accentLight} />
            <em className="absolute top-1.5 right-0 rounded-full bg-[var(--site-black)] px-[9px] py-[5px] text-[10px] font-extrabold not-italic text-white">-20%</em>
          </div>
        </div>
        <div className="flex items-center justify-between px-7 pt-[22px] pb-2.5"><h3 className="text-base">Best sellers</h3><span className="text-[10px] font-bold text-[var(--scene-accent)]">View all →</span></div>
        <div className="grid grid-cols-4 gap-3 px-7 pb-[22px]">
          {products.map(([name, price], index) => (
            <div key={name} className={`rounded-xl border bg-white p-2.5 text-[11px] transition-all ${activeHover === 'product' && index === 1 ? '-translate-y-1 border-[var(--site-white)] shadow-[0_14px_30px_-12px_rgb(var(--site-accent-rgb)/0.2)]' : 'border-[var(--site-white)]'}`}>
              <div className="mb-2 grid h-24 place-items-center rounded-[9px] bg-[var(--site-white)]"><div className="h-[84px] w-[68px]"><ProductArt index={index} accent={service.accent} accentLight={service.accentLight} /></div></div>
              <b className="block">{name}</b><span className="my-0.5 block text-[var(--site-accent)]">${price}</span>
              <i className={`block rounded-lg border px-1 py-[7px] text-center text-[10px] font-bold not-italic ${added && index === 1 ? 'border-[var(--site-accent-light)] bg-[var(--site-accent-light)] text-white' : activeHover === 'product' && index === 1 ? 'border-[var(--scene-accent)] bg-[var(--scene-accent)] text-white' : 'border-[var(--site-white)]'}`}>{added && index === 1 ? 'Added ✓' : 'Add to cart'}</i>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 px-7 pb-[22px] text-[10px] text-[var(--site-accent)]">
          {['Free shipping|Orders over $50', 'Easy returns|30 days, no questions', 'Secure checkout|Encrypted payments'].map((item) => {
            const [title, detail] = item.split('|')
            return <div key={title} className="rounded-[10px] bg-[var(--site-white)] p-3.5"><b className="mb-[3px] block text-[11px] text-[var(--site-black)]">{title}</b>{detail}</div>
          })}
        </div>
        <div className="flex items-center justify-between bg-[var(--site-black)] px-7 pt-6 pb-10 text-[11px] text-white">
          <div><b className="mb-[3px] block text-[15px]">Join the club</b><span className="opacity-65">Get 10% off your first order</span></div>
          <div className="flex gap-2">
            <span className="w-[130px] rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white/60">{step >= 12 ? 'hello@mail.com' : 'Email address'}</span>
            <span className={`rounded-[9px] bg-[var(--scene-accent)] px-[18px] py-[9px] text-[11px] font-bold text-white ${subscribed ? 'bg-[var(--site-accent-light)]' : ''}`}>{subscribed ? 'Subscribed ✓' : 'Subscribe'}</span>
          </div>
        </div>
      </div>
      <div className={`absolute inset-0 z-20 bg-[rgb(var(--site-black-rgb)/0.55)] transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <div className={`absolute inset-y-0 right-0 z-[21] w-[230px] bg-white p-[18px] text-[11px] text-[var(--site-black)] shadow-[-20px_0_40px_rgb(var(--site-black-rgb)/0.25)] transition-transform duration-[450ms] ${drawerOpen ? 'translate-x-0' : 'translate-x-[105%]'}`}>
        <h4 className="mb-3 flex justify-between text-sm">Your cart <span>×</span></h4>
        {products.slice(0, added ? 3 : 2).map(([name, price], index) => (
          <div key={name} className="flex items-center gap-2.5 border-b border-[var(--site-white)] py-[9px]">
            <div className="grid size-[34px] place-items-center rounded-lg bg-[var(--site-white)]"><div className="size-7"><ProductArt index={index} accent={service.accent} accentLight={service.accentLight} /></div></div>
            <div><b className="block">{name}</b><span className="text-[var(--site-accent)]">${price} · Qty 1</span></div>
          </div>
        ))}
        <div className="my-3.5 flex justify-between text-[13px] font-extrabold"><span>Total</span><span>${added ? 149 : 87}</span></div>
        <span className="block rounded-[9px] bg-[var(--scene-accent)] py-[9px] text-center font-bold text-white">Checkout</span>
      </div>
      {subscribed && <div className="absolute bottom-3 left-1/2 z-[25] -translate-x-1/2 rounded-full bg-[var(--site-black)] px-4 py-2 text-[11px] font-semibold text-white shadow-lg">Welcome to the club!</div>}
    </div>
  )
}

function SiteScene({ service, step }) {
  const hovered = step === 1 ? 'cta' : step === 3 ? 'feature' : ''
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--site-black)] text-white">
      <div className="absolute left-0 top-0" style={{ width: 640 }}>
        <div className="flex items-center gap-5 px-7 py-3.5 text-[11px]"><b className="mr-auto text-[15px]">{service.name}</b><span className="opacity-70">Work</span><span className="opacity-70">Services</span><span className="opacity-70">Pricing</span><span className="rounded-[9px] bg-[var(--scene-accent)] px-[18px] py-[9px] font-bold">Sign in</span></div>
        <div className="relative bg-[radial-gradient(60%_80%_at_50%_0,var(--scene-accent-light),transparent_65%),radial-gradient(40%_50%_at_15%_30%,var(--scene-accent),transparent_70%)] px-[30px] pt-[30px] pb-5 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-[5px] text-[9px] tracking-[.12em]">● NEW · VERSION 2.0 IS LIVE</span>
          <h1 className="mx-auto my-3.5 max-w-[470px] text-[36px] leading-[1.05] tracking-[-.03em]">{service.headline}</h1>
          <p className="mx-auto mb-4 max-w-[320px] text-[11px] leading-[1.6] opacity-75">Fast, beautiful and built to convert visitors into loyal customers.</p>
          <div className="flex justify-center gap-2.5"><span className={`rounded-[9px] bg-[var(--scene-accent)] px-[18px] py-[9px] text-[11px] font-bold transition-all ${hovered === 'cta' ? '-translate-y-px shadow-lg' : ''}`}>Start a project</span><span className="rounded-[9px] border border-white/20 bg-white/5 px-[18px] py-[9px] text-[11px] font-bold">See our work</span></div>
          <div className="mx-auto mt-[22px] grid h-[76px] w-[420px] grid-cols-3 gap-2 rounded-t-xl border border-white/10 bg-[linear-gradient(var(--site-black),var(--site-black))] p-2 animate-[services-float_6s_ease-in-out_infinite] motion-reduce:animate-none"><i className="rounded-lg bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))] opacity-80" /><i className="rounded-lg bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))] opacity-45" /><i className="rounded-lg bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))] opacity-65" /></div>
        </div>
        <div className="flex justify-around px-10 py-[18px] text-[11px] font-bold tracking-[.2em] opacity-45"><span>ACME</span><span>NORTH</span><span>VERTEX</span><span>ZENITH</span></div>
        <div className="grid grid-cols-3 gap-3.5 px-7 py-3.5">
          {['Fast by default|Optimized for speed and Core Web Vitals.', 'Pixel perfect|Responsive on every device and screen.', 'Built to scale|Clean code that grows with you.'].map((item, index) => {
            const [title, description] = item.split('|')
            return <div key={title} className={`rounded-[14px] border border-white/10 bg-white/[.04] p-[18px] text-[10px] leading-[1.6] transition-all ${hovered === 'feature' && index === 1 ? '-translate-y-1 border-[var(--scene-accent-light)] shadow-lg' : ''}`}><i className="mb-2.5 block size-[30px] rounded-[9px] bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))]" /><b className="mb-1 block text-[13px]">{title}</b>{description}</div>
          })}
        </div>
        <div className={`mx-7 my-2 flex justify-around rounded-[14px] bg-white/[.06] p-[22px] text-center ${step >= 7 ? 'shadow-[0_0_30px_-8px_var(--scene-accent)]' : ''}`}>
          {['120|Projects', '3x|More leads', '98%|Happy clients'].map((item) => {
            const [value, label] = item.split('|')
            return <div key={label}><b className="block text-[26px] text-[var(--scene-accent-light)]">{step >= 7 ? value : '0'}</b><span className="text-[9px] uppercase tracking-[.12em] opacity-60">{label}</span></div>
          })}
        </div>
        <div className="grid grid-cols-2 items-center gap-5 px-7 py-5"><div><h3 className="text-xl tracking-[-.02em]">Let’s build it together</h3><p className="mt-1.5 text-[10px] opacity-65">Tell us about your project and we’ll reply within 24h.</p></div><div className="grid gap-2"><span className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-[10px] text-white/60">Alex Morgan</span><span className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-[10px] text-white/60">alex@brand.com</span></div></div>
      </div>
    </div>
  )
}

function AppScene({ step }) {
  const dateSelected = step >= 2
  const timeSelected = step >= 4
  const confirmed = step >= 6
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--site-white)] text-[var(--site-black)]">
      <div className="absolute inset-x-0 top-0 grid h-[366px] grid-cols-[54px_1fr] text-[10px]">
        <div className="grid content-start gap-2.5 bg-[linear-gradient(var(--site-black),var(--site-black))] p-3.5"><i className="h-[30px] rounded-lg bg-white" /><i className="h-[30px] rounded-lg bg-white/15" /><i className="h-[30px] rounded-lg bg-white/15" /><i className="h-[30px] rounded-lg bg-white/15" /></div>
        <div className="overflow-hidden p-[14px_18px]">
          <h2 className="mb-0.5 text-base">Book an appointment</h2><span className="mb-2.5 block text-[var(--site-accent)]">Choose a date and time that works for you</span>
          <div className="grid grid-cols-[200px_1fr_170px] gap-3">
            <div className="rounded-[14px] bg-white p-3 shadow-[0_6px_20px_-10px_rgb(var(--site-accent-rgb)/0.2)]">
              <h5 className="mb-2 flex justify-between text-[11px]">November 2026 <span>‹ ›</span></h5>
              <div className="grid grid-cols-7 gap-[3px] text-center">
                {'MTWTFSS'.split('').map((day, index) => <span key={`${day}-${index}`} className="pb-[3px] text-[8px] text-[var(--site-white)]">{day}</span>)}
                {[...Array(3)].map((_, index) => <i key={`empty-${index}`} />)}
                {[...Array(30)].map((_, index) => <span key={index} className={`grid h-[22px] place-items-center rounded-[7px] text-[9px] ${index < 10 ? 'text-[var(--site-white)]' : ''} ${dateSelected && index === 18 ? 'bg-[linear-gradient(135deg,var(--scene-accent),var(--scene-accent-light))] font-extrabold text-white shadow-md' : ''}`}>{index + 1}</span>)}
              </div>
            </div>
            <div className="rounded-[14px] bg-white p-3 shadow-[0_6px_20px_-10px_rgb(var(--site-accent-rgb)/0.2)]">
              <h5 className="mb-2 text-[11px]">Available times</h5>
              <div className="grid grid-cols-2 gap-1.5">
                {['09:00', '10:30', '11:00', '12:30', '14:00', '15:30', '16:00', '17:30'].map((time, index) => <span key={time} className={`rounded-[9px] border px-1 py-2 text-center font-semibold ${index === 1 || index === 5 ? 'opacity-35 line-through' : 'border-[var(--site-white)]'} ${timeSelected && index === 4 ? 'border-[var(--scene-accent)] bg-[var(--scene-accent)] text-white shadow-md' : ''}`}>{time}</span>)}
              </div>
            </div>
            <div className="rounded-[14px] bg-white p-3 shadow-[0_6px_20px_-10px_rgb(var(--site-accent-rgb)/0.2)]">
              <h5 className="mb-2 text-[11px]">Summary</h5>
              <div className="grid gap-2">
                <div className="flex justify-between border-b border-dashed border-[var(--site-white)] pb-[7px]"><span className="text-[var(--site-accent)]">Service</span><b>Consultation</b></div>
                <div className="flex justify-between border-b border-dashed border-[var(--site-white)] pb-[7px]"><span className="text-[var(--site-accent)]">Date</span><b>{dateSelected ? 'Thu, Nov 19' : '—'}</b></div>
                <div className="flex justify-between border-b border-dashed border-[var(--site-white)] pb-[7px]"><span className="text-[var(--site-accent)]">Time</span><b>{timeSelected ? '14:00' : '—'}</b></div>
                <span className={`mt-1 rounded-[9px] bg-[var(--scene-accent)] py-2 text-center font-bold text-white ${confirmed ? 'bg-[var(--site-accent-light)]' : ''}`}>{confirmed ? 'Booked ✓' : 'Confirm booking'}</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex justify-between rounded-[9px] bg-white p-[7px_10px]"><span>Mon, Nov 9 · 11:00</span><b>Design review</b></div>
          {confirmed && <div className="mt-1 flex justify-between rounded-[9px] border-l-[3px] border-[var(--site-accent-light)] bg-white p-[7px_10px]"><span>Thu, Nov 19 · 14:00</span><b>Consultation</b></div>}
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 z-[25] -translate-x-1/2 rounded-full bg-[var(--site-black)] px-4 py-2 text-[11px] font-semibold text-white shadow-lg transition-opacity" style={{ opacity: confirmed ? 1 : 0 }}>Appointment confirmed!</div>
    </div>
  )
}

function DashboardScene({ service, step }) {
  const range = step >= 11 ? 2 : step >= 4 ? 1 : 0
  const [revenue, visitors, speed] = dashboardMetrics[range]
  const line = chartLines[range]
  const activeChart = step === 6 || step === 7
  const orderAdded = step >= 13
  return (
    <div className="absolute inset-0 grid grid-cols-[54px_1fr] bg-[var(--site-black)] text-white">
      <div className="border-r border-white/10 bg-white/[.04]" />
      <div className="overflow-hidden p-[14px_18px] text-[10px]">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-base">{service.name} overview</h2>
          <div className="flex gap-1 rounded-[9px] bg-white/[.06] p-[3px]">{['7D', '30D', '90D'].map((day, index) => <i key={day} className={`rounded-[7px] px-2.5 py-[5px] not-italic text-[var(--site-white)] ${range === index ? 'bg-[linear-gradient(90deg,var(--scene-accent),var(--scene-accent-light))] font-bold text-white' : ''}`}>{day}</i>)}</div>
        </div>
        <div className="mb-2.5 grid grid-cols-3 gap-2.5">
          {[
            ['Revenue', `$${revenue.toFixed(1)}k`, '+12%'],
            ['Visitors', visitors.toLocaleString(), '+8%'],
            ['Speed score', String(speed), '+4'],
          ].map(([label, value, delta]) => <div key={label} className="rounded-[11px] border border-white/10 bg-white/[.04] p-2.5"><small className="text-[8px] uppercase tracking-[.1em] opacity-60">{label}</small><b className="mt-0.5 block text-lg">{value}<i className="ml-1 text-[9px] font-normal not-italic text-[var(--site-accent-bright)]">{delta}</i></b></div>)}
        </div>
        <div className="mb-2.5 grid grid-cols-[1.6fr_1fr] gap-2.5">
          <div className="relative h-[118px] rounded-[11px] border border-white/10 bg-white/[.04] p-2.5">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="h-full w-full">
              <defs><linearGradient id="service-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={service.accent} /><stop offset="1" stopColor={service.accent} stopOpacity="0" /></linearGradient></defs>
              <path d={`${line} L300 120 L0 120Z`} fill="url(#service-chart-fill)" opacity=".55" />
              <path d={line} fill="none" stroke={service.accentLight} strokeWidth="2.5" strokeDasharray="700" className="animate-[services-reference-chart-draw_1.6s_ease-out_both] motion-reduce:animate-none" />
            </svg>
            {activeChart && <><span className="absolute top-[26px] left-[60%] h-[9px] w-[9px] rounded-full bg-white shadow-[0_0_0_4px_var(--scene-accent),0_0_14px_var(--scene-accent-light)]" /><span className="absolute top-0 left-[60%] -translate-x-1/2 rounded-[7px] bg-white px-[9px] py-1 text-[9px] font-bold text-[var(--site-black)]">Nov 12 · $4,820</span></>}
          </div>
          <div className="flex h-[118px] items-end gap-1.5 rounded-[11px] border border-white/10 bg-white/[.04] p-2.5">
            {[60, 85, 45, 95, 70, 55, 88].map((height, index) => <i key={height} className="flex-1 rounded-t-[3px] bg-[linear-gradient(var(--scene-accent-light),var(--scene-accent))] animate-[services-bar-height_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none" style={{ '--bar-height': `${height}%`, animationDelay: `${index * 0.15}s`, height: `${height}%` }} />)}
          </div>
        </div>
        <div className="grid gap-1">
          {orderAdded && <div className="flex justify-between rounded-lg bg-[var(--site-accent-bright)]/10 px-2.5 py-[7px]"><span>#1043 · New order</span><b className="text-[var(--site-accent-bright)]">$212.00</b></div>}
          <div className="flex justify-between rounded-lg bg-white/[.04] px-2.5 py-[7px]"><span>#1042 · Sarah K.</span><b className="text-[var(--site-accent-bright)]">$128.00</b></div>
          <div className="flex justify-between rounded-lg bg-white/[.04] px-2.5 py-[7px]"><span>#1041 · Marcus T.</span><b className="text-[var(--site-accent-bright)]">$74.50</b></div>
        </div>
      </div>
      {orderAdded && <div className="absolute bottom-3 left-1/2 z-[25] -translate-x-1/2 rounded-full bg-[var(--site-black)] px-4 py-2 text-[11px] font-semibold text-white shadow-lg">New order received</div>}
    </div>
  )
}

function ScreenScene({ activeIndex, step, scale, screenRef }) {
  const service = showcaseServices[activeIndex]
  const sceneStep = service.scene === 'store' ? step % 16 : service.scene === 'site' ? step % 11 : service.scene === 'app' ? step % 12 : step % 15
  const cursorPoints = {
    store: [[560, 330], [220, 202], [220, 202], [430, 340], [430, 340], [430, 340], [430, 340], [578, 62], [520, 200], [520, 200], [520, 200], [380, 330], [390, 330], [550, 330], [550, 330], [560, 330]],
    site: [[560, 330], [320, 234], [320, 234], [310, 315], [310, 315], [310, 315], [310, 315], [310, 345], [510, 340], [520, 340], [560, 330]],
    app: [[560, 330], [188, 180], [188, 180], [425, 222], [425, 222], [425, 222], [520, 310], [520, 310], [525, 311], [525, 311], [560, 330], [560, 330]],
    dash: [[560, 330], [180, 95], [180, 95], [180, 95], [240, 95], [240, 95], [215, 210], [215, 210], [215, 210], [240, 95], [240, 95], [240, 95], [390, 345], [390, 345], [560, 330]],
  }
  const point = cursorPoints[service.scene][sceneStep]
  const clickAtStep = service.scene === 'store' ? [2, 4, 6, 8, 10, 14].includes(sceneStep) : service.scene === 'app' ? [2, 4, 6].includes(sceneStep) : service.scene === 'site' ? [2, 4, 8].includes(sceneStep) : [3, 5, 12].includes(sceneStep)

  return (
    <div
      ref={screenRef}
      className="relative h-full w-full overflow-hidden rounded-[6px] bg-[var(--site-black)]"
      style={{ '--screen-scale': scale }}
    >
      <div className="absolute left-0 top-0 overflow-hidden font-[inherit] text-white" style={{ width: 640, height: 400, transform: `scale(${scale})`, transformOrigin: 'top left', '--scene-accent': service.accent, '--scene-accent-light': service.accentLight }}>
        <BrowserChrome service={service} />
        <div className="absolute overflow-hidden bg-[var(--site-black)]" style={{ top: 34, right: 0, bottom: 0, left: 0 }}>
          {service.scene === 'store' && <StoreScene service={service} step={sceneStep} />}
          {service.scene === 'site' && <SiteScene service={service} step={sceneStep} />}
          {service.scene === 'app' && <AppScene step={sceneStep} />}
          {service.scene === 'dash' && <DashboardScene service={service} step={sceneStep} />}
        </div>
        <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,rgb(var(--site-white-rgb)/0.2),rgb(var(--site-white-rgb)/0.2)_26%,transparent_40%,transparent_72%,rgb(var(--site-white-rgb)/0.2))]" />
        <div
          className="pointer-events-none absolute left-0 top-0 z-[30] size-5 drop-shadow-[0_2px_3px_rgb(var(--site-black-rgb)/0.5)] transition-transform duration-[900ms] ease-[cubic-bezier(.45,.05,.25,1)]"
          style={{ transform: `translate(${point[0]}px,${point[1]}px)` }}
        >
              <svg viewBox="0 0 22 22" className={`size-5 motion-reduce:animate-none ${clickAtStep ? 'animate-[services-cursor-click_.6s_ease-in-out_infinite]' : ''}`}>
            <path d="M3 2l14 8-6 2-3 6z" fill="var(--site-white)" stroke="var(--site-black)" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>
        {clickAtStep && <span className="pointer-events-none absolute z-[29] size-2.5 animate-[services-ripple_.6s_ease-out_infinite] rounded-full border-2 border-[var(--scene-accent-light)] motion-reduce:animate-none" style={{ left: point[0], top: point[1] }} />}
      </div>
    </div>
  )
}

export default function ServicesShowcase({ activeIndex = 0 }) {
  const [sceneProgress, setSceneProgress] = useState({ activeIndex, step: 0 })
  const [scale, setScale] = useState(0.6)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const showcaseRef = useRef(null)
  const screenRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const previewService = showcaseServices[activeIndex]
  const step = sceneProgress.activeIndex === activeIndex ? sceneProgress.step : 0
  const capabilityIndex = activeIndex === 0 ? 0 : activeIndex === 1 ? 1 : 2

  useEffect(() => {
    const screen = screenRef.current
    if (!screen) return undefined

    const measure = () => setScale(screen.clientWidth / 640)
    return trackElementSize(screen, measure)
  }, [])

  useEffect(() => {
    const element = showcaseRef.current
    if (!element) return undefined
    return trackViewport(element, setIsVisible, { threshold: 0.15 })
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const sceneLength = previewService.scene === 'store' ? 16 : previewService.scene === 'site' ? 11 : previewService.scene === 'app' ? 12 : 15
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || !isVisible) return
      setSceneProgress((current) => {
        const currentStep = current.activeIndex === activeIndex ? current.step : 0
        return { activeIndex, step: (currentStep + 1) % sceneLength }
      })
    }, 1200)
    return () => window.clearInterval(timer)
  }, [activeIndex, isVisible, previewService.scene, reducedMotion])

  const handlePointerMove = (event) => {
    if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setTilt({ x: x * 14, y: -y * 10 })
  }

  return (
    <>
      <div
        ref={showcaseRef}
        role="group"
        aria-label={servicesPageCopy.showcaseLabel}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className="services-showcase-motion relative isolate grid min-h-[520px] w-full place-items-center overflow-hidden rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(var(--site-accent-rgb)/0.2),transparent_70%),linear-gradient(165deg,rgb(var(--site-black-rgb)/0.95),rgb(var(--site-black-rgb)/0.98))] shadow-[0_30px_80px_-40px_rgb(var(--site-accent-rgb)/0.2)] before:pointer-events-none before:absolute before:inset-0 before:opacity-25 before:[background-image:linear-gradient(rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px)] before:[background-size:34px_34px] before:[mask-image:radial-gradient(55%_55%_at_50%_50%,var(--site-black),var(--site-transparent))] max-[960px]:min-h-[480px] max-[600px]:min-h-[430px]"
      >
        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 animate-[services-orbit_28s_linear_infinite_reverse] rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] before:absolute before:top-[-4px] before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[var(--site-accent)] before:shadow-[0_0_14px_var(--site-accent)] before:content-[''] motion-reduce:animate-none max-[600px]:size-[250px]" />
        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-[470px] -translate-x-1/2 -translate-y-1/2 animate-[services-orbit_60s_linear_infinite] rounded-full border border-dashed border-[rgb(var(--site-accent-rgb)/0.2)] before:absolute before:top-[-4px] before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[var(--site-accent)] before:shadow-[0_0_14px_var(--site-accent)] before:content-[''] motion-reduce:animate-none max-[600px]:size-[380px]" />

        <div
          className="relative z-[3] w-[min(440px,82%)] max-w-none [perspective:900px] [filter:drop-shadow(0_40px_40px_rgb(var(--site-black-rgb)/0.7))_drop-shadow(0_0_40px_rgb(var(--site-accent-rgb)/0.2))] max-[600px]:w-[86%]"
          style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`, transition: 'transform .25s' }}
        >
          <div className="relative rounded-t-2xl rounded-b-[4px] border border-[var(--site-black)] bg-[linear-gradient(160deg,var(--site-black),var(--site-black)_42%,var(--site-black))] shadow-[inset_0_0_0_1px_var(--site-black),inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] before:absolute before:top-[3px] before:left-1/2 before:h-[5px] before:w-[5px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_35%_35%,var(--site-accent-bright),var(--site-black))] before:content-['']" style={{ aspectRatio: '16 / 10.2', padding: '10px 10px 12px' }}>
            <div className="absolute z-[6] flex items-center gap-1.5 rounded-full border border-white/15 bg-[var(--site-black)]/70 px-[9px] py-[3px] font-mono text-[.52rem] font-semibold tracking-[.12em] text-white backdrop-blur-md" style={{ top: 8, right: 8 }}>
              <i className="size-1.5 animate-pulse rounded-full bg-[var(--site-accent)] motion-reduce:animate-none" />LIVE PREVIEW
            </div>
            <ScreenScene activeIndex={activeIndex} step={step} scale={scale} screenRef={screenRef} />
          </div>
          <LaptopKeyboard />
          <div aria-hidden="true" className="-mx-[6%] h-[7px] rounded-b-[18px] bg-[linear-gradient(var(--site-black),var(--site-black))] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)]" />
          <div aria-hidden="true" className="absolute -bottom-[22px] left-[8%] right-[8%] -z-10 h-[22px] bg-[radial-gradient(50%_100%_at_50%_0,rgb(var(--site-accent-rgb)/0.2),var(--site-transparent))] blur-md" />
        </div>

        {capabilities.map(([label, detail, icon], index) => {
          const position = index === 0 ? { top: 18, right: 18 } : index === 1 ? { bottom: 22, left: 18 } : { bottom: 22, right: 18 }
          const active = index === capabilityIndex
          return (
            <div key={label} className={`absolute z-[5] flex animate-[services-float_6s_ease-in-out_infinite] items-center gap-2.5 rounded-[14px] border px-3.5 py-2.5 backdrop-blur-[10px] transition-all duration-300 motion-reduce:animate-none max-[600px]:px-2.5 max-[600px]:py-[7px] ${active ? 'scale-[1.07] border-[var(--site-accent)] bg-[rgb(var(--site-black-rgb)/0.88)] shadow-[0_0_28px_-4px_var(--site-accent)]' : 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-black-rgb)/0.88)]'}`} style={{ ...position, animationDelay: `${index * -2}s` }}>
              <span className={`grid size-[30px] shrink-0 place-items-center rounded-[9px] border text-[.8rem] max-[600px]:hidden ${active ? 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[var(--site-accent)]' : 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[var(--site-accent)]'}`}>{icon}</span>
              <span><b className="block text-[.76rem] text-white">{label}</b><small className="text-[.64rem] text-[var(--site-accent)]">{detail}</small></span>
            </div>
          )
        })}
      </div>
    </>
  )
}

