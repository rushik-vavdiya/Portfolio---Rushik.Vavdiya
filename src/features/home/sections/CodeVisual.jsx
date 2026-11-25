import { useEffect, useState } from 'react'
import { portfolioCode } from '../data/code-snippets.js'
import { site } from '../../../data/siteConfig.js'

const syntaxPattern = /(\/\/[^\n]*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b(?:import|from|const|let|var|export|default|return|true|false|null|new|function)\b|\b(?:React|Portfolio)\b|\b(?:className)\b)/g
const keywords = new Set(['import', 'from', 'const', 'let', 'var', 'export', 'default', 'return', 'new', 'function'])
const booleans = new Set(['true', 'false', 'null'])
const buildCode = `import React from 'react';
import { useState } from 'react';

export default function Storefront() {
  const [cart, setCart] = useState(0);

  return (
    <button onClick={() => setCart(cart + 1)}>
      Add to cart ({cart})
    </button>
  );
}`

function highlightCode(code) {
  return code.split(syntaxPattern).filter(Boolean).map((token, index) => {
    let className = ''

    if (token.startsWith('//')) className = 'text-[var(--site-syntax-comment)]'
    else if (token.startsWith("'") || token.startsWith('"')) className = 'text-[var(--site-syntax-string)]'
    else if (keywords.has(token)) className = 'text-[var(--site-syntax-keyword)]'
    else if (booleans.has(token)) className = 'text-[var(--site-syntax-boolean)]'
    else if (/^(React|Portfolio)$/.test(token)) className = 'text-[var(--site-syntax-type)]'
    else if (token === 'className') className = 'text-[var(--site-syntax-property)]'

    return className ? <span className={className} key={index}>{token}</span> : token
  })
}

export default function CodeVisual({ variant = 'default' }) {
  const [typedCode, setTypedCode] = useState('')
  const codeSample = variant === 'build' ? buildCode : portfolioCode

  useEffect(() => {
    let position = 0
    let timer
    let active = true

    const typeNextCharacter = () => {
      if (!active) return
      position += 1
      setTypedCode(codeSample.slice(0, position))

      if (position < codeSample.length) {
        timer = window.setTimeout(typeNextCharacter, variant === 'build' ? 42 : 24)
      } else {
        timer = window.setTimeout(() => {
          position = 0
          setTypedCode('')
          timer = window.setTimeout(typeNextCharacter, 350)
        }, 1800)
      }
    }

    timer = window.setTimeout(typeNextCharacter, 500)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [codeSample, variant])

  if (variant === 'build') {
    return (
      <div data-about-visual className="relative mx-auto grid min-h-[390px] w-full flex-1 place-items-center px-1 py-3 sm:min-h-[440px] max-[800px]:min-h-[390px] max-[600px]:min-h-[300px]">
        <div className="absolute inset-[10%] rounded-full bg-[rgb(var(--site-accent-rgb)/0.2)] opacity-60 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-[440px] -rotate-2 overflow-hidden rounded-2xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[var(--site-black)] shadow-[0_30px_70px_-20px_var(--site-black),0_0_50px_-12px_rgb(var(--site-accent-rgb)/0.2)] transition-transform duration-300 hover:rotate-0">
          <div className="flex items-center gap-1.5 border-b border-white/[.06] bg-white/[.03] px-3.5 py-[11px]">
            <span className="size-2.5 rounded-full bg-[var(--site-accent)]" /><span className="size-2.5 rounded-full bg-[var(--site-accent)]" /><span className="size-2.5 rounded-full bg-[var(--site-accent)]" />
            <span className="ml-2 font-mono text-[.68rem] text-[var(--site-white)]">shopify-site.jsx</span>
          </div>
          <div className="grid h-[300px] grid-cols-[2ch_1fr] gap-x-3 overflow-hidden px-3.5 py-4 font-mono text-[.76rem] leading-[1.75] text-[var(--site-white)] sm:px-5 max-[600px]:h-[270px] max-[600px]:text-[.66rem]">
            <pre aria-hidden="true" className="m-0 select-none pt-0.5 text-right text-[var(--site-black)]">{codeSample.split('\n').map((_, index) => String(index + 1).padStart(2, '0')).join('\n')}</pre>
            <pre aria-label="Live typing code sample" className="m-0 min-w-0 whitespace-pre-wrap break-words text-[var(--site-white)]"><code>{highlightCode(typedCode)}</code><span className="ml-px inline-block h-[1em] w-[7px] animate-[about-code-caret-blink_900ms_steps(2,start)_infinite] bg-[var(--site-accent)] align-[-2px] shadow-[0_0_10px_var(--site-accent)] motion-reduce:animate-none" aria-hidden="true" /></pre>
          </div>
          <div className="flex items-center justify-between border-t border-white/[.06] px-3.5 py-[9px] font-mono text-[.62rem] text-[var(--site-accent)]"><span>UTF-8&nbsp;&nbsp; JavaScript JSX</span><span className="flex items-center gap-1.5 text-[var(--site-white)]"><i className="size-1.5 rounded-full bg-[var(--site-accent-bright)]" />Typing</span></div>
        </div>
        <div className="absolute right-[26px] bottom-[26px] z-20 flex animate-[build-float_5s_ease-in-out_infinite] items-center gap-3 rounded-[14px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-black-rgb)/0.85)] px-4 py-3 shadow-xl backdrop-blur-lg max-[600px]:right-3 max-[600px]:bottom-3 max-[420px]:scale-90 max-[420px]:origin-bottom-right">
          <span className="grid size-[34px] place-items-center rounded-[10px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] font-mono text-[.8rem] font-semibold text-[var(--site-accent)]">&lt;/&gt;</span>
          <span><b className="block text-[.84rem] font-semibold text-white">Custom websites</b><small className="block text-[.72rem] text-[var(--site-accent)]">For growing businesses</small></span>
        </div>
      </div>
    )
  }

  return (
    <div data-about-visual className="relative mx-auto flex min-h-[300px] w-full max-w-[520px] items-center justify-center sm:min-h-[380px] lg:min-h-[450px]">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full opacity-30 blur-3xl" style={{ background: 'none' }} />
      <div className="relative z-10 w-[88%] max-w-[430px] -rotate-2 overflow-hidden rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-code-surface)] shadow-[0_30px_100px_var(--site-shadow)] transition-transform duration-500 hover:rotate-0">
        <div className="flex h-9 items-center justify-between border-b border-[var(--site-border-quiet)] px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[var(--site-status-red)]" />
            <span className="size-2.5 rounded-full bg-[var(--site-status-yellow)]" />
            <span className="size-2.5 rounded-full bg-[var(--site-status-green)]" />
          </div>
          <span className="text-[var(--site-text-code)] text-[10px] tracking-wide">{site.aboutPage.codeFile}</span>
          <span className="w-8" />
        </div>
        <div className="about-live-editor grid grid-cols-[2ch_1fr] gap-x-4 px-4 py-4 font-mono text-[10px] leading-[1.8] sm:px-6 sm:py-5 sm:text-xs">
          <pre aria-hidden="true" className="text-[var(--site-text-faint)] m-0 select-none text-right">{portfolioCode.split('\n').map((_, index) => String(index + 1).padStart(2, '0')).join('\n')}</pre>
          <pre aria-label="Live typing code sample" className="m-0 min-h-[12.5em] min-w-0 whitespace-pre-wrap break-words text-[var(--site-code-foreground)]"><code>{highlightCode(typedCode)}</code><span className="inline-block h-[1em] w-[.5em] animate-[about-code-caret-blink_850ms_steps(2,start)_infinite] bg-[var(--site-accent-light)] align-text-bottom motion-reduce:animate-none" aria-hidden="true" /></pre>
        </div>
        <div className="text-[var(--site-text-code)] flex items-center justify-between border-t border-[var(--site-border-quiet)] px-4 py-1.5 text-[8px] sm:px-6">
          <span>UTF-8&nbsp;&nbsp; JavaScript JSX</span>
          <span className="flex items-center gap-1.5"><i className="size-1.5 rounded-full bg-[var(--site-status-green)]" /> Ready to build</span>
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[2%] z-20 flex items-center gap-3 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-panel-surface)] px-4 py-3 shadow-xl backdrop-blur-xl sm:right-[3%]">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--site-accent)_15%,var(--site-transparent))] text-[var(--site-accent-light)]">
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>
        </span>
        <span><span className="block text-xs font-semibold text-[var(--site-text)]">{site.aboutPage.codePanelTitle}</span><span className="text-[var(--site-text-code)] mt-0.5 block text-[10px]">{site.aboutPage.codePanelSubtitle}</span></span>
      </div>
    </div>
  )
}
