import { motion } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/common/Button/Button'

export default function CTABanner() {
  const openContactModal = useUIStore((s) => s.openContactModal)

  return (
    <section id="contact" className="bg-dark-bg py-16 px-8">
      <motion.div
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-6"
      >
        <div>
          <h2 className="font-display text-2xl text-white">
            Have a project in mind?
          </h2>
          <p className="mt-1 text-base text-text-secondary">
            Let's create something amazing together.
          </p>
        </div>
        <Button size="lg" onClick={openContactModal}>
          LET'S TALK →
        </Button>
      </motion.div>
    </section>
  )
}
