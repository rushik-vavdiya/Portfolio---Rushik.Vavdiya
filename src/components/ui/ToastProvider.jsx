import { useCallback, useEffect, useState } from 'react'
import ToastContext from './ToastContext.js'
import Button from './Button.jsx'

const MAX_VISIBLE_TOASTS = 2
let nextToastId = 0

function ToastIcon({ type }) {
  return type === 'error' ? (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  )
}

function ToastCard({ onDismiss, toast }) {
  useEffect(() => {
    if (toast.duration === 0) return undefined

    const timeoutId = window.setTimeout(() => onDismiss(toast.id), toast.duration)
    return () => window.clearTimeout(timeoutId)
  }, [onDismiss, toast.duration, toast.id])

  const isError = toast.type === 'error'

  return (
    <div
      className="notification-enter flex w-fit max-w-full items-center gap-2 px-2 py-1 drop-shadow-[0_2px_10px_rgb(var(--site-black-rgb)/.9)]"
      role={isError ? 'alert' : 'status'}
    >
      <span className={`grid size-7 shrink-0 place-items-center rounded-full ${
        isError
          ? 'bg-[var(--site-status-red)]/10 text-[var(--site-status-red)]'
          : 'bg-[var(--site-status-green)]/10 text-[var(--site-status-green)]'
      }`}>
        <ToastIcon type={toast.type} />
      </span>
      <p
        className={`m-0 min-w-0 max-w-[26rem] flex-1 truncate whitespace-nowrap text-sm font-medium ${
          isError ? 'text-[var(--site-status-red)]' : 'text-[var(--site-status-green)]'
        }`}
        title={toast.message}
      >
        {toast.message}
      </p>
      {toast.action && (
        <Button asButton unstyled
          className="shrink-0 rounded-xl border-0 bg-transparent px-2 py-1 text-xs font-semibold text-[var(--site-accent-light)] underline decoration-[var(--site-accent-glow)] underline-offset-4 transition hover:text-[var(--site-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]"
          onClick={() => {
            onDismiss(toast.id)
            toast.action.onClick()
          }}
          type="button"
        >
          {toast.action.label}
        </Button>
      )}
      <Button asButton iconOnly
        aria-label={`Dismiss ${isError ? 'error' : 'success'} notification`}
        className="!size-7 shrink-0 rounded-xl !border-0 !bg-transparent text-[var(--site-text-subtle)] transition hover:text-[var(--site-text)]"
        onClick={() => onDismiss(toast.id)}
        type="button"
      >
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </Button>
    </div>
  )
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const notify = useCallback((message, options = {}) => {
    if (!message) return

    const toast = {
      id: ++nextToastId,
      message: String(message),
      type: options.type === 'error' ? 'error' : 'success',
      duration: options.duration ?? 5000,
      action: options.action,
    }

    setToasts((current) => [...current, toast].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  return (
    <ToastContext.Provider value={{ dismissAll, notify }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] flex flex-col items-center gap-3 px-4 sm:top-5">
        {toasts.map((toast) => (
          <div className="pointer-events-auto w-fit max-w-full" key={toast.id}>
            <ToastCard onDismiss={dismiss} toast={toast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
