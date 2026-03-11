import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../components/useReveal'
import './Contact.css'

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

const CHANNELS = [
  { title: 'Téléphone', val: '05 22 91 74 74 — Lun. au Sam., 8h–20h', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 1.2h3a2 2 0 0 1 2 1.72c.128.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96A16 16 0 0 0 16 17.04l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 24 18z"/></svg> },
  { title: 'Email', val: 'contact@naps.ma — Réponse sous 24h', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { title: 'Siège social', val: 'Casablanca, Maroc — Quartier Anfa', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { title: 'Support 7j/7', val: 'Accès direct au centre de relation client NAPS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
]

export default function Contact() {
  const nav = useNavigate()
  const [sent, setSent] = useState(false)

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-top-pass" aria-hidden="true" />
        <div className="page-hero-wrap">
          <div className="breadcrumb">
            <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}>Accueil</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span>Contact</span>
          </div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
            Parlons de votre projet.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.1 }}>
            Une question, un devis ou une démo — notre équipe vous répond sous 24h avec la bonne personne.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>On est là pour vous.</h2>
              <p>Que vous soyez commerçant cherchant à encaisser votre première carte bancaire, ou DSI d'un grand groupe cherchant une intégration sur mesure — nous avons une réponse adaptée.</p>
              <div className="channels">
                {CHANNELS.map((c, i) => (
                  <RevealDiv key={i} className="channel" delay={i * 0.07}>
                    <div className="ch-icon">{c.icon}</div>
                    <div>
                      <div className="ch-title">{c.title}</div>
                      <div className="ch-val">{c.val}</div>
                    </div>
                  </RevealDiv>
                ))}
              </div>
            </div>

            <RevealDiv className="form-card" delay={0.1}>
              {sent ? (
                <div className="form-success">
                  <div className="form-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Message envoyé !</h3>
                  <p>Merci pour votre message. Notre équipe vous contactera dans les 24h.</p>
                  <button className="btn-primary" onClick={() => setSent(false)}>Envoyer un autre message</button>
                </div>
              ) : (
                <>
                  <h3>Envoyez-nous un message</h3>
                  <p className="form-sub">Remplissez ce formulaire et nous vous recontactons rapidement.</p>
                  <div className="form-row">
                    <div className="fg">
                      <label>Prénom</label>
                      <input type="text" placeholder="Votre prénom"/>
                    </div>
                    <div className="fg">
                      <label>Nom</label>
                      <input type="text" placeholder="Votre nom"/>
                    </div>
                  </div>
                  <div className="fg">
                    <label>Email</label>
                    <input type="email" placeholder="vous@entreprise.ma"/>
                  </div>
                  <div className="fg">
                    <label>Je suis</label>
                    <select>
                      <option value="">Sélectionnez votre profil</option>
                      <option>Un commerçant / indépendant</option>
                      <option>Une entreprise ou institution</option>
                      <option>Un particulier</option>
                      <option>Un développeur / intégrateur</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label>Votre message</label>
                    <textarea placeholder="Décrivez votre projet ou votre question..."></textarea>
                  </div>
                  <button className="btn-submit" onClick={() => setSent(true)}>
                    Envoyer →
                  </button>
                </>
              )}
            </RevealDiv>
          </div>
        </div>
      </section>
    </main>
  )
}
