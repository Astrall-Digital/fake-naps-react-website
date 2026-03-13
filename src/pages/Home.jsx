import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion'
import { useReveal } from '../components/useReveal'
import SplitReveal from '../components/SplitReveal'
import './Home.css'

/* ─── Magnetic button hook ─────────────────────────── */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      x.set((e.clientX - r.left - r.width / 2) * strength)
      y.set((e.clientY - r.top - r.height / 2) * strength)
    }
    const onLeave = () => { x.set(0); y.set(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength, x, y])

  return { ref, style: { x: sx, y: sy } }
}

/* ─── Animated counter ─────────────────────────────── */
function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState('0')
  const [ref, visible] = useReveal()
  const started = useRef(false)

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const isFloat = value.toString().includes('.')
    const num = parseFloat(value)
    const controls = animate(0, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(isFloat ? v.toFixed(1) : Math.round(v).toLocaleString()),
    })
    return controls.stop
  }, [visible, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ─── Reveal section ───────────────────────────────── */
function RevealSection({ children, className, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Staggered text reveal ────────────────────────── */
function TextReveal({ text, className, delay = 0 }) {
  const [ref, visible] = useReveal()
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={visible ? { y: '0%' } : {}}
            transition={{ duration: 0.55, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Noise texture overlay ────────────────────────── */
function NoiseOverlay({ opacity = 0.025 }) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity, zIndex: 10 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Home() {
  const nav = useNavigate()
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  /* ─── Global scroll progress ─────────────────────── */
  const { scrollYProgress } = useScroll()

  /* ─── Section-local scroll progress ─────────────── */
  const wipeRef = useRef(null)
  const { scrollYProgress: wipeProgress } = useScroll({
    target: wipeRef,
    offset: ['start start', 'end end'],
  })

  /* ─── Hero parallax ──────────────────────────────── */
  // Image recedes with scale + depth
  const heroImageY     = useTransform(scrollYProgress, [0, 0.4], [0, 180])
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.14])
  const heroImageRotate = useTransform(scrollYProgress, [0, 0.35], [0, -2.5])

  // Content lifts and fades
  const heroContentY       = useTransform(scrollYProgress, [0, 0.28], [0, -70])
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.36], [1, 0.9, 0])

  // Floating card left — bobs AND moves differently from image
  const card1Y = useTransform(scrollYProgress, [0, 0.3], [0, 110])
  const card1X = useTransform(scrollYProgress, [0, 0.3], [0, -30])

  // Floating card right
  const card2Y = useTransform(scrollYProgress, [0, 0.3], [0, 60])
  const card2X = useTransform(scrollYProgress, [0, 0.3], [0, 20])

  // Blobs: 4 layers with different speeds & directions
  const blob1Y = useTransform(scrollYProgress, [0, 0.55], [0, -200])
  const blob1X = useTransform(scrollYProgress, [0, 0.55], [0, -40])
  const blob2Y = useTransform(scrollYProgress, [0, 0.45], [0,  130])
  const blob2X = useTransform(scrollYProgress, [0, 0.45], [0,  30])
  const blob3Y = useTransform(scrollYProgress, [0, 0.4],  [0, -100])
  const blob3X = useTransform(scrollYProgress, [0, 0.4],  [0,  60])
  const blob4Y = useTransform(scrollYProgress, [0, 0.5],  [0,  80])
  const blob4X = useTransform(scrollYProgress, [0, 0.5],  [0, -60])
  const blob5Y = useTransform(scrollYProgress, [0, 0.35], [0, -60])

  // Hero tint — tightened fade
  const heroBgTint = useTransform(scrollYProgress, [0, 0.22, 0.4], [0, 0.45, 0.9])

  /* ─── Logos strip ─────────────────────────────────── */
  const logosX = useTransform(scrollYProgress, [0.1, 0.3], [0, -50])

  /* ─── Why section ─────────────────────────────────── */
  const whyImgY    = useTransform(scrollYProgress, [0.18, 0.5], [60, -90])
  const whyImgScale = useTransform(scrollYProgress, [0.18, 0.42], [0.9, 1.04])
  const whyTextY   = useTransform(scrollYProgress, [0.22, 0.5], [40, -30])

  /* ─── Products ────────────────────────────────────── */
  const productsY = useTransform(scrollYProgress, [0.38, 0.58], [60, -40])

  /* ─── Wipe Transitions (Mapping [0, 1] to specific sequences) ────── */
  
  // Testimonials (Wipe from Left)
  const testimonialsSlideX       = useTransform(wipeProgress, [0.15, 0.50], ['-100%', '0%'])
  const testimonialsSlideOpacity = useTransform(wipeProgress, [0.15, 0.25], [0, 1])
  const testimonialsSlideScale   = useTransform(wipeProgress, [0.15, 0.50], [0.9, 1])

  // CTA (Wipe from Right)
  const ctaSlideX       = useTransform(wipeProgress, [0.50, 0.85], ['100%', '0%'])
  const ctaSlideOpacity = useTransform(wipeProgress, [0.50, 0.60], [0, 1])
  const ctaSlideScale   = useTransform(wipeProgress, [0.50, 0.85], [0.9, 1])
  const ctaGlow         = useTransform(wipeProgress, [0.75, 1], [0, 1])

  /* ─── Springified hero image for silky feel ───────── */
  const heroImgYSpring     = useSpring(heroImageY, { stiffness: 80, damping: 20 })
  const heroImgScaleSpring = useSpring(heroImageScale, { stiffness: 60, damping: 18 })

  /* ─── Magnetic buttons ────────────────────────────── */
  const mag1 = useMagnetic(0.28)
  const mag2 = useMagnetic(0.28)

  /* ─── Mouse-tracking hero spotlight ──────────────── */
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 22 })
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 22 })
  const spotLeft  = useTransform(spotX, [0, 1], ['20%', '80%'])
  const spotTop   = useTransform(spotY, [0, 1], ['10%', '90%'])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      mouseX.set((e.clientX - r.left) / r.width)
      mouseY.set((e.clientY - r.top)  / r.height)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────── */}
      <div className="hero-wrapper" ref={heroRef}>
        <NoiseOverlay opacity={0.022} />

        {/* Mouse-tracking spotlight */}
        <motion.div
          className="hero-spotlight"
          style={{ left: spotLeft, top: spotTop }}
          aria-hidden
        />

        {/* Parallax blobs — 5 layers */}
        <motion.div className="hero-parallax-blob hero-parallax-blob-1" style={{ y: blob1Y, x: blob1X }} aria-hidden />
        <motion.div className="hero-parallax-blob hero-parallax-blob-2" style={{ y: blob2Y, x: blob2X }} aria-hidden />
        <motion.div className="hero-parallax-blob hero-parallax-blob-3" style={{ y: blob3Y, x: blob3X }} aria-hidden />
        <motion.div className="hero-parallax-blob hero-parallax-blob-4" style={{ y: blob4Y, x: blob4X }} aria-hidden />
        <motion.div className="hero-parallax-blob hero-parallax-blob-5" style={{ y: blob5Y }} aria-hidden />

        {/* Scroll tint */}
        <motion.div className="hero-bg-tint" style={{ opacity: heroBgTint }} aria-hidden />

        <div className="hero-inner">
          {/* ── Left content ─────────────────────────── */}
          <motion.div className="hero-content" style={{ y: heroContentY, opacity: heroContentOpacity }}>

            <motion.div className="hero-tag" {...fadeUp(0.05)}>
              <div className="hero-tag-dot" />
              <span>Agréé Bank Al-Maghrib · Partenaire Mastercard</span>
            </motion.div>

            {/* Word-by-word title reveal */}
            <motion.h1 {...fadeUp(0)}>
              <span className="h1-line">
                <TextReveal text="Le paiement électronique," delay={0.1} />
              </span>
              <em>
                <TextReveal text="simple et accessible" delay={0.22} />
              </em>
              <br />
              <TextReveal text="pour tous." delay={0.34} />
            </motion.h1>

            <motion.p className="hero-desc" {...fadeUp(0.45)}>
              NAPS connecte commerçants, particuliers et institutions à une infrastructure
              de paiement moderne — pensée pour le Maroc, construite selon les standards internationaux.
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(0.55)}>
              <motion.button
                ref={mag1.ref}
                style={mag1.style}
                className="btn-primary"
                onClick={() => nav('/solutions')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Découvrir les solutions
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.button>
              <motion.button
                ref={mag2.ref}
                style={mag2.style}
                className="btn-secondary"
                onClick={() => nav('/contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Parler à un expert
              </motion.button>
            </motion.div>

            <motion.div className="hero-trust" {...fadeUp(0.65)}>
              <span className="trust-label">Certifié</span>
              {[
                { label: 'PCI DSS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { label: '3D Secure', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
                { label: 'Conformité BAM', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
              ].map((b) => (
                <motion.div
                  key={b.label}
                  className="trust-badge"
                  whileHover={{ scale: 1.06, color: 'var(--orange)' }}
                  transition={{ duration: 0.15 }}
                >
                  {b.icon}{b.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Visual (deep parallax) ────────────────── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: heroImgYSpring,
              scale: heroImgScaleSpring,
              rotate: heroImageRotate,
            }}
          >
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop"
                alt="Paiement digital"
              />
              {/* Shimmer sweep */}
              <div className="hero-img-shimmer" />
            </div>

            {/* Card 1 — independent parallax */}
            <motion.div
              className="hero-card-float"
              style={{ y: card1Y, x: card1X }}
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <div className="hcf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  </svg>
                </div>
                <div>
                  <div className="hcf-num">10 000<span>+</span></div>
                  <div className="hcf-label">Marchands actifs</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 — different parallax speed */}
            <motion.div
              className="hero-card-float2"
              style={{ y: card2Y, x: card2X }}
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div className="hcf2-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <div className="hcf2-text">Opérationnel en 48h</div>
                  <div className="hcf2-sub">Sans démarche complexe</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Third floating card — new! */}
            <motion.div
              className="hero-card-float3"
              style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 85]) }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
              >
                <div className="hcf3-pulse" />
                <div className="hcf3-text">99.9% uptime</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.07], [1, 0]) }}
        >
          <motion.div
            className="scroll-cue-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>Scroll</span>
        </motion.div>
      </div>

      {/* ── SPLIT REVEAL SECTION ──────────────────────── */}
      <SplitReveal 
        imageFront="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop"
        imageBack="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
        labelFront="Avant NAPS"
        labelBack="Avec NAPS"
        tagline="Une infrastructure de paiement qui transforme votre quotidien."
      />

      {/* ── LOGOS STRIP ───────────────────────────────── */}
      <motion.div className="logos-strip" style={{ x: logosX }}>
        <div className="logos-inner">
          <span className="logos-label">Ils nous font confiance</span>
          <div className="logos-list">
            {['Marjane','ONCF','OFPPT','UM6P','CMC','Carrefour','+ 200 partenaires'].map((l, i) => (
              <motion.span
                key={l}
                className="logo-item"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ color: 'var(--orange)', scale: 1.05 }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── WHY NAPS ──────────────────────────────────── */}
      <section className="section why-section">
        <motion.div className="section-bg-overlay why-overlay" aria-hidden />
        <div className="wrap">
          <div className="why-grid">
            {/* Image col — deep parallax + scale */}
            <motion.div style={{ y: whyImgY, scale: whyImgScale }}>
              <RevealSection>
                <div className="why-img-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop"
                    alt="Solution de paiement"
                    className="why-img"
                  />
                  <div className="why-img-overlay" />
                </div>
              </RevealSection>
            </motion.div>

            {/* Text col — subtle counter-parallax */}
            <motion.div style={{ y: whyTextY }}>
              <span className="eyebrow">Pourquoi NAPS</span>
              <h2 className="section-title">Une infrastructure pensée<br />pour votre réalité.</h2>
              <p className="section-desc">Pas un produit générique. Une solution construite pour les commerçants, institutions et particuliers marocains.</p>
              <div className="why-list">
                {[
                  { delay: 0.05, title: 'Opérationnel en 48h chrono', body: 'Contrat signé, terminal livré, compte activé. Vous encaissez vos premiers paiements sans attente et sans paperasse inutile.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                  { delay: 0.12, title: 'Sécurité certifiée PCI DSS', body: 'Chaque transaction est protégée selon les standards les plus exigeants. Vos données et celles de vos clients restent hors de portée.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { delay: 0.19, title: 'Support 7j/7, sans exception', body: 'Un problème de paiement ne connaît pas le week-end. Notre équipe est disponible tous les jours pour vous accompagner.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12"/></svg> },
                ].map((item, i) => (
                  <RevealSection key={i} delay={item.delay}>
                    <motion.div
                      className="why-item"
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="why-icon">{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                      </div>
                    </motion.div>
                  </RevealSection>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────── */}
      <motion.section className="section products-bg products-section" style={{ y: productsY }}>
        <div className="wrap">
          <div className="products-header">
            <div>
              <span className="eyebrow">Nos solutions</span>
              <h2 className="section-title">Tout ce dont vous avez besoin,<br />dans un seul écosystème.</h2>
            </div>
            <button className="btn-secondary" onClick={() => nav('/solutions')}>Voir toutes les solutions</button>
          </div>
          <div className="products-grid">
            {[
              { variant: 'dark',   label: 'Le plus populaire', title: 'Terminal de paiement TPE', body: 'Acceptez toutes les cartes marocaines et internationales dans votre boutique. Installation rapide, support inclus, sans engagement longue durée.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
              { variant: '',       label: 'E-commerce',        title: 'Paiement en ligne',        body: 'Un gateway sécurisé, compatible Visa, Mastercard et CMI. Intégration en quelques heures sur votre boutique.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              { variant: 'orange', label: 'Particuliers',      title: 'Carte prépayée NAPS',      body: 'Ouvrez un compte de paiement sans banque. Rechargeable, utilisable partout, contrôlable depuis votre téléphone.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
              { variant: '',       label: 'Famille',           title: 'NAPS Family',              body: 'Distribuez des cartes à toute la famille. Définissez les plafonds, suivez les dépenses, gardez le contrôle.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg> },
              { variant: '',       label: 'Entreprises',       title: 'Cartes professionnelles',  body: 'Gérez les frais de vos équipes avec des cartes prépayées dédiées et un reporting en temps réel.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
            ].map((card, i) => (
              <RevealSection key={i} delay={i * 0.07} className={`prod-card ${card.variant}`}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,.14)' }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%' }}
                >
                  <div className="prod-card-icon">{card.icon}</div>
                  <div className="prod-label">{card.label}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <button className="prod-link" onClick={() => nav('/solutions')}>
                    En savoir plus
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── UNIFIED WIPE SECTIONS ──────────────────────── */}
      <div ref={wipeRef} className="section-wipe-container">
        
        {/* STATS */}
        <section
          className="section-slide-panel section-slide-wrapper--stats"
          style={{ zIndex: 1 }}
        >
          <div className="wrap section-inner">
            <RevealSection>
              <h2 className="stats-title">Des chiffres qui parlent d'eux-mêmes.</h2>
            </RevealSection>
            <div className="stats-grid">
              {[
                { num: 10000, sup: '+', label: 'Marchands actifs au Maroc', prefix: '' },
                { num: 99.9,  sup: '%', label: 'Disponibilité de la plateforme', prefix: '' },
                { num: 12,    sup: '+', label: "Années d'expertise fintech", prefix: '' },
                { num: 3,     sup: 'M+',label: 'Transactions traitées / an', prefix: '' },
              ].map((s, i) => (
                <RevealSection key={i} delay={i * 0.1} className="stat-box">
                  <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.18 }}>
                    <div className="stat-num">
                      <AnimatedCounter value={s.num === 10000 ? '10000' : s.num} />
                      <span>{s.sup}</span>
                    </div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-bar-wrap">
                      <motion.div
                        className="stat-bar"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <motion.section
          className="section-slide-panel section-slide-wrapper--testimonials"
          style={{ x: testimonialsSlideX, opacity: testimonialsSlideOpacity, scale: testimonialsSlideScale, zIndex: 2 }}
        >
          <div className="wrap section-inner">
            <span className="eyebrow">Témoignages</span>
            <h2 className="section-title">Ceux qui ont fait le choix NAPS.</h2>
            <div className="testimonials-grid">
              {[
                { initials:'KA', name:'Karim Amrani',       role:'Gérant, Boutique Mode — Casablanca', bg:'linear-gradient(135deg,#f96f06,#ff9a40)', text: '"Nous cherchions une solution simple pour encaisser en boutique et en ligne. NAPS a résolu les deux en moins d\'une semaine."' },
                { initials:'SB', name:'Sara Benchekroun',   role:'CTO, Startup e-commerce — Rabat',    bg:'linear-gradient(135deg,#1a1a1a,#3d3d3d)', text: '"L\'intégration API était claire, la documentation bien faite. Le support a répondu en moins d\'une heure. Rare de trouver ça au Maroc."' },
                { initials:'MO', name:'Mohammed Ouali',     role:'DSI, Établissement supérieur — Marrakech', bg:'linear-gradient(135deg,#f96f06,#c44d00)', text: '"La gestion des cartes étudiantes multiservices a transformé notre campus. Un seul outil pour la cantine, les transports et les services."' },
              ].map((t, i) => (
                <RevealSection key={i} delay={i * 0.12} className="t-card">
                  <motion.div whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,.09)' }} transition={{ duration: 0.22 }} style={{ height: '100%' }}>
                    <div className="t-stars">
                      {[...Array(5)].map((_, j) => (
                        <motion.svg key={j} viewBox="0 0 24 24" initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--orange)"/>
                        </motion.svg>
                      ))}
                    </div>
                    <p className="t-text">{t.text}</p>
                    <div className="t-author">
                      <div className="t-avatar" style={{ background: t.bg }}>{t.initials}</div>
                      <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
                    </div>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="section-slide-panel section-slide-wrapper--cta"
          style={{ x: ctaSlideX, opacity: ctaSlideOpacity, scale: ctaSlideScale, zIndex: 3 }}
        >
          <NoiseOverlay opacity={0.028} />
          <motion.div className="cta-glow-overlay" style={{ opacity: ctaGlow }} aria-hidden />
          <motion.div className="cta-orb cta-orb-1" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} aria-hidden />
          <motion.div className="cta-orb cta-orb-2" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} aria-hidden />
          <div className="cta-band-inner">
            <RevealSection><h2>Prêt à moderniser vos paiements ?</h2></RevealSection>
            <RevealSection delay={0.1}><p>Rejoignez des milliers de commerçants et d'entreprises qui font confiance à NAPS chaque jour.</p></RevealSection>
            <RevealSection delay={0.2}>
              <div className="btn-pair">
                <motion.button className="btn-white" onClick={() => nav('/contact')} whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,.22)' }} whileTap={{ scale: 0.97 }}>Démarrer maintenant</motion.button>
                <motion.button className="btn-outline-white" onClick={() => nav('/solutions')} whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }} whileTap={{ scale: 0.97 }}>Voir les solutions</motion.button>
              </div>
            </RevealSection>
          </div>
        </motion.section>

      </div>
    </main>
  )
}