import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero/Hero'
import TrustedBy from '@/components/sections/TrustedBy/TrustedBy'
import FeaturedWork from '@/components/sections/FeaturedWork/FeaturedWork'
import About from '@/components/sections/About/About'
import Services from '@/components/sections/Services/Services'
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTABanner from '@/components/sections/CTABanner/CTABanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Temple — Full-Stack Designer & Developer</title>
        <meta
          name="description"
          content="Temple is a full-stack designer and developer specialising in UI/UX, web development, branding, and CMS & SEO. Available for freelance projects."
        />
        <meta property="og:title" content="Temple — Full-Stack Designer & Developer" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Temple',
            jobTitle: 'Full-Stack Designer & Developer',
            url: 'https://temple.dev',
          })}
        </script>
      </Helmet>

      <main>
        <Hero />
        <TrustedBy />
        <FeaturedWork />
        <About />
        <Services />
        <Testimonials />
        <CTABanner />
      </main>
    </>
  )
}
