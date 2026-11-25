import { Link } from 'react-router-dom'

export default function Logo({
  className = '',
  wordmarkClassName = 'text-2xl sm:text-3xl',
  onClick,
  to = '/',
  ariaLabel = 'Astrix Code home',
}) {
  return (
    <>
      <style>{`
        @keyframes astrix-code-logo-particle {
          0% { opacity: 0; transform: translate3d(var(--particle-start-x), var(--particle-start-y), 0) scale(.3); }
          14% { opacity: .72; }
          68% { opacity: .42; }
          100% { opacity: 0; transform: translate3d(var(--particle-x), var(--particle-y), 0) scale(.15); }
        }
        @keyframes astrix-code-logo-dot-entry {
          0% { opacity: 0; transform: translate(calc(-50% - 2.45em), .45em) scale(.35); }
          3% { opacity: 1; }
          16% { transform: translate(calc(-50% + .8em), -.45em) scale(.8); }
          31% { transform: translate(calc(-50% + 4.2em), .35em) scale(.8); }
          46% { transform: translate(calc(-50% + .8em), 1em) scale(.8); }
          61% { transform: translate(calc(-50% - 2.45em), .35em) scale(.8); }
          77% { transform: translate(calc(-50% - .12em), -.55em) scale(1.25); box-shadow: 0 0 1px 1px var(--site-white), 0 0 7px 3px var(--site-accent-light), 0 0 16px 7px var(--site-accent), 0 0 24px 9px var(--site-accent-glow); }
          88% { transform: translate(-50%, -.02em) scale(1.08); }
          94% { transform: translate(-50%, .04em) scale(.96); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); box-shadow: 0 0 1px .5px var(--site-white), 0 0 6px 2px var(--site-accent-light), 0 0 14px 5px var(--site-accent), 0 0 22px 8px var(--site-accent-glow); }
        }
        @keyframes astrix-code-logo-dot-hop {
          0%, 100% { transform: translate(-50%, 0) scale(1.06, .94); animation-timing-function: cubic-bezier(.2,.7,.4,1); }
          18%      { transform: translate(-50%, -.07em) scale(.97, 1.03); animation-timing-function: cubic-bezier(.5,0,.8,.4); }
          36%      { transform: translate(-50%, 0) scale(1.06, .94); }
          50%      { transform: translate(-50%, 0) scale(1, 1); }
        }
        .astrix-code-logo-accent {
          background-image: linear-gradient(105deg, var(--site-accent) 0%, var(--site-accent-light) 48%, var(--site-accent-bright) 56%, var(--site-accent) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: var(--site-transparent);
          filter: drop-shadow(0 0 7px var(--site-accent-glow));
        }
        .astrix-code-logo-particle {
          animation: astrix-code-logo-particle 3.6s cubic-bezier(.45,.05,.85,.6) infinite both;
          will-change: transform, opacity;
          box-shadow: 0 0 3px 1px var(--site-accent-glow);
        }
        .astrix-code-logo-dot {
          opacity: 0;
          background: radial-gradient(circle, var(--site-white) 0 24%, var(--site-accent-light) 38%, var(--site-accent) 70%, var(--site-accent-deep) 100%);
          animation: astrix-code-logo-dot-entry 5s cubic-bezier(.22,1,.36,1) .25s forwards, astrix-code-logo-dot-hop 1.1s ease-in-out 5.25s infinite;
          box-shadow: 0 0 1px .5px var(--site-white), 0 0 6px 2px var(--site-accent-light), 0 0 14px 5px var(--site-accent), 0 0 22px 8px var(--site-accent-glow);
        }
        @media (prefers-reduced-motion: reduce) {
          .astrix-code-logo-particle, .astrix-code-logo-dot { animation: none; }
          .astrix-code-logo-particle { opacity: 0; transform: none; }
          .astrix-code-logo-dot { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <Link discover="none"
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`group relative inline-flex shrink-0 items-center ${className}`}
      >
        <span
          aria-hidden="true"
          className={`relative whitespace-nowrap font-bold leading-none tracking-[-0.055em] ${wordmarkClassName}`}
        >
          <span className="relative z-10">
            <span className="text-white">
              Astr
              <span
                className="relative inline-block"
                style={{ letterSpacing: 0, marginRight: '-0.055em' }}
              >
                ı
                <i
                  aria-hidden="true"
                  className="astrix-code-logo-dot pointer-events-none absolute left-1/2 z-20 size-[0.2em] rounded-full"
                  style={{ top: 'var(--logo-dot-top, -0.02em)' }}
                />
              </span>
              x
            </span>
            <span className="astrix-code-logo-accent ml-[0.3em]">Code</span>
          </span>
        </span>
      </Link>
    </>
  )
}
