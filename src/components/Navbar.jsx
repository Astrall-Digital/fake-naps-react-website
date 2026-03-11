import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const LOGO = 'https://naps.ma/wp-content/uploads/2024/04/038adb848df03b64801d230b9f9f1f53.png'

const solutions = [
  {
    section: 'Particuliers',
    items: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
        title: 'Carte NAPS Prépayée',
        sub: 'Paiements en ligne et en magasin',
        to: '/solutions',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>,
        title: 'NAPS Family',
        sub: 'Gérez les dépenses familiales',
        to: '/solutions',
      },
    ],
  },
  {
    section: 'Commerçants',
    items: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
        title: 'Terminal TPE',
        sub: 'Encaissez en boutique en 48h',
        to: '/solutions',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
        title: 'Paiement en ligne',
        sub: 'Gateway e-commerce sécurisé',
        to: '/solutions',
      },
    ],
  },
  {
    section: 'Entreprises',
    items: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
        title: 'Cartes professionnelles',
        sub: 'Gestion des frais d\'équipe',
        to: '/solutions',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
        title: 'Solution institutionnelle',
        sub: 'Campus, transport, multi-services',
        to: '/solutions',
      },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [dropOpen, setDropOpen]       = useState(false)
  const [mobOpen, setMobOpen]         = useState(false)
  const [logoError, setLogoError]     = useState(false)
  const dropRef                        = useRef(null)
  const location                       = useLocation()
  const navigate                       = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobOpen(false); setDropOpen(false) }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-wrap">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            {!logoError
              ? <img src={LOGO} alt="NAPS" onError={() => setLogoError(true)} />
              : (
                <div className="logo-fallback">
                  <div className="logo-fallback-mark">N</div>
                  <span className="logo-fallback-text">NAPS</span>
                </div>
              )
            }
          </Link>

          {/* Desktop links */}
          <div className="nav-center">

            {/* Solutions dropdown */}
            <div className="nav-item" ref={dropRef}>
              <button
                className={`nav-btn ${dropOpen ? 'active' : ''}`}
                onClick={() => setDropOpen(v => !v)}
              >
                Solutions
                <svg className={`chevron ${dropOpen ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                </svg>
              </button>

              {dropOpen && (
                <div className="dropdown">
                  {solutions.map((group, gi) => (
                    <div key={gi} className="dd-group">
                      {gi > 0 && <div className="dd-divider" />}
                      <div className="dd-section-label">{group.section}</div>
                      {group.items.map((item, ii) => (
                        <Link
                          key={ii}
                          to={item.to}
                          className="dd-item"
                          onClick={() => setDropOpen(false)}
                        >
                          <div className="dd-icon">{item.icon}</div>
                          <div>
                            <div className="dd-title">{item.title}</div>
                            <div className="dd-sub">{item.sub}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about"    className={`nav-btn ${isActive('/about')    ? 'active' : ''}`}>À propos</Link>
            <Link to="/contact"  className={`nav-btn ${isActive('/contact')  ? 'active' : ''}`}>Tarifs</Link>
            <Link to="/contact"  className={`nav-btn`}>Ressources</Link>
            <Link to="/contact"  className={`nav-btn ${isActive('/contact')  ? 'active' : ''}`}>Contact</Link>
          </div>

          {/* CTA */}
          <div className="nav-right">
            <button className="btn-ghost-nav">Se connecter</button>
            <Link to="/contact" className="btn-primary-nav">Commencer</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${mobOpen ? 'open' : ''}`}
            onClick={() => setMobOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobOpen && (
        <div className="mob-menu">
          <Link to="/"         className="mob-link">Accueil</Link>
          <Link to="/solutions" className="mob-link">Solutions</Link>
          <Link to="/about"    className="mob-link">À propos</Link>
          <Link to="/contact"  className="mob-link">Tarifs</Link>
          <Link to="/contact"  className="mob-link">Ressources</Link>
          <Link to="/contact"  className="mob-link">Contact</Link>
          <div className="mob-divider" />
          <Link to="/contact"  className="mob-link mob-cta">Commencer →</Link>
        </div>
      )}
    </>
  )
}
