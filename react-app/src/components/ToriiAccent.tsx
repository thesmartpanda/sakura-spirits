import type { CSSProperties } from 'react'

interface ToriiAccentProps {
  style?: CSSProperties
}

export function ToriiAccent({ style }: ToriiAccentProps) {
  return (
    <svg className="torii-accent" style={style} viewBox="0 0 300 600" fill="none">
      <rect x="40" y="120" width="28" height="480" fill="#c8922a" />
      <rect x="232" y="120" width="28" height="480" fill="#c8922a" />
      <rect x="10" y="60" width="280" height="30" fill="#c8922a" />
      <path d="M10 60 Q0 40 10 30 L20 60Z" fill="#c8922a" />
      <path d="M290 60 Q300 40 290 30 L280 60Z" fill="#c8922a" />
      <rect x="30" y="105" width="240" height="18" fill="#c8922a" />
    </svg>
  )
}
