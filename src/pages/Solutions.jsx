import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../components/useReveal'
import './Solutions.css'

function RevealDiv({ children, className, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

const TABS = ['Toutes', 'Commerçants', 'Particuliers', 'Entreprises']

const CARDS = [
  {
    cat: 'Commerçants',
    eyebrow: 'Commerçants',
    title: 'Terminal de paiement TPE',
    body: 'Acceptez toutes les cartes dans votre boutique — sans contact, avec QR code. Opérationnel en 48h, installé par nos équipes.',
    img: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=700&q=80&auto=format&fit=crop',
    feats: ['Paiement sans contact NFC', 'QR Code intégré', 'Dashboard en temps réel'],
  },
  {
    cat: 'Commerçants',
    eyebrow: 'Commerçants',
    title: 'Gateway e-commerce',
    body: 'Intégrez le paiement en ligne sur votre site en quelques heures. Compatible WooCommerce, PrestaShop et API REST.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80&auto=format&fit=crop',
    feats: ['Visa / Mastercard / CMI', '3D Secure inclus', 'API REST documentée'],
  },
  {
    cat: 'Particuliers',
    eyebrow: 'Particuliers',
    title: 'Carte NAPS Prépayée',
    body: 'Un compte de paiement sans banque traditionnelle. Rechargeable, utilisable partout, gérable depuis votre smartphone.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80&auto=format&fit=crop',
    feats: ['Sans compte bancaire requis', 'Rechargeable en ligne', 'Utilisable au Maroc et à l\'étranger'],
  },
  {
    cat: 'Particuliers',
    eyebrow: 'Particuliers',
    title: 'NAPS Family',
    body: 'Gérez le budget de toute votre famille depuis un seul espace. Cartes pour les enfants, plafonds configurables.',
    img: 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?w=700&q=80&auto=format&fit=crop',
    feats: ["Jusqu'à 5 cartes par famille", 'Plafonds personnalisables', 'Notifications en temps réel'],
  },
  {
    cat: 'Entreprises',
    eyebrow: 'Entreprises',
    title: 'Cartes de frais professionnels',
    body: 'Distribuez des cartes à vos collaborateurs. Contrôle des dépenses en temps réel, notes de frais automatisées.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format&fit=crop',
    feats: ['Reporting consolidé', 'Blocage instantané par carte', 'Export comptable'],
  },
  {
    cat: 'Entreprises',
    eyebrow: 'Institutionnel',
    title: 'Solution étudiante multiservices',
    body: 'Une carte pour la cantine, les transports, les services campus. Déployée dans plusieurs établissements au Maroc.',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=80&auto=format&fit=crop',
    feats: ['Badge campus intégré', 'Rechargeable en ligne', 'Tableau de bord institution'],
  },
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function Solutions() {
  const [active, setActive] = useState('Toutes')
  const nav = useNavigate()
  const filtered = active === 'Toutes' ? CARDS : CARDS.filter(c => c.cat === active)

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-top-pass" aria-hidden="true" />
        <div className="page-hero-wrap">
          <div className="breadcrumb">
            <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}>Accueil</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span>Solutions</span>
          </div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
            Des solutions pour<br/>chaque besoin.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.1 }}>
            Particulier, commerçant ou grand compte — NAPS propose une gamme complète pensée pour chaque profil.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="sol-tabs">
            {TABS.map(t => (
              <button
                key={t}
                className={`sol-tab ${active === t ? 'active' : ''}`}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="sol-grid">
            {filtered.map((card, i) => (
              <RevealDiv key={card.title} className="sol-card" delay={i * 0.07}>
                <img className="sol-card-img" src={card.img} alt={card.title}/>
                <div className="sol-card-body">
                  <div className="sol-card-eyebrow">{card.eyebrow}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <div className="sol-features">
                    {card.feats.map(f => (
                      <div key={f} className="sol-feat">
                        <CheckIcon/>{f}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Une question sur nos solutions ?</h2>
          <p>Notre équipe commerciale vous répond sous 24h avec une proposition adaptée.</p>
          <div className="btn-pair">
            <button className="btn-white" onClick={() => nav('/contact')}>Parler à un expert</button>
            <button className="btn-outline-white" onClick={() => nav('/')}>Retour à l'accueil</button>
          </div>
        </div>
      </section>
    </main>
  )
}
