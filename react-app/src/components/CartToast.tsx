import { createPortal } from 'react-dom'

interface CartToastProps {
  visible: boolean
}

export function CartToast({ visible }: CartToastProps) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'var(--brown-deep)',
        color: 'var(--cream)',
        padding: '1rem 1.5rem',
        fontFamily: 'var(--font-display)',
        fontSize: '0.9rem',
        transform: visible ? 'translateY(0)' : 'translateY(100px)',
        transition: 'transform 0.3s',
        zIndex: 3000,
        pointerEvents: 'none',
      }}
    >
      ✓ Added to cart
    </div>,
    document.body,
  )
}
