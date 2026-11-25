import Button from '../../../../components/ui/Button.jsx'

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 20 20">
      <path d="M5.5 14.5 14 6" />
      <path d="M6.5 6H14v7.5" />
    </svg>
  )
}

export default function CTAButtons({ buttons }) {
  return (
    <div className="mt-2 flex w-full max-w-[440px] flex-nowrap justify-center gap-2 px-2 sm:max-w-[520px] sm:gap-[14px] sm:px-1">
      {buttons.map((button, index) => {
        const isPrimary = button.buttonType !== 'secondary'
        const isExternal = /^https?:\/\//i.test(button.to)

        return (
          <Button
            key={`${button.label}-${index}`}
            href={isExternal ? button.to : undefined}
            external={isExternal}
            to={button.to}
            variant={isPrimary ? 'primary' : 'secondary'}
            size="md"
            label={button.label}
            rightIcon={<ArrowUpRightIcon />}
            className="min-w-0 flex-1 !shrink !gap-1.5 !px-1.5 py-3 !text-[11px] min-[380px]:!gap-2 min-[380px]:!px-2.5 min-[380px]:!text-[12px] sm:flex-none sm:!shrink-0 sm:!gap-2 sm:!px-7 sm:py-4 sm:!text-[16px]"
          />
        )
      })}
    </div>
  )
}
