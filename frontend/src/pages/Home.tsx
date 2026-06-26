import SEO from '@/components/common/SEO/SEO'
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
      <SEO
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Temple Lomotey',
          url: 'https://templelomotey.work',
          jobTitle: 'Full-Stack Designer & Developer',
          knowsAbout: ['UI/UX Design', 'Web Development', 'Branding', 'CMS', 'SEO'],
          sameAs: [
            'https://linkedin.com/in/temples-dev',
            'https://github.com/Temples-Dev',
            'https://x.com/temples_dev',
          ],
        }}
      />

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
