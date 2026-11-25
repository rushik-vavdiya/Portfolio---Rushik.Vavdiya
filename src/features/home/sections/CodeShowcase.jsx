import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import CodeWorkflowPanel from '../../../components/ui/CodeWorkflowPanel.jsx'
import CodeVisual from './CodeVisual.jsx'
import { fetchBuild } from '../../admin/slices/build/buildSlice.js'

const fallbackPrinciples = ['Thoughtful structure', 'Responsive by design', 'Careful launch checks']
const fallbackStacks = ['Shopify', 'React', 'Next.js', 'MERN']

function PanelHeading({ number, title, subtitle, status }) {
  return (
    <div className="grid min-h-[76px] grid-cols-[34px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-b border-[rgb(var(--site-accent-rgb)/0.2)] px-4 py-3.5 sm:flex sm:items-center sm:gap-3.5 sm:px-5 sm:py-4">
      <span className="row-span-2 grid size-[34px] place-items-center self-start rounded-[10px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] font-mono text-[.7rem] font-semibold text-[var(--site-accent)] sm:row-span-1 sm:self-auto">{number}</span>
      <div className="grid min-w-0 gap-1">
        <strong className="text-[.94rem] font-semibold tracking-[-.02em] text-white sm:text-[.98rem]">{title}</strong>
        <span className="text-[.75rem] leading-[1.45] text-[var(--site-accent)] sm:text-[.78rem]">{subtitle}</span>
      </div>
      <span className="col-start-2 inline-flex w-fit items-center gap-1.5 justify-self-end rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] px-[11px] py-1 font-mono text-[.62rem] font-medium tracking-[.12em] text-[var(--site-white)] uppercase sm:ml-auto sm:w-auto sm:shrink-0 sm:justify-self-auto">
        <i className="size-1.5 animate-pulse rounded-full bg-[var(--site-accent)] shadow-[0_0_8px_var(--site-accent)]" />{status}
      </span>
    </div>
  )
}

export default function CodeShowcase() {
  const dispatch = useDispatch()
  const activeBuild = useSelector((state) => state.build.activeBuild)

  useEffect(() => {
    dispatch(fetchBuild())
  }, [dispatch])

  const sectionHeader = activeBuild?.sectionHeader
  const principles = activeBuild?.principles?.length ? activeBuild.principles : fallbackPrinciples
  const stacks = activeBuild?.coreStack?.length ? activeBuild.coreStack : fallbackStacks
  const leftPanel = activeBuild?.leftPanel
  const rightPanel = activeBuild?.rightPanel
  const processLabels = activeBuild?.processLabels?.length ? activeBuild.processLabels : ['Strategy', 'Design', 'Development', 'Launch']

  return (
    <section id="build" aria-labelledby="code-showcase-heading" className="relative isolate bg-[#000] px-5 py-12 text-[var(--site-text)] sm:px-8 sm:py-[72px] lg:px-10">
      <Container>
        <header className="mx-auto mb-9 flex max-w-[860px] flex-col items-center text-center">
          <SectionHeading
            id="code-showcase-heading"
            eyebrow={sectionHeader?.eyebrow || 'INSIDE THE BUILD'}
            title={<span>{sectionHeader?.heading || 'From clear thinking to'} <span className="bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent)_55%,var(--site-accent))] bg-clip-text text-transparent">{sectionHeader?.highlightHeading || 'working code'}</span></span>}
            description={sectionHeader?.description || 'A transparent build process, thoughtful code, and every detail designed to move your project forward.'}
            className="max-w-full"
            eyebrowClassName="min-h-0 gap-2 border-[rgb(var(--site-accent-rgb)/0.2)] px-3.5 py-1.5 text-[.72rem] font-medium tracking-[.18em] text-[var(--site-accent)] [&>i]:block [&>i]:size-1.5 [&>i]:bg-[var(--site-accent)]"
            titleClassName="mt-[18px] max-w-[18ch] text-[clamp(2rem,5vw,3rem)] leading-[1.06] tracking-[-.04em] max-[640px]:max-w-[14ch] max-[640px]:text-[clamp(30px,8vw,36px)]"
            contentClassName="mt-[14px] max-w-[38rem] text-[1.02rem] leading-[1.65] max-[600px]:text-[.9rem]"
          />
          <span className="mt-5 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] px-3.5 py-1.5 font-mono text-[.68rem] font-medium tracking-[.12em] text-[var(--site-white)] uppercase">
            {processLabels.map((label, index) => (
              <span key={`${label}-${index}`} className="contents">
                {index > 0 && <i className="size-1 rounded-full bg-[var(--site-accent)] not-italic" />}
                <span>{label}</span>
              </span>
            ))}
          </span>
        </header>

        <div className="grid grid-cols-1 gap-[22px] border-t border-[rgb(var(--site-accent-rgb)/0.2)] pt-7 min-[961px]:grid-cols-2">
          <article data-scroll-reveal className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.9),rgb(var(--site-black-rgb)/0.95))] shadow-[0_30px_80px_-40px_rgb(var(--site-accent-rgb)/0.2)] max-[960px]:min-h-0">
            <PanelHeading number="01" title={leftPanel?.title || 'Built with intention'} subtitle={leftPanel?.subtitle || 'Readable, responsive code as it comes together'} status={leftPanel?.status || 'Live code'} />
            <div className="relative flex min-h-[440px] flex-1 flex-col justify-between gap-3 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(var(--site-accent-rgb)/0.2),transparent_70%)] px-3 py-5 sm:px-5">
              <CodeVisual variant="build" />
              <div aria-label="Core technologies" className="mx-2.5 flex min-h-[42px] flex-wrap items-center gap-2 rounded-xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] px-3.5 py-2.5 sm:mx-0">
                <small className="mr-auto font-mono text-[.62rem] tracking-[.14em] text-[var(--site-accent)]">CORE STACK</small>
                <div className="flex flex-wrap gap-1.5">
                  {stacks.map((stack) => <span key={stack} className="rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] px-[11px] py-1 text-[.68rem] text-[var(--site-white)]">{stack}</span>)}
                </div>
              </div>
            </div>
          </article>

          <article data-scroll-reveal className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.9),rgb(var(--site-black-rgb)/0.95))] shadow-[0_30px_80px_-40px_rgb(var(--site-accent-rgb)/0.2)] max-[960px]:min-h-0">
            <PanelHeading number="02" title={rightPanel?.title || 'Progress you can follow'} subtitle={rightPanel?.subtitle || 'From first brief through final checks'} status={rightPanel?.status || 'In progress'} />
            <CodeWorkflowPanel variant="build" steps={activeBuild?.processSteps} />
          </article>
        </div>

        <div aria-label="Project principles" className="mt-5 grid grid-cols-1 rounded-[18px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] min-[601px]:grid-cols-3">
          {principles.map((item, index) => (
            <div key={item} className={`flex min-h-[60px] items-center justify-center gap-2.5 px-3 py-3 text-[.84rem] text-[var(--site-white)] max-[600px]:justify-start ${index > 0 ? 'max-[600px]:border-t max-[600px]:border-[rgb(var(--site-accent-rgb)/0.2)] min-[601px]:border-l min-[601px]:border-[rgb(var(--site-accent-rgb)/0.2)]' : ''}`}>
              <span className="rounded-[7px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-[7px] py-1 font-mono text-[.62rem] font-semibold text-[var(--site-accent)]">0{index + 1}</span><b className="font-medium">{item}</b>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
