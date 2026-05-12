interface BottleSvgProps {
  kanji: string
}

export function BottleSvg({ kanji }: BottleSvgProps) {
  return (
    <svg
      style={{ position: 'absolute', width: '45%', height: 'auto', zIndex: 1 }}
      viewBox="0 0 80 220"
      fill="none"
    >
      <rect x="33" y="0" width="14" height="22" rx="3" fill="#c8922a" opacity=".7" />
      <rect x="30" y="18" width="20" height="8" rx="2" fill="#a0721f" opacity=".8" />
      <path
        d="M30 26 Q24 40 22 60 L22 200 Q22 210 40 210 Q58 210 58 200 L58 60 Q56 40 50 26Z"
        fill="#c8922a"
        opacity=".45"
      />
      <rect x="27" y="90" width="26" height="38" rx="2" fill="#f5ead0" opacity=".12" />
      <text
        x="40"
        y="114"
        textAnchor="middle"
        fontSize="9"
        fill="#f5ead0"
        fontFamily="serif"
        opacity=".7"
      >
        {kanji}
      </text>
    </svg>
  )
}
