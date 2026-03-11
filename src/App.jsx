import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Splash from './components/Splash'
import ColorPassTransition from './components/ColorPassTransition'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import About from './pages/About'
import Contact from './pages/Contact'
import './styles/global.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about"     element={<About />} />
          <Route path="/contact"   element={<Contact />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Splash onComplete={() => setSplashDone(true)} />
      {splashDone && (
        <>
          <Navbar />
          <ColorPassTransition />
          <AnimatedRoutes />
        </>
      )}
    </BrowserRouter>
  )
}
