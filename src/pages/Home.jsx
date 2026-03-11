import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReveal } from '../components/useReveal'
import './Home.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
})

const fadeRight = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] },
}

function RevealSection({ children, className, delay = 0 }) {
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

export default function Home() {
  const nav = useNavigate()

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="hero-wrapper">
        <div className="hero-inner">
          <div className="hero-content">
            <motion.div className="hero-tag" {...fadeUp(0.05)}>
              <div className="hero-tag-dot" />
              <span>Agréé Bank Al-Maghrib · Partenaire Mastercard</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.15)}>
              Le paiement électronique,<br />
              <em>simple et accessible</em><br />
              pour tous.
            </motion.h1>

            <motion.p className="hero-desc" {...fadeUp(0.25)}>
              NAPS connecte commerçants, particuliers et institutions à une infrastructure
              de paiement moderne — pensée pour le Maroc, construite selon les standards internationaux.
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(0.35)}>
              <button className="btn-primary" onClick={() => nav('/solutions')}>
                Découvrir les solutions
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => nav('/contact')}>
                Parler à un expert
              </button>
            </motion.div>

            <motion.div className="hero-trust" {...fadeUp(0.45)}>
              <span className="trust-label">Certifié</span>
              {[
                { label: 'PCI DSS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { label: '3D Secure', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
                { label: 'Conformité BAM', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
              ].map((b) => (
                <div key={b.label} className="trust-badge">
                  {b.icon}{b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div className="hero-visual" {...fadeRight}>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop"
                alt="Paiement digital"
              />
            </div>
            <motion.div
              className="hero-card-float"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
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
            <motion.div
              className="hero-card-float2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
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
        </div>
      </div>

      {/* ── LOGOS STRIP ──────────────────────────────────── */}
      <div className="logos-strip">
        <div className="logos-inner">
          <span className="logos-label">Ils nous font confiance</span>
          <div className="logos-list">
            {['Marjane','ONCF','OFPPT','UM6P','CMC','Carrefour','+ 200 partenaires'].map(l => (
              <span key={l} className="logo-item">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY NAPS ─────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="why-grid">
            <RevealSection>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop"
                alt="Solution de paiement"
                className="why-img"
              />
            </RevealSection>
            <div>
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
                    <div className="why-item">
                      <div className="why-icon">{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section className="section products-bg">
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
              {
                variant: 'dark',
                label: 'Le plus populaire',
                title: 'Terminal de paiement TPE',
                body: 'Acceptez toutes les cartes marocaines et internationales dans votre boutique. Installation rapide, support inclus, sans engagement longue durée.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
              },
              {
                variant: '',
                label: 'E-commerce',
                title: 'Paiement en ligne',
                body: 'Un gateway sécurisé, compatible Visa, Mastercard et CMI. Intégration en quelques heures sur votre boutique.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
              },
              {
                variant: 'orange',
                label: 'Particuliers',
                title: 'Carte prépayée NAPS',
                body: 'Ouvrez un compte de paiement sans banque. Rechargeable, utilisable partout, contrôlable depuis votre téléphone.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
              },
              {
                variant: '',
                label: 'Famille',
                title: 'NAPS Family',
                body: 'Distribuez des cartes à toute la famille. Définissez les plafonds, suivez les dépenses, gardez le contrôle.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>,
              },
              {
                variant: '',
                label: 'Entreprises',
                title: 'Cartes professionnelles',
                body: 'Gérez les frais de vos équipes avec des cartes prépayées dédiées et un reporting en temps réel.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
              },
            ].map((card, i) => (
              <RevealSection key={i} delay={i * 0.07} className={`prod-card ${card.variant}`}>
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
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="stats-section">
        <div className="wrap">
          <RevealSection>
            <h2 className="stats-title">Des chiffres qui parlent d'eux-mêmes.</h2>
          </RevealSection>
          <div className="stats-grid">
            {[
              { num: '10k', sup: '+', label: 'Marchands actifs au Maroc' },
              { num: '99.9', sup: '%', label: 'Disponibilité de la plateforme' },
              { num: '12',  sup: '+', label: 'Années d\'expertise fintech' },
              { num: '3M',  sup: '+', label: 'Transactions traitées / an' },
            ].map((s, i) => (
              <RevealSection key={i} delay={i * 0.08} className="stat-box">
                <div className="stat-num">{s.num}<span>{s.sup}</span></div>
                <div className="stat-label">{s.label}</div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Témoignages</span>
          <h2 className="section-title">Ceux qui ont fait le choix NAPS.</h2>
          <div className="testimonials-grid">
            {[
              { initials:'KA', name:'Karim Amrani', role:'Gérant, Boutique Mode — Casablanca', bg:'linear-gradient(135deg,#f96f06,#ff9a40)', text: '"Nous cherchions une solution simple pour encaisser en boutique et en ligne. NAPS a résolu les deux en moins d\'une semaine."' },
              { initials:'SB', name:'Sara Benchekroun', role:'CTO, Startup e-commerce — Rabat', bg:'linear-gradient(135deg,#1a1a1a,#3d3d3d)', text: '"L\'intégration API était claire, la documentation bien faite. Le support a répondu en moins d\'une heure. Rare de trouver ça au Maroc."' },
              { initials:'MO', name:'Mohammed Ouali', role:'DSI, Établissement supérieur — Marrakech', bg:'linear-gradient(135deg,#f96f06,#c44d00)', text: '"La gestion des cartes étudiantes multiservices a transformé notre campus. Un seul outil pour la cantine, les transports et les services."' },
            ].map((t, i) => (
              <RevealSection key={i} delay={i * 0.1} className="t-card">
                <div className="t-stars">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--orange)"/>
                    </svg>
                  ))}
                </div>
                <p className="t-text">{t.text}</p>
                <div className="t-author">
                  <div className="t-avatar" style={{ background: t.bg }}>{t.initials}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Prêt à moderniser vos paiements ?</h2>
          <p>Rejoignez des milliers de commerçants et d'entreprises qui font confiance à NAPS chaque jour.</p>
          <div className="btn-pair">
            <button className="btn-white" onClick={() => nav('/contact')}>Démarrer maintenant</button>
            <button className="btn-outline-white" onClick={() => nav('/solutions')}>Voir les solutions</button>
          </div>
        </div>
      </section>
    </main>
  )
}
