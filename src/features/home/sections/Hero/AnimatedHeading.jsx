import { Fragment } from 'react'

export default function AnimatedHeading({ lines }) {
  let wordIndex = 0
  return (
    <h1 className="m-[10px_0_4px] max-w-[760px] text-[clamp(32px,5vw,64px)] font-bold leading-[1.12] tracking-[-.035em]">
      {lines.map((line, lineIndex) => (
        <span className="block" key={lineIndex}>
          {line.map((word, index) => {
            const currentIndex = wordIndex++
            return (
              <Fragment key={`${word.text}-${index}`}>
                <span
                  className={`inline-block align-baseline opacity-0 [transform:translateY(40px)_scale(.96)] [filter:blur(14px)] ${word.accent ? 'hero-heading-shine' : 'hero-heading-solid'}`}
                  style={{ '--hero-word-index': currentIndex }}
                  aria-label={word.text}
                >
                  {word.text}
                </span>
                {index < line.length - 1 ? ' ' : null}
              </Fragment>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
