export default function Container({ as: Element = 'div', children, className = '', ...props }) {
  return (
    <Element className={`site-container box-border mx-auto w-full min-w-0 max-w-[1200px] ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}
