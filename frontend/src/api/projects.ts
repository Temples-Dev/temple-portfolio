import client from './client'
import type { Project, PaginatedResponse } from '@/types'

export async function fetchProjects(params?: {
  featured?: boolean
  category?: string
}): Promise<PaginatedResponse<Project>> {
  const { data } = await client.get('/projects/', { params })
  return data
}

export async function fetchProject(slug: string): Promise<Project> {
  const { data } = await client.get(`/projects/${slug}/`)
  return data
}
