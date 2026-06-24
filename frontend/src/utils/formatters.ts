export function formatCategory(category: string): string {
  const map: Record<string, string> = {
    ui_ux: 'UI/UX Design',
    web_dev: 'Web Development',
    branding: 'Branding',
    cms_seo: 'CMS & SEO',
    other: 'Other',
  }
  return map[category] ?? category
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date))
}
