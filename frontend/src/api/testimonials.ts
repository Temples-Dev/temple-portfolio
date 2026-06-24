import client from './client'
import type { Testimonial, PaginatedResponse } from '@/types'

export async function fetchTestimonials(): Promise<PaginatedResponse<Testimonial>> {
  const { data } = await client.get('/testimonials/')
  return data
}
