import { motion, type Variants } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/common/Button/Button'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export default function Hero() {
  const openContactModal = useUIStore((s) => s.openContactModal)

  return (
    <section className="min-h-screen pt-16 flex items-center bg-bg">
      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <SectionLabel>Hello, I'm Temple</SectionLabel>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 font-display text-5xl lg:text-6xl leading-tight text-text-primary"
            >
              I build software. Web apps on the surface,{' '}
              <span className="text-accent">systems work underneath.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              Full-stack engineer working across Django, React, and Zig.
              Preparing for the MSc in Intelligent Computing Systems at Ashesi,
              focused on software engineering and systems.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                VIEW MY WORK →
              </Button>
              <button
                onClick={openContactModal}
                className="text-sm text-text-secondary hover:text-accent transition-colors underline underline-offset-4"
              >
                Or let's talk
              </button>
            </motion.div>
          </div>

          {/* Right: Browser mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BrowserMockup() {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      {/* Browser chrome */}
      <div className="bg-card px-4 py-3 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 bg-white rounded px-3 py-1 text-xs text-text-secondary border border-border">
          temple.dev
        </div>
      </div>

      {/* Mock page content */}
      <div className="bg-dark-bg p-6">
        <div className="text-white/60 text-xs mb-4 tracking-widest uppercase">Portfolio</div>
        <div className="h-4 w-3/4 bg-white/20 rounded mb-3" />
        <div className="h-4 w-1/2 bg-white/20 rounded mb-3" />
        <div className="h-4 w-2/3 bg-accent/60 rounded mb-6" />
        <div className="w-24 h-8 bg-accent rounded" />
      </div>

      <div className="bg-surface p-4 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg bg-card border border-border overflow-hidden">
            <div
              className="h-20 w-full"
              style={{
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, #C97C3D22 0%, #0D2B3622 100%)'
                  : 'linear-gradient(135deg, #0D2B3622 0%, #C97C3D22 100%)',
              }}
            />
            <div className="p-2">
              <div className="h-2.5 w-3/4 bg-border rounded" />
              <div className="h-2 w-1/2 bg-border rounded mt-1.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
