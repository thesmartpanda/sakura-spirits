import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import styles from './Nav.module.css'

const REGIONS = [
  { slug: 'yamazaki', kanji: '山崎', name: 'Yamazaki' },
  { slug: 'hakushu',  kanji: '白州', name: 'Hakushu'  },
  { slug: 'yoichi',   kanji: '余市', name: 'Yoichi'   },
  { slug: 'miyagikyo', kanji: '宮城峡', name: 'Miyagikyo' },
]

const NAV_LINKS = [
  { to: '/reviews', label: 'Reviews', end: false },
  { to: '/about',   label: 'Our Story', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function Nav() {
  useCartContext()
  const { pathname } = useLocation()
  const isRegionsActive = pathname.startsWith('/regions')

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLogo}>
        <span className={styles.navLogoEn}>Sakura Spirits</span>
        <span className={styles.navLogoJp}>さくらスピリッツ</span>
      </Link>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
        </li>

        <li className={styles.hasDropdown}>
          <Link to="/regions/yamazaki" className={isRegionsActive ? 'active' : undefined}>
            Regions
          </Link>
          <ul className={styles.dropdown}>
            {REGIONS.map((r) => (
              <li key={r.slug} className={styles.dropdownItem}>
                <Link to={`/regions/${r.slug}`} className={styles.dropdownLink}>
                  <span className={styles.dropdownKanji}>{r.kanji}</span>
                  <span className={styles.dropdownName}>{r.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

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
    </nav>
  )
}
