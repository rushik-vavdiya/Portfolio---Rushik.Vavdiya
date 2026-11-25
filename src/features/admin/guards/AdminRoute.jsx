import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useToast from '../../../components/ui/useToast.js'
import { getCurrentUser } from '../api/auth/authApi.js'

export default function AdminRoute() {
  const location = useLocation()
  const { dismissAll, notify } = useToast()
  const [status, setStatus] = useState('checking')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    getCurrentUser()
      .then((user) => {
        if (isCurrent) {
          setStatus(user.role === 'admin' ? 'authenticated' : 'forbidden')
        }
      })
      .catch((requestError) => {
        if (!isCurrent) return

        if (requestError.response?.status === 401) {
          setStatus('unauthenticated')
          return
        }

        notify(
          requestError.response?.data?.message
          ?? requestError.message
          ?? 'Unable to verify your session.',
          { type: 'error', duration: 0 },
        )
        setStatus('error')
      })

    return () => {
      isCurrent = false
    }
  }, [notify, retryCount])

  if (status === 'checking') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5 text-[var(--site-text-muted)]">
        Checking your session…
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (status === 'forbidden') {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-5 text-center">
        <h1 className="text-2xl font-semibold text-[var(--site-text)]">Admin access required</h1>
        <p className="max-w-lg text-[var(--site-text-muted)]">
          Your account is signed in, but it does not have the admin role.
        </p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-[var(--site-text-muted)]">Your admin session could not be verified.</p>
        <button
          className="rounded-xl bg-[var(--site-accent)] px-5 py-3 font-semibold text-[var(--site-black)] transition hover:brightness-110"
          onClick={() => {
            dismissAll()
            setStatus('checking')
            setRetryCount((count) => count + 1)
          }}
          type="button"
        >
          Retry session check
        </button>
      </section>
    )
  }

  return <Outlet />
}
