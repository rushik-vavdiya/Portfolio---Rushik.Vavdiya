import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

/* ------------------------------------------------------------------ */
/*  Palette (accent colours come from your own theme variables)        */
/* ------------------------------------------------------------------ */
const SKIN = '#e2ae86'
const SKIN_SHADE = '#c68c66'
const HAIR = '#1d1a24'
const PANTS = '#232b3c'
const PANTS_BACK = '#171d2b'
const SHOE = '#f5f2fb'
const SHOE_BACK = '#cdc7dc'
const SLEEVE_DARK = 'color-mix(in srgb, var(--site-accent) 62%, black)'

const HEADLINE_WORDS = ['Looks', 'like', 'you', 'took', 'a']
const ACCENT_CHARS = [...'wrong turn.']
const PARTICLES = [
  [8, 18], [18, 74], [30, 30], [84, 20], [91, 62], [72, 84], [12, 48], [62, 10],
]
const STARS = [
  [8, 10], [16, 26], [27, 8], [38, 18], [52, 7], [63, 22], [74, 9], [86, 17], [93, 30], [45, 30], [22, 36], [80, 36],
]

/* ------------------------------------------------------------------ */
/*  Scenery props                                                       */
/* ------------------------------------------------------------------ */
function Signpost() {
  return (
    <svg
      data-404-prop
      data-404-sign
      aria-hidden="true"
      viewBox="0 0 130 190"
      className="pointer-events-none absolute bottom-[58px] right-[6%] z-[1] hidden h-[150px] w-auto sm:block"
    >
      <rect x="60" y="26" width="9" height="164" rx="3" fill="#2a2f3d" />
      <g transform="rotate(-7 64 56)">
        <path d="M12 36 L92 36 L108 50 L92 64 L12 64Z" style={{ fill: 'var(--site-accent)' }} />
        <text x="26" y="55" fontSize="15" fontWeight="800" fill="#06060a">HOME</text>
      </g>
      <g transform="rotate(6 64 100)">
        <path d="M118 82 L38 82 L22 96 L38 110 L118 110Z" fill="#3a4156" />
        <text x="54" y="101" fontSize="15" fontWeight="800" fill="#e8e6f2">¯\_(ツ)_/¯</text>
      </g>
    </svg>
  )
}

function Lamp() {
  return (
    <svg
      data-404-prop
      data-404-lamp
      aria-hidden="true"
      viewBox="0 0 150 230"
      className="pointer-events-none absolute bottom-[58px] left-[5%] z-[1] hidden h-[200px] w-auto sm:block"
    >
      <defs>
        <linearGradient id="g404-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--site-accent-light)', stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: 'var(--site-accent-light)', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path data-404-lamplight d="M60 40 L12 228 L138 228 L90 40Z" fill="url(#g404-light)" />
      <rect x="72" y="36" width="6" height="194" rx="3" fill="#2a2f3d" />
      <path d="M52 40 C52 24 98 24 98 40Z" fill="#343b4f" />
      <ellipse cx="75" cy="41" rx="14" ry="4" style={{ fill: 'var(--site-accent-light)' }} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  The guide: a jointed, properly proportioned human (profile view)   */
/*  Pivots (svgOrigin) are set from JS, see `initPose` below.          */
/* ------------------------------------------------------------------ */
function LazyGuide() {
  return (
    <div data-404-guide className="absolute bottom-[46px] left-1/2 z-[4] w-[132px] sm:w-[170px]">
      {/* speech bubble: follows the character, never mirrored */}
      <div data-404-speech-wrap className="pointer-events-none absolute bottom-[calc(100%-8px)] left-1/2 w-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div
            data-404-speech
            aria-hidden="true"
            className="relative w-[164px] rounded-[14px] border border-[rgb(var(--site-accent-rgb)/.32)] bg-[rgb(var(--site-black-rgb)/.92)] px-3 py-2.5 text-left text-[10.5px] font-semibold leading-[1.45] text-white shadow-[0_12px_35px_-18px_rgb(var(--site-accent-rgb)/.8)] backdrop-blur-lg sm:w-[208px] sm:text-[11.5px]"
          >
            <span data-404-ghost className="invisible block">Hmm… this route is not on my map.</span>
            <span data-404-typed className="absolute inset-x-3 top-2.5 block">Hmm… this route is not on my map.</span>
            <span className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-[rgb(var(--site-accent-rgb)/.32)] bg-[rgb(var(--site-black-rgb)/.92)]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        data-404-poke
        aria-label="Poke the guide"
        className="block w-full cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
      >
        <svg
          role="img"
          aria-label="A tired man in a hoodie shuffling around with a coffee mug"
          viewBox="0 0 220 360"
          className="block h-auto w-full overflow-visible"
        >
          <defs>
            <linearGradient id="g404-hoodie" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--site-accent-light)' }} />
              <stop offset=".5" style={{ stopColor: 'var(--site-accent)' }} />
              <stop offset="1" style={{ stopColor: 'color-mix(in srgb, var(--site-accent) 52%, black)' }} />
            </linearGradient>
          </defs>

          <ellipse data-g="shadow" cx="112" cy="342" rx="56" ry="7" style={{ fill: 'rgb(var(--site-accent-rgb) / .24)' }} />

          {/* z z z (outside the flip group so letters never mirror) */}
          <g fontWeight="800" fontSize="17" style={{ fill: 'var(--site-accent-light)' }}>
            <text data-g="zzz" x="104" y="28" opacity="0">z</text>
            <text data-g="zzz" x="116" y="16" opacity="0">z</text>
            <text data-g="zzz" x="130" y="4" opacity="0">Z</text>
          </g>

          <g data-g="flip">
            <g data-g="pelvis">
              {/* hips */}
              <path d="M92 184 L128 184 L130 206 C128 213 92 213 90 206Z" fill={PANTS} />

              {/* far leg */}
              <g data-g="thighF">
                <path d="M95 186 C93 214 96 238 99 256 L121 256 C124 238 127 214 125 186Z" fill={PANTS_BACK} />
                <g data-g="kneeF">
                  <circle cx="110" cy="256" r="11" fill={PANTS_BACK} />
                  <path d="M99 256 C98 282 101 306 103 322 L118 322 C120 306 122 282 121 256Z" fill={PANTS_BACK} />
                  <path d="M101 312 L120 312 L119 322 L102 322Z" fill="#10141f" />
                  <g data-g="footF">
                    <path d="M97 322 L121 322 C124 328 136 330 142 335 C145 338 143 341 139 341 L99 341 C95 341 95 335 96 330Z" fill={SHOE_BACK} />
                    <path d="M96 337 L144 337 L143 341 L98 341Z" fill="#8f89a3" />
                  </g>
                </g>
              </g>

              {/* upper body */}
              <g data-g="torso">
                {/* far arm (behind the body) */}
                <g data-g="armF">
                  <path d="M109 108 L109 164" fill="none" stroke={SLEEVE_DARK} strokeWidth="15" strokeLinecap="round" />
                  <g data-g="foreF">
                    <path d="M109 164 L109 204" fill="none" stroke={SLEEVE_DARK} strokeWidth="13" strokeLinecap="round" />
                    <path d="M109 200 L109 207" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="14" strokeLinecap="round" />
                    <path data-g="finger" d="M109 208 L109 238" fill="none" stroke={SKIN_SHADE} strokeWidth="3.4" strokeLinecap="round" />
                    <ellipse cx="109" cy="216" rx="6.4" ry="8.5" fill={SKIN_SHADE} />
                  </g>
                </g>

                {/* hood bundle at the back of the neck */}
                <path d="M88 102 C88 88 104 84 117 90 C113 102 100 108 88 102Z" style={{ fill: SLEEVE_DARK }} />

                {/* hoodie */}
                <path d="M99 96 C90 102 88 116 89 134 C90 156 92 176 93 194 C100 204 121 204 128 196 C130 174 131 152 130 132 C129 114 123 102 117 96Z" fill="url(#g404-hoodie)" />
                <path d="M92 188 C102 198 120 198 129 190" fill="none" stroke="#000" strokeOpacity=".2" strokeWidth="6" strokeLinecap="round" />
                <path d="M104 160 C114 156 124 158 129 164 L128 186 C119 190 108 190 98 186Z" fill="#000" opacity=".14" />
                <path d="M96 130 C102 134 104 146 104 158" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="2" strokeLinecap="round" />
                <path d="M118 100 L120 128 M122 100 L125 126" fill="none" stroke="#f1eef8" strokeWidth="1.8" strokeLinecap="round" opacity=".85" />

                {/* head + neck */}
                <g data-g="headPose">
                  <g data-g="head">
                    <path d="M102 80 L104 101 L118 101 L117 80Z" fill={SKIN_SHADE} />
                    <path d="M96 60 C94 44 104 38 114 38 C126 38 132 48 132 58 C132 62 134 64 135 66 C136 68 134 70 132 70 C133 74 131 78 126 82 C120 86 110 86 104 82 C98 78 96 70 96 60Z" fill={SKIN} />
                    <ellipse cx="107" cy="63" rx="4.5" ry="6.5" fill={SKIN_SHADE} />
                    <path d="M106 60 C108 62 108 65 106 67" fill="none" stroke="#a8704f" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M96 62 C90 40 100 30 116 30 C132 30 138 42 134 52 C130 46 124 43 116 43 C108 43 102 48 100 58 C99 62 97 64 96 62Z" fill={HAIR} />
                    <path d="M104 33 L99 21 L112 31Z M118 31 L127 20 L129 34Z M97 44 L86 40 L98 53Z" fill={HAIR} />

                    {/* eye */}
                    <ellipse cx="123" cy="58" rx="4.4" ry="3.3" fill="#f6f3ee" />
                    <g data-g="pupils" fill="#241f2c">
                      <circle cx="124.6" cy="58.2" r="2" />
                    </g>
                    <rect data-g="lids" x="118.4" y="54.4" width="9.4" height="7.2" fill={SKIN} />
                    <rect data-g="blink" x="118.4" y="54.4" width="9.4" height="7.2" fill={SKIN} />
                    <path d="M119 62.6 C122 64.6 125 64.6 127.4 62.6" fill="none" stroke={SKIN_SHADE} strokeWidth="1.4" strokeLinecap="round" />
                    <g data-g="brows" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round">
                      <path d="M118.5 51.8 L128.5 51" />
                    </g>

                    {/* mouth */}
                    <path d="M124 76 C127 77.2 130 76.4 132 74.4" fill="none" stroke="#8a5444" strokeWidth="1.8" strokeLinecap="round" />
                    <ellipse data-g="yawn" cx="129" cy="77" rx="3.6" ry="5" fill="#4a1f25" opacity="0" />
                  </g>
                </g>

                {/* front collar */}
                <path d="M104 98 C108 106 116 106 120 98 L119 93 C114 99 108 99 105 93Z" style={{ fill: SLEEVE_DARK }} />

                {/* near arm: holds the coffee mug */}
                <g data-g="armN">
                  <path d="M111 108 L111 164" fill="none" style={{ stroke: 'var(--site-accent)' }} strokeWidth="17" strokeLinecap="round" />
                  <g data-g="foreN">
                    <path d="M111 164 L111 204" fill="none" style={{ stroke: 'var(--site-accent)' }} strokeWidth="15" strokeLinecap="round" />
                    <path d="M111 200 L111 207" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="16" strokeLinecap="round" />
                    <g transform="rotate(85 111 216)">
                      <path d="M122 208 C131 208 131 222 122 222" fill="none" stroke="#f4f1fa" strokeWidth="3" strokeLinecap="round" />
                      <rect x="100" y="203" width="22" height="25" rx="4" fill="#f4f1fa" />
                      <rect x="100" y="203" width="22" height="5" rx="2.5" fill="#6b4630" />
                      <rect x="100" y="215" width="22" height="4" style={{ fill: 'var(--site-accent)' }} />
                      <g fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round">
                        <path data-g="steam" d="M105 198 C102 193 108 190 105 184" />
                        <path data-g="steam" d="M111 198 C108 193 114 190 111 184" />
                        <path data-g="steam" d="M117 198 C114 193 120 190 117 184" />
                      </g>
                    </g>
                    <ellipse cx="111" cy="216" rx="7" ry="9" fill={SKIN} />
                    <ellipse cx="117" cy="211" rx="2.8" ry="5.2" fill={SKIN} />
                  </g>
                </g>
              </g>

              {/* near leg */}
              <g data-g="thighN">
                <path d="M95 186 C93 214 96 238 99 256 L121 256 C124 238 127 214 125 186Z" fill={PANTS} />
                <path d="M104 200 C103 218 105 236 108 250" fill="none" stroke="#fff" strokeOpacity=".06" strokeWidth="2" strokeLinecap="round" />
                <g data-g="kneeN">
                  <circle cx="110" cy="256" r="11" fill={PANTS} />
                  <path d="M99 256 C98 282 101 306 103 322 L118 322 C120 306 122 282 121 256Z" fill={PANTS} />
                  <path d="M101 312 L120 312 L119 322 L102 322Z" fill="#10141f" />
                  <g data-g="footN">
                    <path d="M97 322 L121 322 C124 328 136 330 142 335 C145 338 143 341 139 341 L99 341 C95 341 95 335 96 330Z" fill={SHOE} />
                    <path d="M96 337 L144 337 L143 341 L98 341Z" style={{ fill: 'var(--site-accent)' }} />
                    <path d="M106 327 C114 326 121 329 126 333" fill="none" style={{ stroke: 'var(--site-accent)' }} strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M115 324 L123 326 M113 328 L121 330" fill="none" stroke="#b9b3cc" strokeWidth="1.4" strokeLinecap="round" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function NotFound() {
  const pageRef = useRef(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const q = gsap.utils.selector(page)
    const one = (s) => q(s)[0]
    const J = {}
    ;['flip', 'pelvis', 'torso', 'headPose', 'thighN', 'kneeN', 'footN', 'thighF', 'kneeF', 'footF', 'armN', 'foreN', 'armF', 'foreF', 'finger', 'pupils', 'yawn'].forEach((n) => {
      J[n] = one(`[data-g="${n}"]`)
    })
    const lids = q('[data-g="lids"]')
    const blink = q('[data-g="blink"]')
    const brows = q('[data-g="brows"]')
    const steam = q('[data-g="steam"]')
    const zzz = q('[data-g="zzz"]')

    const card = one('[data-404-card]')
    const guide = one('[data-404-guide]')
    const speech = one('[data-404-speech]')
    const speechWrap = one('[data-404-speech-wrap]')
    const ghost = one('[data-404-ghost]')
    const typed = one('[data-404-typed]')
    const pokeBtn = one('[data-404-poke]')
    const homeEl = one('[data-404-home]')
    const helpEl = one('[data-404-help]')
    const pebble = one('[data-404-pebble]')
    const clock = one('[data-404-clock]')
    const digits = q('[data-404-digit]')
    const dust = q('[data-404-dust]')
    const rings = q('[data-404-ring]')

    /* ---------------- skeleton constants ---------------- */
    const REST = { armN: 15, foreN: -100, armF: 4, foreF: -12, torso: 6, head: 8 }
    const LEG1 = 68
    const LEG2 = 66
    const AMP = 0.72
    const STRIDE = 1.25 // seconds per full step cycle (lazy)
    const rad = (d) => (d * Math.PI) / 180

    // Keyframes over one cycle (8 keys). Positive rotation = clockwise = leg/arm swings backward.
    const T = [-22, -10, 0, 12, 22, 8, -12, -24].map((v) => v * AMP) // thigh
    const K = [2, 10, 6, 14, 40, 66, 40, 10].map((v) => v * 0.9) // knee flex
    const FA = [-10, -3, 0, 6, 30, 12, -2, -10] // absolute foot angle (keeps soles flat)

    // periodic Catmull-Rom so the cycle has no robotic stops at keyframes
    const cr = (a, p) => {
      const n = a.length
      const t = p * n
      const i = Math.floor(t) % n
      const f = t - Math.floor(t)
      const p0 = a[(i - 1 + n) % n]
      const p1 = a[i]
      const p2 = a[(i + 1) % n]
      const p3 = a[(i + 2) % n]
      return 0.5 * (2 * p1 + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (-p0 + 3 * p1 - 3 * p2 + p3) * f * f * f)
    }

    const initPose = () => {
      gsap.set(J.flip, { scaleX: 1, svgOrigin: '110 180' })
      gsap.set(J.pelvis, { y: 0 })
      gsap.set(J.torso, { rotation: REST.torso, svgOrigin: '110 190' })
      gsap.set(J.headPose, { rotation: REST.head, svgOrigin: '110 92' })
      gsap.set(J.thighN, { rotation: 0, svgOrigin: '110 188' })
      gsap.set(J.kneeN, { rotation: 0, svgOrigin: '110 256' })
      gsap.set(J.footN, { rotation: 0, svgOrigin: '110 322' })
      gsap.set(J.thighF, { rotation: 0, svgOrigin: '110 188' })
      gsap.set(J.kneeF, { rotation: 0, svgOrigin: '110 256' })
      gsap.set(J.footF, { rotation: 0, svgOrigin: '110 322' })
      gsap.set(J.armN, { rotation: REST.armN, svgOrigin: '111 108' })
      gsap.set(J.foreN, { rotation: REST.foreN, svgOrigin: '111 164' })
      gsap.set(J.armF, { rotation: REST.armF, svgOrigin: '109 108' })
      gsap.set(J.foreF, { rotation: REST.foreF, svgOrigin: '109 164' })
      gsap.set(J.finger, { scaleY: 0, svgOrigin: '109 208' })
      gsap.set(lids, { scaleY: 0.55, transformOrigin: '50% 0%' })
      gsap.set(blink, { scaleY: 0, transformOrigin: '50% 0%' })
      gsap.set(J.yawn, { autoAlpha: 0, scale: 0.2 })
      gsap.set(zzz, { autoAlpha: 0 })
    }

    initPose()

    if (reduce) {
      // static, friendly pose with no motion
      return () => {
        gsap.set(page.querySelectorAll('*'), { clearProps: 'all' })
      }
    }

    /* ---------------- state ---------------- */
    let alive = true
    let ready = false
    let dir = 1 // 1 = facing right, -1 = facing left
    let pending = null
    let current = null
    let speechTween = null
    let zzzTl = null
    let pokes = 0
    let forcePoint = false
    let lastReact = 0
    let deck = []
    let dustIndex = 0
    let seconds = 0

    const stageW = () => card.clientWidth
    const range = () => Math.max(30, stageW() / 2 - (window.innerWidth >= 640 ? 126 : 96))
    const curX = () => gsap.getProperty(guide, 'x')
    const scale = () => guide.clientWidth / 220
    const speed = () => (141 * scale()) / STRIDE // px/s, matches the stride so feet don't skate

    gsap.set(guide, { xPercent: -50, x: -(stageW() / 2 + 140) })
    gsap.set(dust, { autoAlpha: 0 })
    gsap.set(pebble, { autoAlpha: 0 })
    gsap.set(card, { transformPerspective: 900 })

    /* ---------------- procedural walk (driven by the ticker) ---------------- */
    const ws = { w: 0, phase: 0, goal: null, vdir: 1, onArrive: null, applied: false, lastP: 0 }

    const applyPose = (p, w) => {
      const tN = cr(T, p)
      const kN = cr(K, p)
      const p2 = (p + 0.5) % 1
      const tF = cr(T, p2)
      const kF = cr(K, p2)
      const sw = tN / (22 * AMP) // -1 (near leg forward) .. +1 (near leg back)
      // lower the pelvis so the planted foot always meets the ground
      const lowest = Math.max(
        LEG1 * Math.cos(rad(tN)) + LEG2 * Math.cos(rad(tN + kN)),
        LEG1 * Math.cos(rad(tF)) + LEG2 * Math.cos(rad(tF + kF)),
      )
      gsap.set(J.pelvis, { y: (LEG1 + LEG2 - lowest) * w })
      gsap.set(J.thighN, { rotation: tN * w })
      gsap.set(J.kneeN, { rotation: kN * w })
      gsap.set(J.footN, { rotation: (cr(FA, p) - tN - kN) * w })
      gsap.set(J.thighF, { rotation: tF * w })
      gsap.set(J.kneeF, { rotation: kF * w })
      gsap.set(J.footF, { rotation: (cr(FA, p2) - tF - kF) * w })
      gsap.set(J.armN, { rotation: REST.armN - 0.3 * tN * w })
      gsap.set(J.foreN, { rotation: REST.foreN + 3 * sw * w })
      gsap.set(J.armF, { rotation: REST.armF + 0.8 * tN * w })
      gsap.set(J.foreF, { rotation: REST.foreF + 8 * sw * w })
      gsap.set(J.torso, { rotation: REST.torso + 0.07 * tN * w })
      gsap.set(J.headPose, { rotation: REST.head - 0.08 * tN * w })
    }

    const puff = () => {
      const el = dust[dustIndex++ % dust.length]
      const x = curX()
      gsap.fromTo(
        el,
        { x: x + dir * 8, y: 0, scale: 0.4, autoAlpha: 0.5 },
        { x: x - dir * 14, y: -14, scale: 1.5, autoAlpha: 0, duration: 0.8, ease: 'power2.out', overwrite: true },
      )
    }

    const arrive = () => {
      const cb = ws.onArrive
      ws.goal = null
      ws.onArrive = null
      gsap.killTweensOf(ws)
      gsap.to(ws, { w: 0, duration: 0.55, ease: 'power2.out', onComplete: () => cb?.() })
    }

    const tick = (_t, dtMs) => {
      if (!alive) return
      if (ws.w < 0.001 && ws.goal === null) {
        if (ws.applied) {
          ws.applied = false
          ws.w = 0
          applyPose(0, 0)
        }
        return
      }
      ws.applied = true
      const dt = Math.min(dtMs, 50) / 1000
      ws.phase = (ws.phase + (dt / STRIDE) * Math.max(ws.w, 0.4)) % 1
      const x = curX()
      if (ws.goal !== null && (ws.goal - x) * ws.vdir <= speed() * 0.22) arrive()
      gsap.set(guide, { x: x + ws.vdir * speed() * ws.w * dt })
      if (ws.w > 0.4 && ((ws.lastP > 0.9 && ws.phase < 0.1) || (ws.lastP < 0.5 && ws.phase >= 0.5))) puff()
      ws.lastP = ws.phase
      applyPose(ws.phase, ws.w)
    }
    gsap.ticker.add(tick)

    const face = (d) => {
      if (d === dir) return
      dir = d
      gsap.to(J.flip, { scaleX: d, duration: 0.3, ease: 'power2.inOut' })
    }

    const walkTo = (x, done) => {
      const d = x >= curX() ? 1 : -1
      face(d)
      ws.vdir = d
      ws.goal = x
      ws.onArrive = done
      gsap.killTweensOf(ws)
      gsap.to(ws, { w: 1, duration: 0.7, ease: 'power2.inOut' })
    }

    /* ---------------- speech ---------------- */
    const say = (text) => {
      speechTween?.kill()
      ghost.textContent = text
      typed.textContent = ''
      gsap.fromTo(
        speech,
        { autoAlpha: 0, scale: 0.86, y: 8, transformOrigin: '50% 100%' },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(2.2)', overwrite: true },
      )
      const s = { n: 0 }
      speechTween = gsap.to(s, {
        n: text.length,
        duration: Math.max(0.5, text.length * 0.03),
        ease: 'none',
        onUpdate: () => {
          typed.textContent = text.slice(0, Math.round(s.n))
        },
      })
    }

    /* ---------------- pose helpers ---------------- */
    const resetPose = (d = 0.3) => {
      const o = { duration: d, ease: 'power2.out', overwrite: 'auto' }
      gsap.to(J.armN, { rotation: REST.armN, ...o })
      gsap.to(J.foreN, { rotation: REST.foreN, ...o })
      gsap.to(J.armF, { rotation: REST.armF, ...o })
      gsap.to(J.foreF, { rotation: REST.foreF, ...o })
      gsap.to([J.thighN, J.kneeN, J.footN, J.thighF, J.kneeF, J.footF], { rotation: 0, ...o })
      gsap.to(J.torso, { rotation: REST.torso, y: 0, ...o })
      gsap.to(J.headPose, { rotation: REST.head, ...o })
      gsap.to(J.pelvis, { y: 0, ...o })
      gsap.to(J.finger, { scaleY: 0, ...o })
      gsap.to(brows, { y: 0, rotation: 0, ...o })
      gsap.to(lids, { scaleY: 0.55, ...o })
      gsap.to(J.yawn, { autoAlpha: 0, scale: 0.2, ...o })
      gsap.to(guide, { y: 0, ...o })
    }

    const zzzStart = () => {
      zzzTl?.kill()
      zzzTl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 })
      zzz.forEach((el, i) => {
        zzzTl
          .fromTo(el, { autoAlpha: 0, y: 0, x: 0, scale: 0.6 }, { autoAlpha: 1, y: -12, x: 6, scale: 1.1, duration: 1.1, ease: 'sine.out' }, i * 0.45)
          .to(el, { autoAlpha: 0, y: -26, duration: 0.7, ease: 'sine.in' }, i * 0.45 + 1.1)
      })
    }
    const zzzStop = () => {
      zzzTl?.kill()
      gsap.to(zzz, { autoAlpha: 0, duration: 0.2 })
    }

    const hold = (tl, t) => tl.to({}, { duration: 0.001 }, t)

    const interrupt = (cb) => {
      pending?.kill()
      pending = null
      current?.kill()
      current = null
      ws.goal = null
      ws.onArrive = null
      zzzStop()
      gsap.killTweensOf(ws)
      if (ws.w > 0.01) {
        gsap.to(ws, {
          w: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            resetPose(0.2)
            cb?.()
          },
        })
      } else {
        resetPose(0.25)
        cb?.()
      }
    }

    const schedule = (delay = gsap.utils.random(0.8, 2)) => {
      if (!alive) return
      pending = gsap.delayedCall(delay, next)
    }

    const newTimeline = () => {
      current = gsap.timeline({ onComplete: schedule })
      return current
    }

    /* ---------------- acts ---------------- */
    const WANDER = [
      'Hmm… where is everyone?',
      'This isn’t on my map.',
      'Maybe it’s this way. Maybe not.',
      'I’ve been walking for hours. (Ten minutes.)',
      'Feels like a 404. Smells like one too.',
      'I should have taken the other turn.',
    ]

    const wander = () => {
      const r = range()
      const cur = curX()
      let target = gsap.utils.random(-r, r)
      if (Math.abs(target - cur) < r * 0.6) target = (cur > 0 ? -1 : 1) * r * gsap.utils.random(0.55, 1)
      if (Math.random() < 0.7) say(gsap.utils.random(WANDER))
      walkTo(target, schedule)
    }

    const stretchAct = () => {
      const tl = newTimeline()
      say('*yaaaawn* …wait, what was I doing?')
      tl.to(J.armF, { rotation: -170, duration: 0.8, ease: 'power2.out' }, 0)
        .to(J.foreF, { rotation: -10, duration: 0.8, ease: 'power2.out' }, 0)
        .to(J.torso, { rotation: -2, duration: 0.8, ease: 'sine.out' }, 0)
        .to(J.headPose, { rotation: -10, duration: 0.8, ease: 'sine.out' }, 0)
        .to(lids, { scaleY: 1, duration: 0.4 }, 0.2)
        .to(brows, { y: -2, duration: 0.4 }, 0.2)
        .to(J.yawn, { autoAlpha: 1, scale: 1.1, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(J.yawn, { scale: 1.5, duration: 1.1, ease: 'sine.inOut' }, 0.7)
        .to(J.yawn, { autoAlpha: 0, scale: 0.2, duration: 0.4 }, 1.9)
        .to(J.armF, { rotation: REST.armF, duration: 0.9, ease: 'sine.inOut' }, 1.9)
        .to(J.foreF, { rotation: REST.foreF, duration: 0.9, ease: 'sine.inOut' }, 1.9)
        .to(J.torso, { rotation: REST.torso, duration: 0.9, ease: 'sine.inOut' }, 1.9)
        .to(J.headPose, { rotation: REST.head, duration: 0.9, ease: 'sine.inOut' }, 1.9)
        .to(lids, { scaleY: 0.55, duration: 0.5 }, 2.1)
        .to(brows, { y: 0, duration: 0.4 }, 2.1)
      hold(tl, 3)
    }

    const sip = () => {
      const tl = newTimeline()
      say('Don’t mind me. Coffee first, 404s later.')
      tl.to(J.armN, { rotation: -60, duration: 0.9, ease: 'sine.inOut' }, 0)
        .to(J.foreN, { rotation: -135, duration: 0.9, ease: 'sine.inOut' }, 0)
        .to(J.headPose, { rotation: 13, duration: 0.7, ease: 'sine.inOut' }, 0.2)
        .to(lids, { scaleY: 0.9, duration: 0.4 }, 0.9)
        .to(J.foreN, { rotation: -128, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 1.2)
        .to(lids, { scaleY: 0.55, duration: 0.4 }, 2.9)
        .to(J.armN, { rotation: REST.armN, duration: 0.9, ease: 'sine.inOut' }, 3.0)
        .to(J.foreN, { rotation: REST.foreN, duration: 0.9, ease: 'sine.inOut' }, 3.0)
        .to(J.headPose, { rotation: REST.head, duration: 0.7 }, 3.0)
        .call(() => say('Ahh. That’s the stuff.'), null, 3.1)
      hold(tl, 4.2)
    }

    const shrug = () => {
      const tl = newTimeline()
      say('No idea. I just work here.')
      tl.to(J.armF, { rotation: -22, duration: 0.35, ease: 'back.out(2)' }, 0)
        .to(J.foreF, { rotation: -75, duration: 0.35, ease: 'back.out(2)' }, 0)
        .to(J.torso, { y: -4, duration: 0.3, ease: 'power2.out' }, 0)
        .to(J.headPose, { rotation: 2, duration: 0.4, ease: 'sine.inOut' }, 0)
        .to(brows, { y: -3, duration: 0.3 }, 0)
        .to(lids, { scaleY: 0.8, duration: 0.3 }, 0)
        .to(J.headPose, { rotation: -3, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.5)
        .to(J.torso, { y: 0, duration: 0.5, ease: 'sine.inOut' }, 2)
        .to(J.armF, { rotation: REST.armF, duration: 0.6, ease: 'sine.inOut' }, 2)
        .to(J.foreF, { rotation: REST.foreF, duration: 0.6, ease: 'sine.inOut' }, 2)
        .to(brows, { y: 0, duration: 0.4 }, 2)
        .to(lids, { scaleY: 0.55, duration: 0.4 }, 2)
        .to(J.headPose, { rotation: REST.head, duration: 0.5 }, 2)
      hold(tl, 2.8)
    }

    const nap = () => {
      const tl = newTimeline()
      say('Just resting my eyes…')
      tl.to(J.torso, { rotation: 17, duration: 1.4, ease: 'sine.inOut' }, 0)
        .to(J.headPose, { rotation: 36, duration: 1.4, ease: 'sine.inOut' }, 0)
        .to(J.armN, { rotation: 4, duration: 1.2, ease: 'sine.inOut' }, 0)
        .to(J.foreN, { rotation: -40, duration: 1.2, ease: 'sine.inOut' }, 0)
        .to(J.armF, { rotation: 2, duration: 1.2 }, 0)
        .to(J.foreF, { rotation: -4, duration: 1.2 }, 0)
        .to([J.thighN, J.thighF], { rotation: -6, duration: 1.2, ease: 'sine.inOut' }, 0)
        .to([J.kneeN, J.kneeF], { rotation: 10, duration: 1.2, ease: 'sine.inOut' }, 0)
        .to(J.pelvis, { y: 3, duration: 1.2, ease: 'sine.inOut' }, 0)
        .to(lids, { scaleY: 1, duration: 0.9 }, 0.2)
        .call(zzzStart, null, 1.3)
        .to(J.torso, { rotation: 19, duration: 0.9, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 1.4)
        .call(() => say('GAH. I was awake. Totally awake.'), null, 5.0)
        .call(zzzStop, null, 5.0)
        .to(J.pelvis, { y: -12, duration: 0.18, ease: 'power2.out' }, 5.0)
        .to(J.pelvis, { y: 0, duration: 0.5, ease: 'bounce.out' }, 5.18)
        .to(J.torso, { rotation: REST.torso, duration: 0.5, ease: 'back.out(2)' }, 5.0)
        .to(J.headPose, { rotation: -6, duration: 0.2 }, 5.0)
        .to(J.headPose, { rotation: REST.head, duration: 0.6 }, 5.3)
        .to([J.thighN, J.thighF, J.kneeN, J.kneeF], { rotation: 0, duration: 0.4 }, 5.0)
        .to(lids, { scaleY: 0.15, duration: 0.12 }, 5.0)
        .to(lids, { scaleY: 0.55, duration: 0.7 }, 5.6)
        .to(J.armN, { rotation: REST.armN, duration: 0.5 }, 5.0)
        .to(J.foreN, { rotation: REST.foreN, duration: 0.5 }, 5.0)
        .to(J.armF, { rotation: REST.armF, duration: 0.5 }, 5.0)
        .to(J.foreF, { rotation: REST.foreF, duration: 0.5 }, 5.0)
      hold(tl, 6.3)
    }

    const pointHome = () => {
      walkTo(0, () => {
        const tl = newTimeline()
        say('Home is down there. Click it. I’d lead you, but my legs filed for leave.')
        tl.to(J.armF, { rotation: -78, duration: 0.5, ease: 'back.out(2)' }, 0)
          .to(J.foreF, { rotation: -6, duration: 0.5, ease: 'back.out(2)' }, 0)
          .to(J.finger, { scaleY: 1, duration: 0.3 }, 0.3)
          .to(J.headPose, { rotation: 14, duration: 0.5 }, 0)
          .to(J.torso, { rotation: 9, duration: 0.5 }, 0)
          .to(brows, { y: -2, duration: 0.3 }, 0)
          .fromTo(rings, { autoAlpha: 0.9, scale: 0.97 }, { autoAlpha: 0, scale: 1.1, duration: 0.9, repeat: 2, ease: 'power2.out' }, 0.3)
          .to(J.armF, { y: 2, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.8)
          .to(J.armF, { rotation: REST.armF, duration: 0.7, ease: 'power2.inOut' }, 3.2)
          .to(J.foreF, { rotation: REST.foreF, duration: 0.7, ease: 'power2.inOut' }, 3.2)
          .to(J.finger, { scaleY: 0, duration: 0.3 }, 3.2)
          .to(J.headPose, { rotation: REST.head, duration: 0.6 }, 3.2)
          .to(J.torso, { rotation: REST.torso, duration: 0.6 }, 3.2)
          .to(brows, { y: 0, duration: 0.3 }, 3.2)
        hold(tl, 4.1)
      })
    }

    const kick = () => {
      const side = curX() > 0 ? -1 : 1
      const lim = range() * 1.1
      const px = gsap.utils.clamp(-lim, lim, curX() + side * gsap.utils.random(120, 170))
      gsap.set(pebble, { x: px, y: 0, rotation: 0, autoAlpha: 1, scale: 1 })
      say('Oh, a pebble. Finally, a purpose.')
      walkTo(px - side * 56, () => {
        const tl = newTimeline()
        const maxX = stageW() / 2 - 22
        const landX = gsap.utils.clamp(-maxX, maxX, px + side * gsap.utils.random(120, 190))
        tl.to(J.thighN, { rotation: 30, duration: 0.35, ease: 'power2.out' }, 0)
          .to(J.kneeN, { rotation: 72, duration: 0.35, ease: 'power2.out' }, 0)
          .to(J.torso, { rotation: 1, duration: 0.35 }, 0)
          .to(J.armF, { rotation: -34, duration: 0.35 }, 0)
          .to(J.thighN, { rotation: -54, duration: 0.15, ease: 'power3.in' }, 0.45)
          .to(J.kneeN, { rotation: 4, duration: 0.15, ease: 'power3.in' }, 0.45)
          .to(J.footN, { rotation: 18, duration: 0.15 }, 0.45)
          .to(J.torso, { rotation: 12, duration: 0.15 }, 0.45)
          .to(J.armF, { rotation: 22, duration: 0.15 }, 0.45)
          .to(pebble, { x: landX, duration: 0.95, ease: 'none' }, 0.58)
          .to(pebble, { y: -90, duration: 0.38, ease: 'power2.out' }, 0.58)
          .to(pebble, { y: 0, duration: 0.57, ease: 'bounce.out' }, 0.96)
          .to(pebble, { rotation: 720 * side, duration: 0.95, ease: 'none' }, 0.58)
          .to(pebble, { autoAlpha: 0, duration: 0.5 }, 2.2)
          .to([J.thighN, J.kneeN, J.footN], { rotation: 0, duration: 0.6, ease: 'power2.inOut' }, 0.95)
          .to(J.torso, { rotation: REST.torso, duration: 0.6, ease: 'power2.inOut' }, 0.95)
          .to(J.armF, { rotation: REST.armF, duration: 0.6, ease: 'power2.inOut' }, 0.95)
          .call(() => say(gsap.utils.random(['Goal. Nobody saw that.', 'Ha. Nailed it.', 'Okay, that was oddly satisfying.'])), null, 1.1)
        hold(tl, 3)
      })
    }

    const ACTS = { wander, stretch: stretchAct, sip, shrug, nap, point: pointHome, kick }

    function next() {
      if (!alive) return
      if (!deck.length) deck = gsap.utils.shuffle(['wander', 'wander', 'stretch', 'sip', 'kick', 'shrug', 'nap', 'point'])
      ACTS[deck.pop()]()
    }

    /* ---------------- interactions ---------------- */
    const POKES = [
      'Ow. Rude.',
      'I was resting my eyes, you know.',
      'Poking is not a navigation method.',
      'Okay, okay. Home is the big button below.',
      'Seriously. Click it. I want a nap.',
    ]

    const poke = () => {
      pokes += 1
      interrupt(() => {
        say(POKES[Math.min(pokes - 1, POKES.length - 1)])
        const tl = newTimeline()
        forcePoint = pokes === 4
        tl.eventCallback('onComplete', () => {
          if (forcePoint) {
            forcePoint = false
            pending = gsap.delayedCall(0.4, pointHome)
          } else schedule()
        })
        tl.to(guide, { y: -20, duration: 0.16, ease: 'power2.out' }, 0)
          .to(guide, { y: 0, duration: 0.5, ease: 'bounce.out' }, 0.16)
          .to(lids, { scaleY: 0.05, duration: 0.1 }, 0)
          .to(brows, { y: -4, duration: 0.1 }, 0)
          .to(J.yawn, { autoAlpha: 1, scale: 0.55, duration: 0.1 }, 0)
          .to(J.armF, { rotation: -50, duration: 0.2, ease: 'back.out(3)' }, 0)
          .to(J.foreF, { rotation: -30, duration: 0.2 }, 0)
          .to(J.armN, { rotation: 32, duration: 0.2, ease: 'back.out(3)' }, 0)
          .to(J.headPose, { rotation: -6, duration: 0.15 }, 0)
          .to(digits, { y: -10, duration: 0.12, stagger: 0.05, yoyo: true, repeat: 1 }, 0.1)
          .call(puff, null, 0.66)
          .call(() => resetPose(0.4), null, 1.3)
        hold(tl, 1.8)
      })
    }

    const cheer = (line) => {
      const now = performance.now()
      if (!ready || now - lastReact < 6000) return
      lastReact = now
      interrupt(() => {
        say(line)
        const tl = newTimeline()
        tl.to(J.pelvis, { y: -7, duration: 0.16, yoyo: true, repeat: 13, ease: 'power1.out' }, 0)
          .to(J.torso, { rotation: -4, duration: 0.32, yoyo: true, repeat: 6, ease: 'sine.inOut' }, 0)
          .to(J.armF, { rotation: -125, duration: 0.32, yoyo: true, repeat: 6, ease: 'sine.inOut' }, 0)
          .to(J.foreF, { rotation: -55, duration: 0.32, yoyo: true, repeat: 6, ease: 'sine.inOut' }, 0)
          .to(J.armN, { rotation: -38, duration: 0.3, ease: 'back.out(2)' }, 0)
          .to(J.foreN, { rotation: -118, duration: 0.3, ease: 'back.out(2)' }, 0)
          .to(J.headPose, { rotation: 2, duration: 0.3 }, 0)
          .to(lids, { scaleY: 0.3, duration: 0.2 }, 0)
          .to(brows, { y: -3, duration: 0.2 }, 0)
          .to([J.thighN, J.thighF], { rotation: (i) => (i ? 8 : -8), duration: 0.32, yoyo: true, repeat: 6, ease: 'sine.inOut' }, 0)
          .call(puff, null, 0.9)
          .call(() => resetPose(0.5), null, 2.4)
        hold(tl, 3.1)
      })
    }

    const onHome = () => cheer('YES. That one. Go. Please. I’m tired.')
    const onHelp = () => cheer('Support? Bold. They reply faster than I walk.')
    pokeBtn.addEventListener('click', poke)
    homeEl.addEventListener('pointerenter', onHome)
    helpEl.addEventListener('pointerenter', onHelp)

    /* eyes follow the pointer (slowly, he's tired) + stage tilt */
    const eyeX = gsap.quickTo(J.pupils, 'x', { duration: 0.9, ease: 'power3' })
    const eyeY = gsap.quickTo(J.pupils, 'y', { duration: 0.9, ease: 'power3' })
    const tiltX = gsap.quickTo(card, 'rotationX', { duration: 1.1, ease: 'power3' })
    const tiltY = gsap.quickTo(card, 'rotationY', { duration: 1.1, ease: 'power3' })
    const clamp1 = gsap.utils.clamp(-1, 1)

    const onMove = (e) => {
      const r = guide.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height * 0.18)
      eyeX(clamp1(dx / 120) * 1.6 * dir)
      eyeY(clamp1(dy / 120) * 1.1)
      if (!ready || e.pointerType === 'touch') return
      tiltY(clamp1((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 5)
      tiltX(-clamp1((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * 4)
    }
    window.addEventListener('pointermove', onMove)

    const onResize = () => {
      const r = range()
      if (Math.abs(curX()) > r) gsap.set(guide, { x: gsap.utils.clamp(-r, r, curX()) })
    }
    window.addEventListener('resize', onResize)

    /* ---------------- ambient loops ---------------- */
    // lazy blink
    gsap
      .timeline({ repeat: -1, repeatDelay: 3.2 })
      .to(blink, { scaleY: 1, duration: 0.16, ease: 'power1.in' })
      .to(blink, { scaleY: 0, duration: 0.28, ease: 'power1.out' }, '+=0.08')

    // coffee steam
    steam.forEach((el, i) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 4 }, { autoAlpha: 0.9, y: -8, duration: 1.6, repeat: -1, ease: 'sine.inOut', delay: i * 0.5, yoyo: true })
    })

    // breathing (subtle chest/shoulder motion that never stops)
    gsap.to(one('[data-404-poke] svg'), { scaleY: 1.006, transformOrigin: '50% 100%', duration: 2.1, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // bubble hover
    gsap.to(speechWrap, { y: -4, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // background atmosphere
    gsap.to('[data-404-glow]', { scale: 1.13, autoAlpha: 0.8, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.set('[data-404-signal]', { xPercent: -50, yPercent: -50 })
    gsap.fromTo('[data-404-signal]', { scale: 0.5, autoAlpha: 0.5 }, { scale: 1.6, autoAlpha: 0, duration: 4.5, repeat: -1, ease: 'power1.out', stagger: 1.5 })
    q('[data-404-particle]').forEach((el) => {
      gsap.to(el, {
        x: gsap.utils.random(-18, 18),
        y: gsap.utils.random(-30, 30),
        autoAlpha: gsap.utils.random(0.15, 0.7),
        duration: gsap.utils.random(3.5, 7),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
    q('[data-404-star]').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0.15, scale: 0.6 }, { autoAlpha: gsap.utils.random(0.5, 1), scale: 1.2, duration: gsap.utils.random(1, 2.6), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: gsap.utils.random(0, 2) })
    })

    // rotating light along the stage border
    gsap.set('[data-404-sweep]', { xPercent: -50, yPercent: -50 })
    gsap.to('[data-404-sweep]', { rotation: 360, duration: 9, repeat: -1, ease: 'none' })

    // shooting star
    gsap
      .timeline({ repeat: -1, repeatDelay: 6, repeatRefresh: true, delay: 3 })
      .fromTo('[data-404-shoot]', { x: () => gsap.utils.random(0, stageW() * 0.4), y: 0, rotation: 22, autoAlpha: 0 }, { x: () => `+=${gsap.utils.random(180, 280)}`, y: 110, autoAlpha: 1, duration: 0.7, ease: 'power1.in' })
      .to('[data-404-shoot]', { autoAlpha: 0, duration: 0.2 }, '-=0.2')

    // signpost sways, lamp flickers
    gsap.to('[data-404-sign]', { rotation: 1.6, transformOrigin: '50% 100%', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('[data-404-lamplight]', { opacity: 0.35, duration: 0.07, repeat: -1, repeatDelay: 2.6, yoyo: true, ease: 'none' })
    gsap.to('[data-404-lamplight]', { scaleY: 1.03, transformOrigin: '50% 0%', duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // animated text: wavy accent letters, breathing zero, flicker, periodic glitch
    gsap.to('[data-404-char]', { y: -6, duration: 0.55, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.07, delay: 2 })
    gsap.to(digits[1], { scale: 1.04, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
    gsap.to('[data-404-flicker]', { opacity: 0.12, duration: 0.09, repeat: -1, repeatDelay: 3.4, yoyo: true, ease: 'none' })
    gsap
      .timeline({ repeat: -1, repeatDelay: 5, repeatRefresh: true, delay: 4 })
      .to(digits, {
        x: () => gsap.utils.random(-8, 8),
        skewX: () => gsap.utils.random(-14, 14),
        textShadow: '5px 0 rgb(var(--site-accent-rgb)/.9), -5px 0 rgba(255,255,255,.35)',
        duration: 0.06,
        repeat: 3,
        yoyo: true,
      })
      .set(digits, { x: 0, skewX: 0, textShadow: 'none' })

    // "lost for" clock
    const pad = (n) => String(n).padStart(2, '0')
    const clockTimer = window.setInterval(() => {
      seconds += 1
      clock.textContent = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`
    }, 1000)

    /* ---------------- intro sequence ---------------- */
    const begin = () => {
      say('Oh. A visitor. Ugh… fine, I’ll look busy.')
      walkTo(-range() * 0.35, () => {
        say('You look lost. Same, honestly.')
        schedule(2.4)
      })
    }

    gsap
      .timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { ready = true } })
      .fromTo('[data-404-chip]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo(card, { autoAlpha: 0, scale: 0.85, rotationX: 14, rotationY: -12, y: 24 }, { autoAlpha: 1, scale: 1, rotationX: 0, rotationY: 0, y: 0, duration: 1, ease: 'back.out(1.3)' }, '-=0.35')
      .fromTo(digits, { autoAlpha: 0, y: -50, rotationX: -70 }, { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.8)' }, '-=0.6')
      .fromTo('[data-404-prop]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.5')
      .fromTo('[data-404-word]', { autoAlpha: 0, y: 24, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.07, clearProps: 'filter' }, '-=0.3')
      .fromTo('[data-404-sub]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo('[data-404-cta]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo('[data-404-hint]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.2')
      .add(begin, 1.2)

    /* ---------------- cleanup ---------------- */
    return () => {
      alive = false
      gsap.ticker.remove(tick)
      window.clearInterval(clockTimer)
      pending?.kill()
      current?.kill()
      speechTween?.kill()
      zzzTl?.kill()
      pokeBtn.removeEventListener('click', poke)
      homeEl.removeEventListener('pointerenter', onHome)
      helpEl.removeEventListener('pointerenter', onHelp)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      const nodes = page.querySelectorAll('*')
      gsap.killTweensOf(nodes)
      gsap.killTweensOf(ws)
      gsap.set(nodes, { clearProps: 'all' })
    }
  }, [])

  return (
    <section
      ref={pageRef}
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden bg-black px-5 py-14 text-center text-white sm:px-8 sm:py-16 lg:px-10"
    >
      {/* page background: grid, glow, signal rings, particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgb(var(--site-accent-rgb)/.07)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(65%_55%_at_50%_48%,var(--site-black),transparent)]" />
      <div data-404-glow aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] -z-10 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--site-accent-rgb)/.12)] blur-[130px]" />
      {[0, 1, 2].map((i) => (
        <div key={i} data-404-signal aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] -z-10 size-[460px] rounded-full border border-[rgb(var(--site-accent-rgb)/.16)]" />
      ))}
      {PARTICLES.map(([x, y], i) => (
        <span key={i} data-404-particle aria-hidden="true" className="pointer-events-none absolute -z-10 size-1 rounded-full bg-[var(--site-accent)] opacity-40" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}

      <Container>
        <div className="mx-auto flex max-w-[820px] flex-col items-center">
          <span data-404-chip className="inline-flex items-center gap-2.5 rounded-full border border-[rgb(var(--site-accent-rgb)/.24)] bg-[rgb(var(--site-accent-rgb)/.07)] px-3.5 py-2 font-mono text-[9px] font-semibold tracking-[.18em] text-[var(--site-accent-light)] uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--site-accent)] shadow-[0_0_10px_var(--site-accent)] motion-reduce:animate-none" />
            Lost route detected
          </span>

          {/* stage: 1px frame with a light that travels around the edge */}
          <div
            data-404-card
            className="relative mt-5 h-[430px] w-full max-w-[680px] overflow-hidden rounded-[28px] p-px shadow-[0_32px_100px_-55px_rgb(var(--site-accent-rgb)/.58)] sm:h-[500px]"
          >
            <div
              data-404-sweep
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[200%] [background:conic-gradient(from_0deg,transparent_0deg,rgb(var(--site-accent-rgb)/.9)_40deg,transparent_110deg)]"
            />
            <div className="absolute inset-0 rounded-[28px] border border-[rgb(var(--site-accent-rgb)/.2)]" aria-hidden="true" />

            <div className="relative h-full w-full overflow-hidden rounded-[27px] bg-black [background-image:linear-gradient(180deg,rgb(var(--site-white-rgb)/.035),rgb(var(--site-accent-rgb)/.045)_58%,rgb(var(--site-black-rgb)/.92))]">
              {/* stars + shooting star */}
              {STARS.map(([x, y], i) => (
                <span key={i} data-404-star aria-hidden="true" className="pointer-events-none absolute size-[3px] rounded-full bg-white/80" style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
              <span data-404-shoot aria-hidden="true" className="pointer-events-none absolute left-0 top-[12%] h-px w-20 bg-[linear-gradient(90deg,transparent,var(--site-accent-light))] opacity-0" />

              {/* giant outlined 404 the guide walks in front of */}
              <div className="absolute left-1/2 top-6 w-full -translate-x-1/2 px-5">
                <span className="block font-mono text-[10px] font-semibold tracking-[.22em] text-white/38 uppercase">Error code</span>
                <span className="sr-only">Error 404</span>
                <div aria-hidden="true" className="mt-1 flex items-start justify-center gap-[.04em] text-[clamp(6.5rem,23vw,12.5rem)] font-[850] leading-[.9] tracking-[-.06em] text-[rgb(var(--site-white-rgb)/.04)] [-webkit-text-stroke:1.5px_rgb(var(--site-accent-rgb)/.5)] [perspective:600px]">
                  <span data-404-digit className="inline-block">4</span>
                  <span data-404-digit className="inline-block text-[rgb(var(--site-accent-rgb)/.12)] [-webkit-text-stroke:2px_var(--site-accent)] [filter:drop-shadow(0_0_18px_rgb(var(--site-accent-rgb)/.55))]">0</span>
                  <span data-404-digit className="inline-block">4</span>
                </div>
              </div>

              {/* scenery */}
              <Lamp />
              <Signpost />

              {/* ground */}
              <div aria-hidden="true" className="absolute bottom-[59px] left-1/2 h-px w-[88%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(var(--site-accent-rgb)/.5),transparent)]" />
              <div aria-hidden="true" className="absolute bottom-[24px] left-1/2 h-[70px] w-[88%] -translate-x-1/2 rounded-[50%] border border-[rgb(var(--site-accent-rgb)/.12)]" />

              {/* dust puffs + pebble */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} data-404-dust aria-hidden="true" className="pointer-events-none absolute bottom-[56px] left-1/2 z-[3] size-2 rounded-full bg-white/40 opacity-0" />
              ))}
              <span data-404-pebble aria-hidden="true" className="pointer-events-none absolute bottom-[57px] left-1/2 z-[3] size-2.5 rounded-full bg-[#b9b3cc] opacity-0" />

              <LazyGuide />

              <div aria-hidden="true" className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[9px] tracking-[.16em] text-white/40">
                <span className="size-2 animate-pulse rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_var(--site-accent)] motion-reduce:animate-none" />
                LOST FOR <span data-404-clock className="tabular-nums text-[var(--site-accent-light)]">00:00</span>
              </div>
              <div data-404-flicker aria-hidden="true" className="absolute bottom-4 right-5 font-mono text-[8px] tracking-[.16em] text-white/28">ROUTE_OFFLINE</div>
            </div>
          </div>

          <h1
            aria-label="Looks like you took a wrong turn."
            className="mt-7 text-[clamp(2.1rem,7vw,4.25rem)] font-[800] leading-[1] tracking-[-.055em] text-balance"
          >
            <span aria-hidden="true">
              {HEADLINE_WORDS.map((w) => (
                <span key={w}>
                  <span data-404-word className="inline-block">{w}</span>{' '}
                </span>
              ))}
              <span data-404-word className="inline-block whitespace-nowrap text-[var(--site-accent)]">
                {ACCENT_CHARS.map((c, i) => (
                  <span key={i} data-404-char className="inline-block">{c === ' ' ? '\u00A0' : c}</span>
                ))}
              </span>
            </span>
          </h1>

          <p data-404-sub className="mt-4 max-w-[570px] text-sm leading-[1.75] text-white/58 sm:text-base">
            Our lazy little guide got lost too. Follow the signal back home before he decides to take a nap.
          </p>

          <div data-404-cta className="mt-7 flex w-full max-w-[430px] flex-col gap-3 sm:flex-row">
            <div data-404-home className="relative w-full sm:flex-1">
              <span data-404-ring aria-hidden="true" className="pointer-events-none absolute -inset-1.5 rounded-[18px] border border-[var(--site-accent)] opacity-0" />
              <Button to="/" label="Back to home" size="lg" rightIcon={<span aria-hidden="true">↗</span>} className="w-full rounded-[14px] !justify-between px-5" />
            </div>
            <div data-404-help className="relative w-full sm:flex-1">
              <Button to="/contact" label="Ask for help" variant="secondary" size="lg" rightIcon={<span aria-hidden="true">→</span>} className="w-full rounded-[14px] !justify-between px-5" />
            </div>
          </div>

          <p data-404-hint className="mt-5 text-[11px] text-white/40">
            Tip: poke the guide. He hates it.
          </p>
        </div>
      </Container>
    </section>
  )
}