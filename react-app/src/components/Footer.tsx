import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

const DISTILLERIES = ['Yamazaki', 'Hakushu', 'Yoichi', 'Miyagikyo', 'Nikka']

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className={styles.footerBrandName}>Sakura Spirits</div>
          <div className={styles.footerBrandJp}>さくらスピリッツ</div>
          <p className={styles.footerBrandDesc}>
            Dedicated to the discovery and celebration of Japan's finest whisky
            expressions, curated with respect for tradition.
          </p>
        </div>
        <div>
          <p className={styles.footerColTitle}>Navigate</p>
          <ul className={styles.footerLinks}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.footerColTitle}>Distilleries</p>
          <ul className={styles.footerLinks}>
            {DISTILLERIES.map((name) => (
              <li key={name}>
                <Link to="/shop">{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.footerColTitle}>Legal</p>
          <ul className={styles.footerLinks}>
            <li><a href="#">Age Verification</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Shipping Info</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 Sakura Spirits. All rights reserved.</span>
        <span>You must be 18+ to purchase alcohol. Please drink responsibly.</span>
      </div>
    </footer>
  )
}
