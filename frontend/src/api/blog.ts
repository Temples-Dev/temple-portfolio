import client from './client'
import type { BlogPost, PaginatedResponse } from '@/types'

export async function fetchPosts(params?: {
  page?: number
  tag?: string
}): Promise<PaginatedResponse<BlogPost>> {
  const { data } = await client.get('/blog/', { params })
  return data
}

export async function fetchPost(slug: string): Promise<BlogPost> {
  const { data } = await client.get(`/blog/${slug}/`)
  return data
}
