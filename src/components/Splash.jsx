import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGO = 'https://naps.ma/wp-content/uploads/2024/04/038adb848df03b64801d230b9f9f1f53.png'

export default function Splash({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [logoErr, setLogoErr] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--white)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {!logoErr
              ? <img src={LOGO} alt="NAPS" style={{ height: 42 }} onError={() => setLogoErr(true)} />
              : (
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{
                    width:40, height:40,
                    background:'var(--orange)', borderRadius:10,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, fontWeight:800, color:'white',
                  }}>N</div>
                  <span style={{ fontSize:22, fontWeight:800 }}>NAPS</span>
                </div>
              )
            }
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              width: 120, height: 3,
              background: 'var(--border)',
              borderRadius: 2, overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
              style={{ height: '100%', background: 'var(--orange)', borderRadius: 2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
