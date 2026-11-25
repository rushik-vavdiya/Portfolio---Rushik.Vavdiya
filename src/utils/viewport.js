let frameId = 0
let listening = false
const sizeTrackers = new Set()
const viewportTrackers = new Set()
const rootScrollListeners = new Map()

function getRootMargins(rootMargin, rootWidth) {
  if (typeof rootMargin === 'number') return [rootMargin, rootMargin, rootMargin, rootMargin]

  const values = String(rootMargin || '0px').trim().split(/\s+/).map((part) => {
    const value = Number.parseFloat(part)
    if (!Number.isFinite(value)) return 0
    return part.endsWith('%') ? (value / 100) * rootWidth : value
  })

  if (values.length === 1) return [values[0], values[0], values[0], values[0]]
  if (values.length === 2) return [values[0], values[1], values[0], values[1]]
  if (values.length === 3) return [values[0], values[1], values[2], values[1]]
  return values.slice(0, 4)
}

function isInViewport(element, { root = null, rootMargin = 0, threshold = 0 } = {}) {
  const view = element.ownerDocument?.defaultView || window
  const bounds = element.getBoundingClientRect()
  const rootRect = root && root !== view && root !== view.document
    ? root.getBoundingClientRect()
    : { top: 0, left: 0, right: view.innerWidth, bottom: view.innerHeight, width: view.innerWidth }
  const rootBounds = root && root !== view && root !== view.document
    ? {
        top: rootRect.top + root.clientTop,
        left: rootRect.left + root.clientLeft,
        right: rootRect.left + root.clientLeft + root.clientWidth,
        bottom: rootRect.top + root.clientTop + root.clientHeight,
        width: root.clientWidth,
      }
    : rootRect
  const [marginTop, marginRight, marginBottom, marginLeft] = getRootMargins(rootMargin, rootBounds.width)
  const top = rootBounds.top - marginTop
  const right = rootBounds.right + marginRight
  const bottom = rootBounds.bottom + marginBottom
  const left = rootBounds.left - marginLeft
  const visibleHeight = Math.max(0, Math.min(bounds.bottom, bottom) - Math.max(bounds.top, top))
  const visibleWidth = Math.max(0, Math.min(bounds.right, right) - Math.max(bounds.left, left))
  const area = Math.max(0, bounds.width * bounds.height)
  const ratio = area ? (visibleWidth * visibleHeight) / area : 0

  return threshold === 0
    ? bounds.bottom > top && bounds.top < bottom && bounds.right > left && bounds.left < right
    : ratio >= threshold
}

function scheduleCheck() {
  if (!frameId) frameId = window.requestAnimationFrame(checkAll)
}

function checkAll() {
  frameId = 0
  const callbacks = []
  Array.from(sizeTrackers).forEach((tracker) => tracker.updateIfChanged(callbacks))
  Array.from(viewportTrackers).forEach((tracker) => tracker.updateIfChanged(callbacks))
  callbacks.forEach((callback) => callback())
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', scheduleCheck, { passive: true })
  window.addEventListener('resize', scheduleCheck, { passive: true })
}

function stopListeningIfIdle() {
  if (!listening || sizeTrackers.size || viewportTrackers.size) return
  listening = false
  window.removeEventListener('scroll', scheduleCheck)
  window.removeEventListener('resize', scheduleCheck)
  if (frameId) window.cancelAnimationFrame(frameId)
  frameId = 0
}

function listenToRoot(root, view) {
  if (!root || root === view || root === view.document || typeof root.addEventListener !== 'function') return () => {}

  const count = rootScrollListeners.get(root) || 0
  if (!count) root.addEventListener('scroll', scheduleCheck, { passive: true })
  rootScrollListeners.set(root, count + 1)

  let active = true
  return () => {
    if (!active) return
    active = false
    const currentCount = rootScrollListeners.get(root) || 0
    if (currentCount <= 1) {
      root.removeEventListener('scroll', scheduleCheck)
      rootScrollListeners.delete(root)
    } else {
      rootScrollListeners.set(root, currentCount - 1)
    }
  }
}

export function trackViewport(element, callback, options = {}) {
  if (!element) return () => {}

  const root = options.root || null
  const view = element.ownerDocument?.defaultView || window
  let lastVisible = null
  const tracker = {
    updateIfChanged(callbacks) {
      if (!element.isConnected) return
      const visible = isInViewport(element, options)
      if (lastVisible === visible) return
      lastVisible = visible
      callbacks.push(() => callback(visible))
    },
  }

  viewportTrackers.add(tracker)
  const stopRootListening = listenToRoot(root, view)
  startListening()
  scheduleCheck()

  return () => {
    viewportTrackers.delete(tracker)
    stopRootListening()
    stopListeningIfIdle()
  }
}

export function trackElementSize(element, callback) {
  if (!element) return () => {}

  let previousWidth = -1
  let previousHeight = -1
  const tracker = {
    updateIfChanged(callbacks) {
      if (!element.isConnected) return
      const { width, height } = element.getBoundingClientRect()
      if (width === previousWidth && height === previousHeight) return
      previousWidth = width
      previousHeight = height
      if (callbacks) callbacks.push(() => callback())
      else callback()
    },
  }

  sizeTrackers.add(tracker)
  startListening()
  tracker.updateIfChanged()

  return () => {
    sizeTrackers.delete(tracker)
    stopListeningIfIdle()
  }
}
