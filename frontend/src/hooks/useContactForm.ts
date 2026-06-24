import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { submitContact } from '@/api/contact'
import type { ContactFormData } from '@/types'
import { useUIStore } from '@/store/uiStore'

export function useContactForm() {
  const closeModal = useUIStore((s) => s.closeContactModal)

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      project_type: 'web_dev',
      budget_range: undefined,
      message: '',
    },
  })

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (data) => {
      toast.success(data.message || "Thanks! I'll be in touch within 24 hours.")
      form.reset()
      closeModal()
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.')
    },
  })

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data))

  return { form, onSubmit, isPending: mutation.isPending }
}
