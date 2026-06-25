import { useQuery } from '@tanstack/react-query'
import { fetchPosts, fetchPost } from '@/api/blog'

export function usePosts(params?: { page?: number; tag?: string }) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: () => fetchPost(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}
