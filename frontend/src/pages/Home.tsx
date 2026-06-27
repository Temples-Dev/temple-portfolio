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
        description="Temple Shelemiah Lomotey is a full-stack designer and developer specialising in UI/UX design, web development, branding, and CMS & SEO. He helps startups and businesses build polished digital products — available for freelance projects globally."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Temple Shelemiah Lomotey',
          alternateName: 'Temple Lomotey',
          url: 'https://templelomotey.work',
          jobTitle: 'Full-Stack Designer & Developer',
          description:
            'Full-stack designer and developer specialising in UI/UX design, web development, branding, CMS, and SEO. Works with startups and businesses globally.',
          knowsAbout: ['UI/UX Design', 'Web Development', 'Branding', 'CMS', 'SEO'],
          sameAs: [
            'https://linkedin.com/in/temples-dev',
            'https://github.com/Temples-Dev',
            'https://x.com/temples_dev',
            'https://instagram.com/lomotey.officialz',
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
