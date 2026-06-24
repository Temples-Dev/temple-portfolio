import { useQuery } from '@tanstack/react-query'
import { fetchProjects, fetchProject } from '@/api/projects'

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => fetchProjects({ featured: true }),
    staleTime: 5 * 60 * 1000,
  })
}

export function useAllProjects(category?: string) {
  return useQuery({
    queryKey: ['projects', { category }],
    queryFn: () => fetchProjects({ category }),
    staleTime: 5 * 60 * 1000,
  })
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['projects', slug],
    queryFn: () => fetchProject(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}
