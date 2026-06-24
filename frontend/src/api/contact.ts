import client from './client'
import type { ContactFormData } from '@/types'

export async function submitContact(data: ContactFormData) {
  const response = await client.post('/contact/', data)
  return response.data
}
