export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function joinClassNames(...values) {
  return values.filter(Boolean).join(' ')
}
