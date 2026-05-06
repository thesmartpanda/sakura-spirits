import { Link, NavLink } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop', end: false },
  { to: '/reviews', label: 'Reviews', end: false },
  { to: '/about', label: 'Our Story', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function Nav() {
  const { totalQty } = useCartContext()

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

      <Link to="/shop" className={styles.navCart}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span>Cart</span>
        <span className={styles.navCartCount}>{totalQty}</span>
      </Link>
    </nav>
  )
}
