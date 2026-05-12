import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Reveal({ children, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // Disconnect immediately — the reveal is one-shot; we never re-hide
          // an element that has already entered the viewport.
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
