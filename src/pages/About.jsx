import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReveal } from '../components/useReveal'
import './About.css'

function RevealDiv({ children, className, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >{children}</motion.div>
  )
}

const VALUES = [
  { title: 'Confiance', body: "Chaque produit NAPS est conçu pour protéger les données et les transactions de nos clients selon les standards les plus exigeants.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: 'Accessibilité', body: "Le digital financier doit être à portée de tous — de la petite boutique de quartier jusqu'à la grande institution nationale.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { title: 'Réactivité', body: "Un problème ne s'arrête pas le week-end. Notre équipe est disponible 7 jours sur 7 pour vous accompagner sans délai.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { title: 'Innovation', body: "Nous regardons constamment vers ce qui vient, sans jamais perdre de vue les besoins concrets du terrain marocain.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

const KPIS = [
  { num: '2012', sup: '.', label: 'Année de création' },
  { num: '10k',  sup: '+', label: 'Marchands actifs' },
  { num: '30',   sup: '+', label: 'Ans d\'expérience M2M Group' },
  { num: '1',    sup: 'er', label: 'Non-bancaire agréé BAM' },
]

export default function About() {
  const nav = useNavigate()

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-top-pass" aria-hidden="true" />
        <div className="page-hero-wrap">
          <div className="breadcrumb">
            <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}>Accueil</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span>À propos</span>
          </div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
            Construire la confiance,<br/>transaction par transaction.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.1 }}>
            NAPS est née d'une conviction simple : le paiement digital doit être accessible à tous les Marocains.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="about-split">
            <div>
              <span className="eyebrow">Notre histoire</span>
              <h2>Pionniers du paiement électronique indépendant au Maroc.</h2>
              <p>En 2012, NAPS devient la première institution non-bancaire agréée par Bank Al-Maghrib pour émettre, traiter et acquérir des instruments de paiement électronique.</p>
              <p>Filiale de M2M Group — fort de plus de 30 ans d'expertise dans les systèmes monétiques — NAPS dispose d'une infrastructure éprouvée et d'une crédibilité rare sur le continent.</p>
              <p>Aujourd'hui, nous connectons des milliers de commerçants, d'institutions et de particuliers à travers un écosystème de paiement complet, certifié et en constante évolution.</p>
            </div>
            <RevealDiv>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop"
                alt="Équipe NAPS" className="about-img"
              />
            </RevealDiv>
          </div>

          <div className="about-kpis">
            {KPIS.map((k, i) => (
              <RevealDiv key={i} className="kpi-box" delay={i * 0.08}>
                <div className="kpi-num">{k.num}<span>{k.sup}</span></div>
                <div className="kpi-label">{k.label}</div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--gray-100)' }}>
        <div className="wrap">
          <span className="eyebrow">Nos valeurs</span>
          <h2 className="section-title">Ce qui guide chacune de nos décisions.</h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <RevealDiv key={i} className="val-card" delay={i * 0.08}>
                <div className="val-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Envie de collaborer ?</h2>
          <p>Partenaires, institutions ou talents — nous construisons l'avenir du paiement au Maroc.</p>
          <div className="btn-pair">
            <button className="btn-white" onClick={() => nav('/contact')}>Nous contacter</button>
            <button className="btn-outline-white" onClick={() => nav('/solutions')}>Nos solutions</button>
          </div>
        </div>
      </section>
    </main>
  )
}
