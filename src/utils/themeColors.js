export function getThemeRgb(token) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  const channels = value.split(/\s+/).map(Number)
  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)) {
    throw new Error(`Invalid theme color token: ${token}`)
  }
  return channels
}

export function themeColor(channels, alpha = 1) {
  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)) {
    throw new Error('Theme color must contain three RGB channels between 0 and 255.')
  }
  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) {
    throw new Error('Theme color opacity must be between 0 and 1.')
  }
  return `rgba(${channels.join(',')},${alpha})`
}

export function themeHex(channels) {
  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)) {
    throw new Error('Theme color must contain three RGB channels between 0 and 255.')
  }
  return `#${channels.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`
}

export function themeShaderVector(channels) {
  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)) {
    throw new Error('Theme color must contain three RGB channels between 0 and 255.')
  }
  return channels.map((channel) => (channel / 255).toFixed(3)).join(',')
}
