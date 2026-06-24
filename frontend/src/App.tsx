import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer/Footer'
import ContactModal from '@/components/sections/ContactModal/ContactModal'
import Spinner from '@/components/common/Spinner/Spinner'

const Home = lazy(() => import('@/pages/Home'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size={40} className="text-accent" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ContactModal />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0D2B36',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#C97C3D', secondary: '#fff' },
          },
        }}
      />
    </>
  )
}
