import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useToast from '../../../../components/ui/useToast.js'
import { login, register } from '../../api/auth/authApi.js'

const inputClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-4 py-3 text-[var(--site-text)] outline-none transition focus:border-[var(--site-accent)]'
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'

export default function AdminAuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const { notify } = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setEmailAlreadyRegistered(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEmailAlreadyRegistered(false)

    if (isRegister && form.password !== form.confirmPassword) {
      notify('Passwords do not match.', { type: 'error' })
      return
    }

    setIsSubmitting(true)

    try {
      if (isRegister) {
        await register({ name: form.name, email: form.email, password: form.password })
        setForm({ name: '', email: '', password: '', confirmPassword: '' })
        notify('Account created. Admin access must be granted separately.')
        return
      }

      await login({ email: form.email, password: form.password })
      navigate('/admin', { replace: true })
    } catch (requestError) {
      const isDuplicateEmail = isRegister && requestError.response?.status === 409
      const validationErrors = requestError.response?.data?.data
      const validationMessage = Array.isArray(validationErrors)
        ? validationErrors.map(({ field, message }) => `${field}: ${message}`).join(' ')
        : null
      notify(
        isDuplicateEmail
          ? 'An account with this email already exists. Please log in.'
          : validationMessage
            ?? requestError.response?.data?.message
            ?? requestError.message
            ?? 'Unable to authenticate. Please try again.',
        { type: 'error' },
      )
      setEmailAlreadyRegistered(isDuplicateEmail)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[var(--site-black)] px-5 py-6 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(var(--site-accent-rgb)/.18),var(--site-transparent)_60%)]" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between">
        <Link className="flex items-center gap-3 text-sm font-bold text-[var(--site-text)]" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--site-accent)] text-xs font-black text-[var(--site-black)]">CMS</span>
          <span>Content studio</span>
        </Link>
        <Link className="text-sm font-semibold text-[var(--site-text-muted)] transition hover:text-[var(--site-accent-light)]" to="/">
          Back to website <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <main className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <aside className="hidden lg:block">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">
            Private workspace
          </p>
          <h2 className="mb-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[var(--site-text)] xl:text-5xl">
            Your website content, organized in one place.
          </h2>
          <p className="max-w-lg text-base leading-7 text-[var(--site-text-muted)]">
            Sign in to manage homepage sections and keep your published content up to date.
          </p>
          <div className="mt-10 max-w-md rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-panel-surface)]/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--site-text-subtle)]">Your content</span>
              <span className="flex items-center gap-2 text-xs font-medium text-[var(--site-accent-light)]">
                <span className="size-1.5 rounded-full bg-[var(--site-accent)]" /> Workspace
              </span>
            </div>
            {['Hero', 'About', 'Services', 'Build'].map((name, index) => (
              <div className={`flex items-center justify-between gap-4 py-3 ${index < 3 ? 'border-b border-[var(--site-border-soft)]' : ''}`} key={name}>
                <span className="flex items-center gap-3 text-sm font-medium text-[var(--site-text)]">
                  <span className="grid size-7 place-items-center rounded-lg bg-[var(--site-accent-wash)] text-[10px] font-bold text-[var(--site-accent-light)]">{name[0]}</span>
                  {name}
                </span>
                <span className="text-xs text-[var(--site-text-subtle)]">Manage content</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-panel-surface)]/80 p-6 shadow-[0_24px_80px_rgb(var(--site-black-rgb)/.35)] backdrop-blur sm:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[var(--site-accent-light)]">
            Admin access
          </p>
          <h1 className="text-3xl font-semibold text-[var(--site-text)]">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mb-7 mt-2 text-sm leading-6 text-[var(--site-text-muted)]">
            {isRegister ? 'Register to continue to the admin page.' : 'Log in to continue to the admin page.'}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <label className={labelClass} htmlFor="admin-name">
                Name
                <input
                  autoComplete="name"
                  className={inputClass}
                  id="admin-name"
                  maxLength={100}
                  name="name"
                  onChange={updateField}
                  required
                  value={form.name}
                />
              </label>
            )}

            <label className={labelClass} htmlFor="admin-email">
              Email
              <input
                autoComplete="email"
                className={inputClass}
                id="admin-email"
                maxLength={254}
                name="email"
                onChange={updateField}
                required
                type="email"
                value={form.email}
              />
            </label>

            <label className={labelClass} htmlFor="admin-password">
              Password
              <input
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                className={inputClass}
                id="admin-password"
                minLength={8}
                name="password"
                onChange={updateField}
                required
                type="password"
                value={form.password}
              />
            </label>

            {isRegister && (
              <label className={labelClass} htmlFor="admin-confirm-password">
                Confirm password
                <input
                  autoComplete="new-password"
                  className={inputClass}
                  id="admin-confirm-password"
                  minLength={8}
                  name="confirmPassword"
                  onChange={updateField}
                  required
                  type="password"
                  value={form.confirmPassword}
                />
              </label>
            )}

            {emailAlreadyRegistered && (
              <Link
                className="block text-sm font-semibold text-[var(--site-accent-light)] transition hover:text-[var(--site-text)]"
                to="/admin/login"
              >
                Go to login
              </Link>
            )}

            <button
              className="w-full rounded-xl bg-[var(--site-accent)] px-6 py-3 font-semibold text-[var(--site-black)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--site-text-muted)]">
            {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
            <Link
              className="font-semibold text-[var(--site-accent-light)] transition hover:text-[var(--site-text)]"
              to={isRegister ? '/admin/login' : '/admin/register'}
            >
              {isRegister ? 'Log in' : 'Register'}
            </Link>
          </p>
        </div>
      </main>
    </section>
  )
}
