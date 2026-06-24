import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import { useContactForm } from '@/hooks/useContactForm'
import Button from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner/Spinner'

const PROJECT_TYPES = [
  { value: 'ui_ux', label: 'UI/UX Design' },
  { value: 'web_dev', label: 'Web Development' },
  { value: 'branding', label: 'Branding' },
  { value: 'cms_seo', label: 'CMS & SEO' },
  { value: 'other', label: 'Other' },
]

const BUDGET_RANGES = [
  { value: '<2k', label: 'Under $2,000' },
  { value: '2k-5k', label: '$2,000 – $5,000' },
  { value: '5k-10k', label: '$5,000 – $10,000' },
  { value: '10k-20k', label: '$10,000 – $20,000' },
  { value: '>20k', label: '$20,000+' },
]

const inputClass =
  'w-full px-4 py-3 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors'
const labelClass = 'block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wide'
const errorClass = 'mt-1 text-xs text-red-500'

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useUIStore()
  const { form, onSubmit, isPending } = useContactForm()
  const { register, formState: { errors } } = form

  useEffect(() => {
    if (!isContactModalOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeContactModal()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isContactModalOpen, closeContactModal])

  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isContactModalOpen])

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={closeContactModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-bg rounded-2xl shadow-lg pointer-events-auto max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-bg px-6 pt-6 pb-4 border-b border-border rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 id="modal-title" className="font-display text-2xl text-text-primary">
                      Let's talk
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      Tell me about your project and I'll be in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={closeContactModal}
                    className="ml-4 p-2 rounded-lg hover:bg-card transition-colors text-text-secondary hover:text-text-primary"
                    aria-label="Close modal"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={inputClass}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                {/* Project type + budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="project_type" className={labelClass}>Project Type</label>
                    <select
                      id="project_type"
                      className={inputClass}
                      {...register('project_type', { required: 'Select a project type' })}
                    >
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt.value} value={pt.value}>{pt.label}</option>
                      ))}
                    </select>
                    {errors.project_type && <p className={errorClass}>{errors.project_type.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="budget_range" className={labelClass}>Budget Range</label>
                    <select
                      id="budget_range"
                      className={inputClass}
                      {...register('budget_range')}
                    >
                      <option value="">Not sure</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project…"
                    className={`${inputClass} resize-none`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Please write at least 20 characters' },
                    })}
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Spinner size={16} />
                      Sending…
                    </span>
                  ) : (
                    'SEND MESSAGE →'
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
