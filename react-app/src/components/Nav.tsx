import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const close = () => setMenuOpen(false)

  // Close on route change
  useEffect(() => { close() }, [pathname])

  // Lock scroll, handle Escape, close on viewport resize past breakpoint
  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('mobile-nav-open')
    setTimeout(() => closeBtnRef.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    const mql = window.matchMedia('(min-width: 769px)')
    const onResize = (e: MediaQueryListEvent) => { if (e.matches) close() }
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onResize)
    return () => {
      document.body.classList.remove('mobile-nav-open')
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onResize)
    }
  }, [menuOpen])

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

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-drawer"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className={styles.hamburgerBox}>
          <span /><span /><span />
        </span>
      </button>

      {createPortal(
        <>
          {/* Backdrop — portal so it escapes nav's backdrop-filter containing block */}
          <div
            className={`${styles.mobileBackdrop} ${menuOpen ? styles.mobileBackdropOpen : ''}`}
            aria-hidden="true"
            onClick={close}
          />

          <aside
            id="mobile-nav-drawer"
            className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
            aria-label="Site navigation"
            aria-hidden={!menuOpen}
          >
            {/* Header */}
            <div className={styles.mobileNavHeader}>
              <Link to="/" className={styles.mobileNavLogo}>
                <span className={styles.mobileNavBrandEn}>Sakura Spirits</span>
                <span className={styles.mobileNavBrandJp}>さくらスピリッツ</span>
              </Link>
              <button
                ref={closeBtnRef}
                className={styles.mobileNavClose}
                aria-label="Close navigation menu"
                onClick={close}
              >
                ✕
              </button>
            </div>

            {/* Kicker */}
            <p className={styles.mobileNavKicker}>案内 · Menu</p>

            {/* Links */}
            <ul className={styles.mobileNavLinks}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => isActive ? styles.active : undefined}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <div className={styles.mobileNavRegionsLabel}>
                  <span className={isRegionsActive ? styles.active : undefined}>Regions</span>
                  <span className={styles.mnrJp}>産地</span>
                </div>
                <ul className={styles.mobileNavSublist}>
                  {REGIONS.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/regions/${r.slug}`}
                        className={pathname === `/regions/${r.slug}` ? styles.active : undefined}
                      >
                        <span className={styles.mnsKanji}>{r.kanji}</span>
                        <span className={styles.mnsName}>{r.name}</span>
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
                    className={({ isActive }) => isActive ? styles.active : undefined}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className={styles.mobileNavFoot}>
              <span className={styles.mnFootKanji}>乾杯 · Kanpai</span>
              Curated expressions from Japan's most celebrated distilleries. Please drink responsibly.
            </div>
          </aside>
        </>,
        document.body
      )}
    </nav>
  )
}
