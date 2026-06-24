export interface ProjectTag {
  name: string
  slug: string
}

export interface Project {
  id: string
  title: string
  slug: string
  category: 'ui_ux' | 'web_dev' | 'branding' | 'cms_seo'
  category_display: string
  short_description: string
  full_description?: string
  thumbnail: string
  live_url?: string
  github_url?: string
  tags: string[]
  is_featured: boolean
  order: number
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  image: string
  alt_text: string
  order: number
}

export interface Testimonial {
  id: string
  client_name: string
  client_role: string
  client_company: string
  client_avatar?: string
  content: string
  rating: number
  is_featured: boolean
  order: number
}

export interface ContactFormData {
  name: string
  email: string
  project_type: 'ui_ux' | 'web_dev' | 'branding' | 'cms_seo' | 'other'
  budget_range?: '<2k' | '2k-5k' | '5k-10k' | '10k-20k' | '>20k'
  message: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
