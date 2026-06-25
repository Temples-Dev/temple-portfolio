import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://templelomotey.work'
const SITE_NAME = 'Temple'
const DEFAULT_TITLE = 'Temple — Full-Stack Designer & Developer'
const DEFAULT_DESCRIPTION =
  'Temple is a full-stack designer and developer specialising in UI/UX, web development, branding, and CMS & SEO. Available for freelance projects globally.'

interface SEOProps {
  title?: string
  description?: string
  /** Path only e.g. "/blog/my-post" — BASE_URL is prepended */
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string | null
  noIndex?: boolean
  schema?: object | object[]
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image,
  type = 'website',
  publishedAt,
  noIndex = false,
  schema,
}: SEOProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={fullTitle} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Article-specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={`${BASE_URL}`} />
      )}

      {/* JSON-LD structured data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
