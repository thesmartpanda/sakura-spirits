import { Link, NavLink } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/reviews', label: 'Reviews', end: false },
  { to: '/about', label: 'Our Story', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function Nav() {
  useCartContext()

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLogo}>
        <span className={styles.navLogoEn}>Sakura Spirits</span>
        <span className={styles.navLogoJp}>さくらスピリッツ</span>
      </Link>

      <ul className={styles.navLinks}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Cart button hidden until shop is live */}
    </nav>
  )
}
