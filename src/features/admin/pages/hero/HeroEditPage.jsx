import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeroEntryTabs from '../../components/HeroEntryTabs.jsx'
import HeroFormActions from '../../components/HeroFormActions.jsx'
import HeroFormFields from '../../components/HeroFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import {
  fetchAllHeroes,
  updateHeroRecord,
  updateHeroStatusRecord,
} from '../../slices/hero/heroSlice.js'

const selectClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)] outline-none transition focus:border-[var(--site-accent)] [&>option]:bg-[var(--site-black)] [&>option]:text-[var(--site-text)]'
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'
const cleanItems = (items) => items.map((item) => item.trim()).filter(Boolean)

const toForm = (hero) => ({
  eyebrow: hero.sectionHeader?.eyebrow ?? '',
  heading: hero.sectionHeader?.heading ?? '',
  highlightHeading: hero.sectionHeader?.highlightHeading ?? '',
  description: hero.sectionHeader?.description ?? '',
  availabilityStatus: hero.availablity?.status ?? 'open',
  availabilityMessage: hero.availablity?.message ?? '',
  rotatingText: hero.rotatingText?.length ? [...hero.rotatingText] : [],
  skills: hero.skills?.length ? [...hero.skills] : [],
  buttons: hero.buttons?.map((button) => ({
    label: button.label ?? '',
    link: button.link ?? '',
    buttonType: button.buttonType ?? 'primary',
  })) ?? [],
  floatingCard: hero.floatingCard?.map((card) => ({
    title: card.title ?? '',
    description: card.description ?? '',
    image: card.image ?? '',
    icon: card.icon ?? '',
  })) ?? [],
})

const getHeroId = (hero) => hero?._id ?? hero?.id

export default function HeroEditPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { dismissAll, notify } = useToast()
  const { heroId: routeHeroId } = useParams()
  const { items, selectedHero, requests } = useSelector((state) => state.hero)
  const [draft, setDraft] = useState(null)
  const selectedIdExists = items.some((item) => String(getHeroId(item)) === routeHeroId)
  const resolvedSelectedId = selectedIdExists
    ? routeHeroId
    : items.length
      ? String(getHeroId(items[0]))
      : ''
  const selectedItem = items.find((item) => String(getHeroId(item)) === resolvedSelectedId)
  const hero = selectedHero && String(getHeroId(selectedHero)) === resolvedSelectedId
    ? selectedHero
    : selectedItem
  const form = hero
    ? draft?.heroId === resolvedSelectedId
      ? draft.values
      : toForm(hero)
    : null
  const isLoading = requests.all.status === 'loading'
  const isSaving = requests.update.status === 'loading'
  const isChangingStatus = requests.status.status === 'loading'

  useEffect(() => {
    dispatch(fetchAllHeroes())
  }, [dispatch])

  useEffect(() => {
    if (!requests.all.error) return
    notify(requests.all.error, {
      type: 'error',
      duration: 0,
      action: { label: 'Retry', onClick: () => dispatch(fetchAllHeroes()) },
    })
  }, [dispatch, notify, requests.all.error])

  const updateField = (event) => {
    const { name, value } = event.target
    if (!form) return
    setDraft({
      heroId: resolvedSelectedId,
      values: { ...form, [name]: value },
    })
  }

  const updateList = (name, values) => {
    if (!form) return
    setDraft({
      heroId: resolvedSelectedId,
      values: { ...form, [name]: values },
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!hero || !form) return

    const result = await dispatch(updateHeroRecord({
      heroId: getHeroId(hero),
      heroData: {
        availablity: {
          status: form.availabilityStatus,
          message: form.availabilityMessage.trim(),
        },
        sectionHeader: {
          eyebrow: form.eyebrow.trim(),
          heading: form.heading.trim(),
          highlightHeading: form.highlightHeading.trim(),
          description: form.description.trim(),
        },
        rotatingText: cleanItems(form.rotatingText),
        skills: cleanItems(form.skills),
        buttons: form.buttons
          .map((button) => ({ ...button, label: button.label.trim(), link: button.link.trim() }))
          .filter((button) => button.label && button.link),
        floatingCard: form.floatingCard
          .map((card) => ({
            ...card,
            title: card.title.trim(),
            description: card.description.trim(),
            image: card.image.trim(),
            icon: card.icon.trim(),
          }))
          .filter((card) => card.title),
      },
    }))

    if (updateHeroRecord.fulfilled.match(result)) {
      notify('Hero changes saved.')
    } else if (updateHeroRecord.rejected.match(result)) {
      notify(result.payload ?? result.error.message ?? 'Unable to save Hero changes.', { type: 'error' })
    }
  }

  const handleStatusChange = async () => {
    if (!hero) return
    const result = await dispatch(updateHeroStatusRecord({
      heroId: getHeroId(hero),
      isActive: !hero.isActive,
    }))

    if (updateHeroStatusRecord.fulfilled.match(result)) {
      notify(`Hero ${hero.isActive ? 'deactivated' : 'activated'}.`)
    } else if (updateHeroStatusRecord.rejected.match(result)) {
      notify(result.payload ?? result.error.message ?? 'Unable to update Hero status.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">
            Home Page / Hero
          </p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Edit Hero content
          </h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Update the content and availability shown on your home page.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3.5 py-2 text-xs font-medium text-[var(--site-text-muted)]">
          <span className="size-2 rounded-full bg-[var(--site-accent)]" />
          Existing entry
        </span>
      </header>

      <HeroEntryTabs activeTab="all" />

      {requests.all.error && (
        <div className="flex justify-end">
          <button
            className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)]"
            onClick={() => {
              dismissAll()
              dispatch(fetchAllHeroes())
            }}
            type="button"
          >
            Retry loading entry
          </button>
        </div>
      )}

      {isLoading && <p className="text-sm text-[var(--site-text-muted)]">Loading Hero entries…</p>}

      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6 sm:p-8">
          <h2 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No Hero entries yet</h2>
          <p className="mb-5 text-sm leading-6 text-[var(--site-text-muted)]">
            Create an entry first, then return here to edit it.
          </p>
          <Link
            className="inline-flex items-center rounded-xl bg-[var(--site-accent)] px-4 py-3 text-sm font-semibold text-[var(--site-black)] transition hover:brightness-110"
            to="/admin/home/hero/create"
          >
            Create Hero entry
          </Link>
        </div>
      )}

      {!!items.length && hero && form && (
        <div className="space-y-5">
          <section className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 sm:p-6">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                {items.length > 1 ? (
                  <label className={labelClass} htmlFor="hero-choice">
                    Hero entry
                    <select
                      className={selectClass}
                      id="hero-choice"
                      onChange={(event) => {
                        setDraft(null)
                        navigate(`/admin/home/hero/edit/${event.target.value}`)
                      }}
                      value={resolvedSelectedId}
                    >
                      {items.map((item) => {
                        const id = String(getHeroId(item))
                        return (
                          <option key={id} value={id}>
                            {item.sectionHeader?.heading || 'Untitled Hero'}{item.isActive ? ' · Active' : ''}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                ) : (
                  <div className="flex min-h-[76px] min-w-0 items-center rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-4 py-3">
                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-[var(--site-text-subtle)]">Editing Hero entry</p>
                      <p className="m-0 truncate text-sm font-semibold text-[var(--site-text)]">
                        {hero.sectionHeader?.heading || 'Untitled Hero'}
                      </p>
                    </div>
                  </div>
                )}
                <label
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--site-accent-light)] md:min-w-64 ${
                    hero.isActive
                      ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]'
                      : 'border-[var(--site-border-soft)] bg-[var(--site-glass)] hover:border-[var(--site-border)]'
                  } ${isChangingStatus ? 'cursor-wait opacity-60' : ''}`}
                  htmlFor="hero-active-checkbox"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                      hero.isActive
                        ? 'bg-[var(--site-accent)] text-[var(--site-black)]'
                        : 'bg-[var(--site-glass-hover)] text-[var(--site-text-subtle)]'
                    }`}>
                      <span className={`size-2.5 rounded-full ${
                        hero.isActive ? 'bg-[var(--site-black)]' : 'bg-[var(--site-text-subtle)]'
                      }`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--site-text)]">
                        {hero.isActive ? 'Active on homepage' : 'Inactive'}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--site-text-subtle)]">
                        {isChangingStatus
                          ? 'Updating status…'
                          : hero.isActive
                            ? 'Visible to visitors'
                            : 'Hidden from visitors'}
                      </span>
                    </span>
                  </span>
                  <input
                    checked={hero.isActive}
                    className="sr-only"
                    disabled={isChangingStatus}
                    id="hero-active-checkbox"
                    onChange={handleStatusChange}
                    type="checkbox"
                  />
                  <span className={`grid size-6 shrink-0 place-items-center rounded-md border transition ${
                    hero.isActive
                      ? 'border-[var(--site-accent)] bg-[var(--site-accent)] text-[var(--site-black)]'
                      : 'border-[var(--site-border)] bg-[var(--site-black)] text-transparent'
                  }`}>
                    {hero.isActive && (
                      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 16 16">
                        <path d="m3 8 3.2 3.2L13 4.5" />
                      </svg>
                    )}
                  </span>
                </label>
              </div>
          </section>

          <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
            <HeroFormFields
              form={form}
              idPrefix="edit-hero"
              onFieldChange={updateField}
              onListChange={updateList}
            />

            <HeroFormActions
              isSubmitting={isSaving}
              pendingLabel="Saving…"
              submitLabel="Save changes"
            />
          </form>
        </div>
      )}
    </section>
  )
}
