import { Link } from 'react-router-dom'

const LOGO = 'https://naps.ma/wp-content/uploads/2024/04/038adb848df03b64801d230b9f9f1f53.png'

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/">
              <img src={LOGO} alt="NAPS" style={{ height: 32, filter: 'brightness(0) invert(1)', opacity: .65 }} />
            </Link>
            <p>Premier opérateur de paiement électronique indépendant agréé par Bank Al-Maghrib. Filiale M2M Group.</p>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions">Terminal TPE</Link></li>
              <li><Link to="/solutions">Paiement en ligne</Link></li>
              <li><Link to="/solutions">Carte prépayée</Link></li>
              <li><Link to="/solutions">NAPS Family</Link></li>
              <li><Link to="/solutions">Entreprises</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ressources</h4>
            <ul>
              <li><a>Documentation API</a></li>
              <li><a>Centre d'aide</a></li>
              <li><a>Brochures</a></li>
              <li><a>Actualités</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a>Politique de confidentialité</a></li>
              <li><a>CGU & Tarifs</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 NAPS. Tous droits réservés.</span>
          <div className="footer-certs">
            <span className="cert-pill">PCI DSS</span>
            <span className="cert-pill">BAM Agréé</span>
            <span className="cert-pill">Mastercard Partner</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
