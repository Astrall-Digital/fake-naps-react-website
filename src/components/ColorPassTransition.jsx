import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

/**
 * Full-screen color overlay that sweeps left→right then right→left on each route change.
 */
export default function ColorPassTransition() {
  const location = useLocation()
  const controls = useAnimation()
  const prevPathRef = useRef(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    const pathname = location.pathname

    if (isFirstMount.current) {
      isFirstMount.current = false
      prevPathRef.current = pathname
      return
    }

    if (prevPathRef.current === pathname) return
    prevPathRef.current = pathname

    const run = async () => {
      // Sweep in from left (cover the screen)
      await controls.start({
        scaleX: 1,
        transformOrigin: 'left',
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
      })
      // Sweep out to the right (reveal new page)
      await controls.start({
        scaleX: 0,
        transformOrigin: 'right',
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
      })
    }

    run()
  }, [location.pathname, controls])

  return (
    <motion.div
      className="color-pass-overlay"
      initial={{ scaleX: 0 }}
      animate={controls}
      style={{ transformOrigin: 'left' }}
    />
  )
}
