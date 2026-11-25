export default function formatDate(value, options) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(undefined, options ?? {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
