import Button from './Button.jsx'

export default function SliderControls({ swiper, label = 'carousel', paginationClass = '' }) {
  return (
    <div className="mt-[12px] flex min-h-7 items-center justify-center gap-[12px]" aria-label={`${label} controls`}>
      <Button asButton iconOnly variant="icon" type="button" aria-label={`Previous ${label}`} onClick={() => swiper?.slidePrev()} disabled={!swiper}>
        <span aria-hidden="true">←</span>
      </Button>
      <div className={`flex min-h-3 items-center justify-center gap-[6px] ${paginationClass}`} />
      <Button asButton iconOnly variant="icon" type="button" aria-label={`Next ${label}`} onClick={() => swiper?.slideNext()} disabled={!swiper}>
        <span aria-hidden="true">→</span>
      </Button>
    </div>
  )
}
