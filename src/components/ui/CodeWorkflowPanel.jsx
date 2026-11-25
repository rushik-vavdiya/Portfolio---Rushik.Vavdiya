import { useEffect, useMemo, useRef, useState } from 'react'
import { stages as processStages } from '../../features/process/data/process.js'
import { trackViewport } from '../../utils/viewport.js'
import Button from './Button.jsx'

const stages = processStages.map((stage) => ({ ...stage, detail: stage.description }))

const progressWidths = ['w-[0%]', 'w-[1%]', 'w-[2%]', 'w-[3%]', 'w-[4%]', 'w-[5%]', 'w-[6%]', 'w-[7%]', 'w-[8%]', 'w-[9%]', 'w-[10%]', 'w-[11%]', 'w-[12%]', 'w-[13%]', 'w-[14%]', 'w-[15%]', 'w-[16%]', 'w-[17%]', 'w-[18%]', 'w-[19%]', 'w-[20%]', 'w-[21%]', 'w-[22%]', 'w-[23%]', 'w-[24%]', 'w-[25%]', 'w-[26%]', 'w-[27%]', 'w-[28%]', 'w-[29%]', 'w-[30%]', 'w-[31%]', 'w-[32%]', 'w-[33%]', 'w-[34%]', 'w-[35%]', 'w-[36%]', 'w-[37%]', 'w-[38%]', 'w-[39%]', 'w-[40%]', 'w-[41%]', 'w-[42%]', 'w-[43%]', 'w-[44%]', 'w-[45%]', 'w-[46%]', 'w-[47%]', 'w-[48%]', 'w-[49%]', 'w-[50%]', 'w-[51%]', 'w-[52%]', 'w-[53%]', 'w-[54%]', 'w-[55%]', 'w-[56%]', 'w-[57%]', 'w-[58%]', 'w-[59%]', 'w-[60%]', 'w-[61%]', 'w-[62%]', 'w-[63%]', 'w-[64%]', 'w-[65%]', 'w-[66%]', 'w-[67%]', 'w-[68%]', 'w-[69%]', 'w-[70%]', 'w-[71%]', 'w-[72%]', 'w-[73%]', 'w-[74%]', 'w-[75%]', 'w-[76%]', 'w-[77%]', 'w-[78%]', 'w-[79%]', 'w-[80%]', 'w-[81%]', 'w-[82%]', 'w-[83%]', 'w-[84%]', 'w-[85%]', 'w-[86%]', 'w-[87%]', 'w-[88%]', 'w-[89%]', 'w-[90%]', 'w-[91%]', 'w-[92%]', 'w-[93%]', 'w-[94%]', 'w-[95%]', 'w-[96%]', 'w-[97%]', 'w-[98%]', 'w-[99%]', 'w-[100%]']
const fallbackBuildStages = [
  ['Discuss', 'We talk about your goals, store or site, and budget.', 'brief received'],
  ['Plan and design', 'I plan the structure and design the pages.', 'wireframes approved'],
  ['Build', 'I build the site or store with clean, fast code.', 'components built'],
  ['Test', 'I check speed, mobile layout, and every feature.', 'lighthouse 98 / mobile 100'],
  ['Launch and support', 'We go live, and I stay available for fixes.', 'deployed to production'],
]

function BuildScene({ index }) {
  return (
    <div className="flex flex-col justify-center gap-3" aria-hidden="true">
      {index === 0 && <div className="grid gap-[9px]">
        <p className="m-0 max-w-[78%] translate-y-2.5 opacity-0 animate-[build-scene-in_.5s_.1s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 rounded-[14px] rounded-bl-[4px] bg-white/[.14] px-[13px] py-[9px] text-[.78rem] leading-[1.4]">Hi! I need a fast online store for my brand.</p>
        <p className="m-0 ml-auto max-w-[78%] translate-y-2.5 opacity-0 animate-[build-scene-in_.5s_.7s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 rounded-[14px] rounded-br-[4px] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] px-[13px] py-[9px] text-[.78rem] leading-[1.4]">Love it. What’s your budget and launch date?</p>
        <p className="m-0 max-w-[78%] translate-y-2.5 opacity-0 animate-[build-scene-in_.5s_1.4s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 rounded-[14px] rounded-bl-[4px] bg-white/[.14] px-[13px] py-[9px] text-[.78rem] leading-[1.4]">Around my budget, live in 4 weeks.</p>
        <p className="m-0 ml-auto flex translate-y-2.5 gap-1 rounded-[14px] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] px-3 py-2 opacity-0 animate-[build-scene-in_.5s_2.1s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100">{[0, 1, 2].map((dot) => <i key={dot} className="size-1.5 animate-bounce rounded-full bg-white motion-reduce:animate-none" />)}</p>
      </div>}
      {index === 1 && <div className="flex flex-col justify-center gap-3">
        <div className="grid grid-cols-3 grid-rows-[20px_70px_46px] gap-2">{['col-span-3', 'col-span-3', 'col-span-1', 'col-span-1', 'col-span-1'].map((span, i) => <span key={i} className={`${span} translate-y-2.5 opacity-0 animate-[build-scene-in_.5s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 rounded-lg border border-dashed border-white/45 bg-white/[.08] ${i === 1 ? '[animation-delay:300ms]' : i === 2 ? '[animation-delay:600ms]' : i === 3 ? '[animation-delay:800ms]' : ''}`} />)}</div>
        <div className="flex justify-center gap-2">{['var(--site-accent)', 'var(--site-accent)', 'var(--site-accent)', 'var(--site-accent)'].map((color, index) => <i key={color} className={`size-[22px] translate-y-2.5 rounded-full border-2 border-white opacity-0 animate-[build-scene-in_.4s_both] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${index === 0 ? '[animation-delay:1.3s]' : index === 1 ? '[animation-delay:1.5s]' : index === 2 ? '[animation-delay:1.7s]' : '[animation-delay:1.9s]'} ${color === 'var(--site-accent)' ? 'bg-[var(--site-accent)]' : color === 'var(--site-accent)' ? 'bg-[var(--site-accent)]' : color === 'var(--site-accent)' ? 'bg-[var(--site-accent)]' : 'bg-[var(--site-accent)]'}`} />)}</div>
      </div>}
      {index === 2 && <div className="grid gap-[7px] rounded-xl border border-white/[.12] bg-[var(--site-black)] p-3">{['w-[40%]', 'w-[85%]', 'w-[60%]', 'w-[92%]', 'w-1/2'].map((width, i) => <span key={i} className={`h-1.5 origin-left [transform:scaleX(0)] animate-[build-code-line_1s_both] motion-reduce:animate-none motion-reduce:[transform:scaleX(1)] rounded-[3px] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] ${width} ${i === 1 ? '[animation-delay:250ms]' : i === 2 ? '[animation-delay:500ms]' : i === 3 ? '[animation-delay:750ms]' : i === 4 ? '[animation-delay:1000ms]' : ''}`} />)}</div>}
      {index === 3 && <div className="flex justify-around">
        {['98', '100', '96'].map((score, i) => <div key={score} className="relative grid size-[78px] place-items-center text-center"><svg aria-hidden="true" className="absolute inset-0 size-full -rotate-90" viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="rgb(var(--site-white-rgb)/0.2)" strokeWidth="5" /><circle className="animate-[build-audit-ring_1.4s_.2s_cubic-bezier(.2,.8,.2,1)_forwards] motion-reduce:animate-none motion-reduce:[stroke-dashoffset:var(--o)]" cx="27" cy="27" r="22" fill="none" stroke="var(--site-white)" strokeLinecap="round" strokeWidth="5" strokeDasharray="138" strokeDashoffset="138" style={{ '--o': [3, 0, 6][i] }} /></svg><b className="text-lg">{score}</b><span className="absolute -bottom-6 text-[.7rem] text-[var(--site-white)]">{['Speed', 'Mobile', 'Access'][i]}</span></div>)}
      </div>}
      {index === 4 && <div className="grid gap-[14px]">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/[.15] bg-[var(--site-black)] px-3.5 py-[11px] font-mono text-[.82rem]"><i className="size-[9px] animate-ping rounded-full bg-[var(--site-accent-bright)]" />yourbrand.com<span className="ml-auto rounded-full bg-[var(--site-accent-bright)]/15 px-2 py-0.5 text-[.62rem] tracking-[.14em] text-[var(--site-accent-bright)] uppercase">Live</span></div>
        <div className="h-[7px] overflow-hidden rounded bg-white/15"><span className="block h-full w-0 rounded bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] animate-[build-launch-progress_1.6s_forwards] motion-reduce:animate-none motion-reduce:w-full" /></div>
        <div className="flex flex-wrap justify-center gap-2">{['Deployed', 'SSL secured', 'Support active'].map((label, index) => <span key={label} className={`translate-y-2.5 rounded-full border border-white/30 bg-white/[.08] px-[11px] py-[5px] text-[.72rem] opacity-0 animate-[build-scene-in_.4s_forwards] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${index === 0 ? '[animation-delay:1.7s]' : index === 1 ? '[animation-delay:2s]' : '[animation-delay:2.3s]'}`}>{label}</span>)}</div>
      </div>}
    </div>
  )
}

export default function CodeWorkflowPanel({ variant = 'default', steps = [] }) {
  const reduceMotionPreference = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const buildStages = useMemo(
    () => steps?.length
      ? steps.map((step) => [step.title, step.description, step.deliverable || 'stage complete'])
      : fallbackBuildStages,
    [steps],
  )
  const showCompletedBuild = variant === 'build' && reduceMotionPreference
  const [progress, setProgress] = useState(showCompletedBuild ? 100 : 0)
  const [buildStageIndex, setBuildStageIndex] = useState(showCompletedBuild ? buildStages.length - 1 : 0)
  const [buildComplete, setBuildComplete] = useState(showCompletedBuild)
  const [buildLog, setBuildLog] = useState(showCompletedBuild ? buildStages.slice(-3).map((stage) => stage[2]) : [])
  const buildPanelRef = useRef(null)
  const buildProgressRef = useRef(0)
  const buildGenerationRef = useRef(0)
  const startBuildFromRef = useRef(() => {})
  const isBuildVariant = variant === 'build'
  const isComplete = isBuildVariant ? buildComplete : progress >= 100
  const activeIndex = isBuildVariant ? buildStageIndex : Math.min(stages.length - 1, Math.floor(progress / (100 / stages.length)))
  const completedCount = isComplete ? stages.length : activeIndex
  const activeStage = isComplete ? { title: 'Complete' } : stages[activeIndex]
  const nextStage = isComplete || activeIndex === stages.length - 1 ? null : stages[activeIndex + 1]

  useEffect(() => {
    if (variant === 'build') {
      const reducedMotion = reduceMotionPreference
      const panel = buildPanelRef.current
      let visible = true
      let mounted = true
      const stopTracking = trackViewport(panel, (isVisible) => { visible = isVisible }, { threshold: 0.1 })

      const pause = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds))
      const waitWhileHidden = async (duration, generation) => {
        await pause(duration)
        while (mounted && generation === buildGenerationRef.current && (!visible || document.hidden)) await pause(250)
      }
      const tweenProgress = (target, duration, generation) => new Promise((resolve) => {
        const from = buildProgressRef.current
        let startTime
        const frame = (now) => {
          if (!mounted || generation !== buildGenerationRef.current) return resolve()
          if (startTime === undefined) startTime = now
          const amount = Math.min(1, (now - startTime) / duration)
          const eased = 1 - (1 - amount) ** 2
          const next = from + (target - from) * eased
          buildProgressRef.current = next
          setProgress(next)
          if (amount < 1) window.requestAnimationFrame(frame)
          else resolve()
        }
        window.requestAnimationFrame(frame)
      })

      const runFrom = async (from, generation) => {
        setBuildComplete(false)
        setBuildStageIndex(from)
        const prior = buildStages.slice(Math.max(0, from - 2), from).map((stage) => stage[2])
        setBuildLog(prior)
        const initialProgress = from * 20
        buildProgressRef.current = initialProgress
        setProgress(initialProgress)

        for (let index = from; index < buildStages.length; index += 1) {
          if (!mounted || generation !== buildGenerationRef.current) return
          setBuildStageIndex(index)
          await tweenProgress(((index + 0.85) / buildStages.length) * 100, 3000, generation)
          if (!mounted || generation !== buildGenerationRef.current) return
          await waitWhileHidden(200, generation)
          if (!mounted || generation !== buildGenerationRef.current) return
          setBuildLog((current) => [...current, buildStages[index][2]].slice(-3))
          await tweenProgress(((index + 1) / buildStages.length) * 100, 300, generation)
        }

        if (!mounted || generation !== buildGenerationRef.current) return
        buildProgressRef.current = 100
        setProgress(100)
        setBuildComplete(true)
        setBuildStageIndex(buildStages.length - 1)
        await waitWhileHidden(4200, generation)
        if (mounted && generation === buildGenerationRef.current) runFrom(0, generation)
      }

      startBuildFromRef.current = (index) => {
        buildGenerationRef.current += 1
        runFrom(index, buildGenerationRef.current)
      }

      if (reducedMotion) {
        buildProgressRef.current = 100
      } else {
        buildGenerationRef.current += 1
        runFrom(0, buildGenerationRef.current)
      }

      return () => {
        mounted = false
        buildGenerationRef.current += 1
        stopTracking()
        startBuildFromRef.current = () => {}
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cycleDuration = 30000
    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) % cycleDuration
      setProgress(Math.min(100, (elapsed / 24000) * 100))
    }, 100)

    return () => window.clearInterval(timer)
  }, [buildStages, reduceMotionPreference, variant])

  if (variant === 'build') {
    const selectedIndex = isComplete ? buildStages.length - 1 : activeIndex
    const selectedStage = buildStages[selectedIndex]
    const progressWidth = progressWidths[Math.min(100, Math.round(progress))]

    return (
      <div ref={buildPanelRef} role="group" aria-label="Project delivery stages" className="flex flex-1 flex-col gap-4 p-5">
          <div className="relative h-[230px] shrink-0 overflow-hidden rounded-[20px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(170deg,var(--site-accent),var(--site-black)_55%,var(--site-black))] shadow-[0_0_60px_-22px_rgb(var(--site-accent-rgb)/0.2)] max-[600px]:h-[250px]">
            {buildStages.map((stage, index) => {
              const active = index === selectedIndex
              return <div key={stage[0]} className={`absolute inset-0 flex flex-col justify-center gap-3 p-[18px] transition-opacity duration-[400ms] ${active ? 'visible opacity-100' : 'invisible opacity-0'}`} aria-hidden={!active}>{active && <BuildScene index={index} />}</div>
            })}
          </div>

          <div className="min-h-[86px]"><small className="font-mono text-[.62rem] tracking-[.16em] text-[var(--site-accent)]">{isComplete ? 'ALL STAGES COMPLETE' : `STAGE ${String(selectedIndex + 1).padStart(2, '0')} / ${String(buildStages.length).padStart(2, '0')}`}</small><b className="my-1 block text-xl font-semibold text-white">{selectedStage[0]}</b><p className="m-0 text-sm leading-[1.55] text-[var(--site-white)]">{selectedStage[1]}</p></div>

          <div className="flex items-start">
            {buildStages.map((stage, index) => {
              const complete = isComplete || index < activeIndex
              const active = !isComplete && index === activeIndex
              return <Button asButton unstyled type="button" key={stage[0]} aria-label={stage[0]} aria-current={active ? 'step' : undefined} onClick={() => startBuildFromRef.current(index)} className={`relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-0 text-center font-[inherit] text-[.7rem] outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] max-[600px]:text-[.58rem] ${active ? 'text-white' : complete ? 'text-[var(--site-white)]' : 'text-[var(--site-accent)]'}`}>
                {index > 0 && <span className={`absolute top-[15px] right-1/2 h-0.5 w-full ${complete || active ? 'bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] shadow-[0_0_8px_var(--site-accent)]' : 'bg-white/10'}`} />}
                <span className={`relative z-[1] grid size-8 place-items-center rounded-full border-[1.5px] font-mono text-[.68rem] transition-all ${complete ? 'border-transparent bg-[linear-gradient(135deg,var(--site-accent),var(--site-accent))] text-white shadow-[0_0_14px_rgb(var(--site-accent-rgb)/0.2)]' : active ? 'animate-[build-progress-pulse_1.6s_infinite] border-[var(--site-accent)] bg-[var(--site-black)] text-white shadow-[0_0_0_5px_rgb(var(--site-accent-rgb)/0.2),0_0_18px_var(--site-accent)]' : 'border-white/20 bg-[var(--site-black)] text-[var(--site-accent)]'}`}>
                  {complete ? <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[15px] overflow-visible"><path d="m3.1 8.2 3.1 3.1 6.7-6.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : `0${index + 1}`}
                </span>
                <span className="max-w-full truncate">{stage[0].split(' ')[0]}</span>
              </Button>
            })}
          </div>

          <div className="my-[7px] flex items-center gap-3">
            <div role="progressbar" aria-label="Project delivery progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)} className="h-1.5 flex-1 overflow-hidden rounded bg-white/10"><span className={`block h-full rounded bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] shadow-[0_0_12px_var(--site-accent)] transition-[width] duration-100 ease-linear ${progressWidth}`} /></div>
            <b className="min-w-[42px] text-right font-mono text-[.82rem] font-semibold text-[var(--site-accent)]">{Math.round(progress)}%</b>
          </div>

          <div aria-live="polite" className="grid min-h-[78px] content-center gap-1 rounded-xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[var(--site-black)] px-3.5 py-[11px] font-mono text-[.7rem] leading-[1.7] text-[var(--site-accent)]">
            {buildLog.map((entry) => <div key={entry}><span className="text-[var(--site-white)]">✓</span> {entry}</div>)}
          </div>
      </div>
    )
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[420px] overflow-hidden rounded-[20px] border border-[color-mix(in_srgb,var(--site-accent)_42%,var(--site-border-soft))] bg-[linear-gradient(145deg,var(--site-accent),var(--site-black)_66%)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--site-accent-light)_17%,var(--site-transparent)),0_18px_54px_color-mix(in_srgb,var(--site-accent)_17%,var(--site-transparent))] before:absolute before:left-[10%] before:right-[10%] before:top-0 before:h-px before:bg-[linear-gradient(90deg,var(--site-transparent),var(--site-accent-light),var(--site-transparent))] before:content-[''] before:opacity-70" aria-label="Illustrative project workflow">
      <div className="flex h-11 items-center gap-[12px] border-b border-[var(--site-border-quiet)] bg-[color-mix(in_srgb,var(--site-glass)_65%,var(--site-transparent))] px-[14px]">
        <span className="flex gap-[5px]" aria-hidden="true"><i className="size-[7px] rounded-full bg-[var(--site-accent)] opacity-[.75]" /><i className="size-[7px] rounded-full bg-[var(--site-accent-light)] opacity-[.7]" /><i className="size-[7px] rounded-full bg-[var(--site-text-subtle)] opacity-[.55]" /></span>
        <span className="font-mono text-[10px] leading-none font-[500] text-[var(--site-text-soft)]">project <span className="px-[3px] text-[var(--site-text-faint)]">/</span> delivery</span>
        <span className="ml-auto inline-flex items-center gap-[5px] font-mono text-[8px] leading-none font-[700] tracking-[.08em] text-[var(--site-accent-light)]"><i className="size-[5px] rounded-full bg-[var(--site-accent-light)] shadow-[0_0_8px_var(--site-accent-glow)]" /> {isComplete ? 'COMPLETE' : activeStage.title.toUpperCase()}</span>
      </div>
      <div className="grid gap-[15px] p-[16px]">
        <div className="flex items-center justify-between gap-[12px]">
          <div className="flex flex-col gap-1"><span className="font-mono text-[8px] leading-none font-[600] tracking-[.13em] text-[var(--site-text-subtle)]">PROJECT WORKFLOW</span><strong className="text-[12px] font-[650] text-[var(--site-text)]">From brief to launch</strong></div>
          <span className="rounded-full border border-[var(--site-border-quiet)] px-[7px] py-[5px] font-mono text-[7px] leading-none font-[600] tracking-[.08em] text-[var(--site-text-subtle)]">ILLUSTRATION</span>
        </div>
        <div className="flex min-h-[120px] overflow-hidden rounded-[12px] border border-[var(--site-border-quiet)] bg-[var(--site-black)]" aria-hidden="true">
          <div className="flex w-[38px] shrink-0 flex-col gap-[11px] border-r border-[var(--site-border-quiet)] px-[12px] py-[14px]"><i className="h-1 w-[12px] rounded-[4px] bg-[color-mix(in_srgb,var(--site-accent-light)_58%,var(--site-transparent))] opacity-[.55]" /><i className="h-1 w-2 rounded-[4px] bg-[color-mix(in_srgb,var(--site-accent-light)_58%,var(--site-transparent))] opacity-[.3]" /><i className="h-1 w-[12px] rounded-[4px] bg-[color-mix(in_srgb,var(--site-accent-light)_58%,var(--site-transparent))] opacity-[.55]" /><i className="h-1 w-2 rounded-[4px] bg-[color-mix(in_srgb,var(--site-accent-light)_58%,var(--site-transparent))] opacity-[.3]" /><i className="h-1 w-[12px] rounded-[4px] bg-[color-mix(in_srgb,var(--site-accent-light)_58%,var(--site-transparent))] opacity-[.55]" /></div>
          <div className="relative flex flex-1 flex-col justify-center gap-[9px] px-[18px] py-[14px]">
            {[
              'w-[32%]', 'w-[78%]', 'w-[56%]', 'w-[78%]', 'w-[32%]', 'w-[56%]', 'w-[78%]', 'w-[32%]'
            ].map((width, index) => <span key={index} className={`block h-[5px] overflow-hidden rounded-[5px] bg-[color-mix(in_srgb,var(--site-accent)_18%,var(--site-accent))] ${width}`}><i className="block h-full origin-left rounded-[inherit] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--site-accent)_76%,var(--site-accent)),var(--site-accent-light))] opacity-[.8] animate-[code-line-type_5.6s_cubic-bezier(.45,0,.25,1)_infinite] motion-reduce:animate-none" style={{ width: `${[54,92,68,82,42,74,90,48][index]}%`, animationDelay: `${index * .16}s` }} /></span>)}
            <span className="absolute bottom-[12px] left-[19px] h-[9px] w-[2px] bg-[var(--site-accent-light)] shadow-[0_0_8px_var(--site-accent-glow-strong)] animate-[code-caret-type_5.6s_steps(2,start)_infinite] motion-reduce:animate-none" />
          </div>
        </div>
        <div className="grid gap-2">
          {stages.map((stage, index) => {
            const state = index < completedCount ? 'complete' : index === activeIndex && !isComplete ? 'active' : 'upcoming'
            return (
              <div className={`grid grid-cols-[28px_1fr_22px] items-center gap-[9px] min-h-[42px] rounded-[10px] px-[9px] py-[6px] text-[var(--site-text-muted)] transition-[border-color,background-color,opacity,box-shadow] duration-[450ms] ${state === 'complete' ? 'border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)]' : state === 'active' ? 'border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--site-accent)_18%,var(--site-transparent)),0_0_14px_var(--site-accent-glow)]' : 'border border-[var(--site-transparent)]'}`} key={stage.number}>
                <span className="font-mono text-[10px] leading-none font-[600] text-[var(--site-text-subtle)]">{stage.number}</span>
                <span className="flex flex-col gap-[3px]"><strong className="text-[11px] font-[650] text-[var(--site-text)]">{stage.title}</strong><small className="text-[9px] leading-[1.3] text-[var(--site-text-subtle)]">{stage.detail}</small></span>
                <span className="relative grid size-[22px] place-items-center rounded-full border border-[var(--site-border-soft)] text-[var(--site-text-subtle)]" aria-hidden="true">
                  {state === 'complete' ? (
                    <svg className="absolute inset-0 m-auto size-[13px] text-[var(--site-accent)] drop-shadow-[0_0_3px_rgb(var(--site-accent-rgb)/0.2)]" viewBox="0 0 16 16" focusable="false"><path d="m3.5 8.2 3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : state === 'active' ? (
                    <svg className="absolute inset-0 m-auto size-[17px] overflow-visible animate-[build-spinner-rotate_1.8s_linear_infinite] text-[var(--site-accent-light)] motion-reduce:animate-none" viewBox="0 0 20 20" focusable="false"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="28 16" strokeLinecap="round" /></svg>
                  ) : (
                    <span className="size-[5px] rounded-full bg-current opacity-[.35]" />
                  )}
                </span>
              </div>
            )
          })}
        </div>
        <div className="grid gap-2 pt-[2px]">
          <div className="flex items-center justify-between gap-[12px]"><span className="font-mono text-[8px] leading-none font-[600] tracking-[.12em] text-[var(--site-text-subtle)]">PROJECT PROGRESS</span><span className="inline-flex items-center gap-[6px] text-[9px] font-[650] text-[var(--site-accent-light)]">{Math.floor(progress)}% <span className="text-[9px] font-[500] text-[var(--site-text-soft)]">· {completedCount} of {stages.length} stages</span></span></div>
          <div className="h-[5px] overflow-hidden rounded-[5px] bg-[color-mix(in_srgb,var(--site-accent)_15%,var(--site-surface))]" role="progressbar" aria-label="Illustrative project workflow progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.floor(progress)} aria-valuetext={isComplete ? `All ${stages.length} illustrative project stages complete` : `${completedCount} of ${stages.length} stages complete; ${activeStage.title} in progress`}><span className="block h-full rounded-[inherit] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent-light))] shadow-[0_0_8px_var(--site-accent-glow)] transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} /></div>
          <div className="flex items-center justify-between gap-[12px] text-[8px] text-[var(--site-text-subtle)]"><span>Current stage <strong className="font-[550] text-[var(--site-text-soft)]">{activeStage.title}</strong></span><span>Next <strong className="font-[550] text-[var(--site-text-soft)]">{nextStage?.title ?? (isComplete ? '—' : 'Complete')}</strong></span></div>
        </div>
        <div className="mt-[17px] grid grid-cols-[56px_minmax(90px,1fr)_minmax(150px,1.15fr)] items-center gap-[14px] rounded-[13px] border border-[var(--site-border-quiet)] bg-[var(--site-panel-surface)] p-[13px] max-[560px]:grid-cols-[50px_minmax(80px,1fr)] max-[560px]:gap-[10px] max-[560px]:p-[10px]" aria-hidden="true">
          <div className="relative grid aspect-square w-[52px] place-items-center rounded-full bg-[conic-gradient(var(--site-accent-light)_0_78%,var(--site-accent-wash)_78%_100%)] before:absolute before:aspect-square before:w-[40px] before:rounded-full before:bg-[var(--site-bg)] before:content-[''] max-[560px]:w-[46px] max-[560px]:before:w-[35px]"><span className="relative z-[1] flex flex-col items-center leading-[1.15]"><b className="text-[7px] tracking-[.06em]">READY</b><small className="mt-0.5 text-[6px] text-[var(--site-text-faint)]">checks</small></span></div>
          <div><span className="text-[8px] font-bold tracking-[.1em] text-[var(--site-text-soft)]">BUILD ACTIVITY</span><div className="mt-[5px] flex h-[26px] items-end gap-[3px]">{[28, 44, 32, 70, 48, 86, 54, 64, 92, 58, 76, 100].map((height, index) => <i className="h-[var(--bar-height)] flex-1 origin-bottom rounded-t-[2px] bg-[linear-gradient(180deg,var(--site-accent-light),var(--site-accent))] [animation:build-activity-pulse_1.6s_ease-in-out_infinite_alternate] [animation-delay:calc(var(--bar-index)*-110ms)] motion-reduce:animate-none" key={index} style={{ '--bar-height': `${height}%`, '--bar-index': index }} />)}</div><small className="mt-1 block text-[8px] text-[var(--site-text-faint)]">Recent development work</small></div>
          <div className="flex min-w-0 flex-col gap-[7px] rounded-[9px] border border-[var(--site-border-quiet)] bg-[var(--site-bg)] px-[10px] py-[9px] font-mono text-[9px] max-[560px]:col-span-full"><span className="overflow-hidden text-ellipsis whitespace-nowrap text-[var(--site-text-faint)]">$ npm run build</span><b className="font-semibold text-[var(--site-accent-light)]">✓ Build successful</b></div>
        </div>
      </div>
    </div>
  )
}
