import type { ReactNode } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import styles from './RegionPage.module.css'

// ─── Landscape SVGs ───────────────────────────────────────────────

function YamazakiSVG() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yam-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2410"/>
          <stop offset="45%" stopColor="#6a4422"/>
          <stop offset="75%" stopColor="#c8922a" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#3a2410"/>
        </linearGradient>
        <radialGradient id="yam-sun" cx="0.72" cy="0.55" r="0.18">
          <stop offset="0%" stopColor="#f5d68a" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#c8922a" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#c8922a" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="yam-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8922a" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#e0b86a" stopOpacity="0.15"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#yam-sky)"/>
      <circle cx="1150" cy="495" r="70" fill="#f5d68a" opacity="0.85"/>
      <rect width="1600" height="900" fill="url(#yam-sun)"/>
      <path d="M0,640 Q200,540 380,580 T720,540 Q920,500 1100,560 T1600,540 L1600,900 L0,900 Z" fill="#2a1b0c" opacity="0.55"/>
      <path d="M0,720 Q180,650 320,680 T620,650 Q820,620 1000,680 T1380,660 L1600,690 L1600,900 L0,900 Z" fill="#1a1208" opacity="0.75"/>
      <path d="M0,780 Q300,760 600,775 T1200,770 T1600,775 L1600,820 Q1200,830 800,815 T0,820 Z" fill="url(#yam-river)"/>
      <path d="M0,790 Q160,740 280,770 Q400,800 540,760 Q700,720 820,770 Q960,830 1140,780 Q1320,730 1450,780 L1600,770 L1600,900 L0,900 Z" fill="#0e0905"/>
      <g stroke="#c8922a" strokeWidth="1.2" opacity="0.35">
        <line x1="120" y1="800" x2="124" y2="700"/>
        <line x1="135" y1="805" x2="138" y2="690"/>
        <line x1="150" y1="800" x2="152" y2="710"/>
        <line x1="380" y1="790" x2="383" y2="680"/>
        <line x1="395" y1="795" x2="397" y2="670"/>
        <line x1="408" y1="790" x2="410" y2="685"/>
        <line x1="900" y1="800" x2="903" y2="710"/>
        <line x1="915" y1="805" x2="917" y2="695"/>
        <line x1="930" y1="800" x2="932" y2="715"/>
        <line x1="1280" y1="795" x2="1282" y2="690"/>
        <line x1="1294" y1="800" x2="1296" y2="685"/>
        <line x1="1308" y1="795" x2="1310" y2="700"/>
      </g>
      <ellipse cx="450" cy="700" rx="320" ry="22" fill="#c8922a" opacity="0.06"/>
      <ellipse cx="1100" cy="740" rx="420" ry="18" fill="#f5ead0" opacity="0.04"/>
    </svg>
  )
}

function HakushuSVG() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hak-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2e26"/>
          <stop offset="50%" stopColor="#3a5247"/>
          <stop offset="100%" stopColor="#0e1a14"/>
        </linearGradient>
        <linearGradient id="hak-peak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7d9286" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#0e1a14" stopOpacity="0.9"/>
        </linearGradient>
        <radialGradient id="hak-glow" cx="0.5" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#e0eae3" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#e0eae3" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hak-sky)"/>
      <rect width="1600" height="900" fill="url(#hak-glow)"/>
      <path d="M0,520 L180,320 L300,420 L460,250 L620,400 L780,300 L940,420 L1120,330 L1280,440 L1440,360 L1600,440 L1600,900 L0,900 Z" fill="url(#hak-peak)"/>
      <path d="M0,640 L120,540 L260,610 L420,520 L580,600 L760,520 L920,600 L1100,540 L1280,610 L1460,540 L1600,600 L1600,900 L0,900 Z" fill="#1a2820" opacity="0.85"/>
      <ellipse cx="800" cy="640" rx="900" ry="30" fill="#c8d8cf" opacity="0.12"/>
      <g fill="#0a1410">
        <path d="M0,750 L60,640 L110,750 Z M90,750 L160,610 L220,750 Z M180,750 L260,640 L330,750 Z M280,750 L370,600 L440,750 Z M380,750 L470,630 L540,750 Z M480,750 L580,580 L660,750 Z M580,750 L680,620 L760,750 Z M680,750 L790,600 L870,750 Z M780,750 L880,610 L960,750 Z M880,750 L990,580 L1080,750 Z M990,750 L1100,620 L1190,750 Z M1110,750 L1210,590 L1300,750 Z M1220,750 L1320,610 L1410,750 Z M1340,750 L1440,580 L1530,750 Z M1460,750 L1560,610 L1640,750 Z"/>
      </g>
      <g fill="#050a08">
        <path d="M-20,900 L40,700 L120,900 Z M80,900 L180,660 L290,900 Z M220,900 L340,640 L460,900 Z M380,900 L520,620 L660,900 Z M580,900 L740,640 L900,900 Z M820,900 L980,620 L1140,900 Z M1060,900 L1220,650 L1380,900 Z M1320,900 L1480,630 L1640,900 Z"/>
      </g>
      <g fill="#e0eae3" opacity="0.5">
        <path d="M460,250 L470,265 L480,255 L475,275 L450,280 L455,265 Z"/>
        <path d="M780,300 L795,320 L770,325 L790,310 Z"/>
        <path d="M1120,330 L1135,350 L1105,355 L1125,338 Z"/>
      </g>
    </svg>
  )
}

function YoichiSVG() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2438"/>
          <stop offset="50%" stopColor="#4a3a2c"/>
          <stop offset="80%" stopColor="#c8922a" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#1a1208"/>
        </linearGradient>
        <radialGradient id="yo-sun" cx="0.3" cy="0.62" r="0.16">
          <stop offset="0%" stopColor="#f5d68a" stopOpacity="0.95"/>
          <stop offset="60%" stopColor="#c8922a" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#c8922a" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="yo-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#08121e" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="yo-shimmer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d68a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#c8922a" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#yo-sky)"/>
      <ellipse cx="500" cy="540" rx="380" ry="14" fill="#1a1208" opacity="0.45"/>
      <ellipse cx="1100" cy="520" rx="500" ry="12" fill="#1a1208" opacity="0.4"/>
      <circle cx="480" cy="558" r="52" fill="#f5d68a" opacity="0.9"/>
      <rect width="1600" height="900" fill="url(#yo-sun)"/>
      <path d="M880,580 Q940,548 1020,558 Q1110,548 1180,580 L1180,600 L880,600 Z" fill="#0e1a28" opacity="0.85"/>
      <rect y="580" width="1600" height="320" fill="url(#yo-sea)"/>
      <g opacity="0.85">
        <rect x="430" y="585" width="100" height="3" fill="url(#yo-shimmer)"/>
        <rect x="440" y="600" width="80" height="2" fill="url(#yo-shimmer)"/>
        <rect x="420" y="615" width="120" height="2" fill="url(#yo-shimmer)"/>
        <rect x="450" y="635" width="60" height="2" fill="url(#yo-shimmer)"/>
        <rect x="430" y="655" width="100" height="2" fill="url(#yo-shimmer)"/>
        <rect x="445" y="680" width="70" height="2" fill="url(#yo-shimmer)"/>
        <rect x="425" y="710" width="110" height="2" fill="url(#yo-shimmer)"/>
        <rect x="450" y="745" width="60" height="2" fill="url(#yo-shimmer)"/>
      </g>
      <g stroke="#4a6a8a" strokeWidth="1" fill="none" opacity="0.35">
        <path d="M0,710 Q200,705 400,715 T800,710 T1200,712 T1600,708"/>
        <path d="M0,760 Q220,755 460,765 T880,760 T1320,762 T1600,758"/>
        <path d="M0,810 Q180,805 380,815 T780,810 T1180,812 T1600,808"/>
      </g>
      <path d="M0,900 L0,440 L80,420 L150,470 L210,460 L260,520 L290,560 L320,600 L340,660 L320,720 L280,780 L240,820 L180,860 L100,890 L0,900 Z" fill="#0a0e16"/>
      <path d="M0,440 L80,420 L150,470 L210,460 L260,520 L290,560 L320,600" stroke="#c8922a" strokeWidth="1.5" fill="none" opacity="0.35"/>
      <path d="M1600,900 L1600,500 L1540,490 L1480,540 L1430,520 L1380,580 L1340,620 L1310,680 L1300,740 L1330,800 L1380,850 L1450,880 L1530,895 L1600,900 Z" fill="#0a0e16"/>
      <path d="M1600,500 L1540,490 L1480,540 L1430,520 L1380,580 L1340,620 L1310,680" stroke="#c8922a" strokeWidth="1.2" fill="none" opacity="0.3"/>
      <ellipse cx="800" cy="620" rx="900" ry="18" fill="#c8d8e8" opacity="0.06"/>
      <g fill="none" stroke="#1a1208" strokeWidth="1.4" opacity="0.6">
        <path d="M700 380 q 10 -10 20 0 q 10 -10 20 0"/>
      </g>
    </svg>
  )
}

function MiyagikyoSVG() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2440"/>
          <stop offset="50%" stopColor="#5a4866"/>
          <stop offset="80%" stopColor="#a07a8a" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#16122a"/>
        </linearGradient>
        <radialGradient id="mi-moon" cx="0.68" cy="0.25" r="0.1">
          <stop offset="0%" stopColor="#f5ead0" stopOpacity="0.95"/>
          <stop offset="60%" stopColor="#f5ead0" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#f5ead0" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="mi-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a08aa6" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#16122a" stopOpacity="0.85"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#mi-sky)"/>
      <circle cx="1088" cy="225" r="38" fill="#f5ead0" opacity="0.92"/>
      <circle cx="1078" cy="218" r="4" fill="#c8b8c0" opacity="0.4"/>
      <circle cx="1098" cy="232" r="3" fill="#c8b8c0" opacity="0.3"/>
      <rect width="1600" height="900" fill="url(#mi-moon)"/>
      <path d="M0,500 L120,420 L240,470 L360,400 L480,460 L620,380 L760,440 L900,400 L1040,470 L1180,410 L1320,450 L1460,400 L1600,460 L1600,900 L0,900 Z" fill="#3a3050" opacity="0.65"/>
      <path d="M0,600 L140,510 L280,570 L420,490 L560,560 L720,510 L880,580 L1040,520 L1200,580 L1360,510 L1500,560 L1600,520 L1600,900 L0,900 Z" fill="#2a2240" opacity="0.85"/>
      <ellipse cx="400" cy="580" rx="500" ry="14" fill="#c8b8d0" opacity="0.12"/>
      <ellipse cx="1100" cy="600" rx="550" ry="12" fill="#c8b8d0" opacity="0.1"/>
      <path d="M0,720 L100,650 L220,700 L360,640 L500,700 L660,640 L820,710 L980,650 L1140,720 L1300,660 L1460,710 L1600,670 L1600,900 L0,900 Z" fill="#1a1430" opacity="0.95"/>
      <path d="M-60,900 Q200,820 460,800 Q620,790 720,820 L720,860 Q620,830 460,840 Q200,860 -60,930 Z" fill="url(#mi-river)"/>
      <path d="M1660,900 Q1400,830 1140,810 Q960,800 820,820 L820,860 Q960,830 1140,840 Q1400,860 1660,930 Z" fill="url(#mi-river)"/>
      <g stroke="#a08aa6" strokeWidth="1" fill="none" opacity="0.4">
        <path d="M50,860 Q280,840 520,840"/>
        <path d="M150,880 Q380,860 600,855"/>
        <path d="M1000,860 Q1240,840 1480,840"/>
        <path d="M1080,880 Q1320,860 1560,855"/>
      </g>
      <ellipse cx="770" cy="840" rx="50" ry="3" fill="#f5ead0" opacity="0.55"/>
      <ellipse cx="770" cy="850" rx="35" ry="2" fill="#f5ead0" opacity="0.3"/>
      <g fill="#0a0820">
        <ellipse cx="80" cy="770" rx="14" ry="50"/>
        <rect x="78" y="800" width="4" height="60"/>
        <ellipse cx="200" cy="760" rx="12" ry="42"/>
        <rect x="198" y="790" width="4" height="60"/>
        <ellipse cx="1400" cy="765" rx="13" ry="48"/>
        <rect x="1398" y="795" width="4" height="60"/>
        <ellipse cx="1520" cy="760" rx="14" ry="44"/>
        <rect x="1518" y="790" width="4" height="60"/>
      </g>
      <g fill="#f5d68a" opacity="0.7">
        <circle cx="400" cy="600" r="1.2"/>
        <circle cx="640" cy="640" r="1"/>
        <circle cx="900" cy="580" r="1.2"/>
        <circle cx="1180" cy="630" r="1"/>
        <circle cx="320" cy="700" r="1"/>
        <circle cx="1340" cy="700" r="1.2"/>
      </g>
    </svg>
  )
}

// ─── Bottle illustration ──────────────────────────────────────────

function BottleSVG({
  cap = '#c8922a',
  neck = '#a0721f',
  body,
  bodyOpacity = '.75',
  kanji,
  sub,
  darkLabel = false,
}: {
  cap?: string
  neck?: string
  body: string
  bodyOpacity?: string
  kanji: string
  sub: string
  darkLabel?: boolean
}) {
  const lc = darkLabel ? '#1a1208' : '#f5ead0'
  const isLong = kanji.length > 2
  const ky = isLong ? 113 : 115
  const sy = isLong ? 124 : 125
  const ks = isLong ? 5.5 : 7

  return (
    <svg
      style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '48%' }}
      viewBox="0 0 80 220"
    >
      <rect x="33" y="0" width="14" height="22" rx="3" fill={cap} opacity=".75"/>
      <rect x="30" y="18" width="20" height="8" rx="2" fill={neck} opacity=".85"/>
      <path d="M30 26 Q24 40 22 60 L22 200 Q22 210 40 210 Q58 210 58 200 L58 60 Q56 40 50 26Z" fill={body} opacity={bodyOpacity}/>
      <rect x="27" y="92" width="26" height="42" rx="2" fill="#f5ead0" opacity=".18"/>
      <text x="40" y={ky} textAnchor="middle" fontSize={ks} fill={lc} fontFamily="serif" opacity=".8">{kanji}</text>
      <text x="40" y={sy} textAnchor="middle" fontSize="3.4" fill={lc} fontFamily="serif" opacity=".7">{sub}</text>
    </svg>
  )
}

// ─── Region data ──────────────────────────────────────────────────

interface TraitData {
  icon: ReactNode
  label: string
  value: string
  detail: string
}

interface ExpressionData {
  kanji: string
  name: string
  meta: string
  notes: string
  bg: string
  bottleCap?: string
  bottleNeck?: string
  bottleBody: string
  bottleOpacity?: string
  bottleKanji: string
  bottleSub: string
  darkLabel?: boolean
}

interface OtherRegionData {
  slug: string
  kanji: string
  name: string
  tag: string
}

interface RegionData {
  heroBg: string
  svg: ReactNode
  kicker: string
  kanji: string
  titleBefore: string
  titleEm: string
  tagline: string
  meta: { label: string; value: string }[]
  introHeadingPre?: string    // optional first line (rendered with <br/> after)
  introHeadingBefore: string  // text immediately before the <em>
  introHeadingEm: string
  introPara1: string
  introPara2: string
  traits: TraitData[]
  expressions: ExpressionData[]
  fourExpressions?: boolean
  otherRegions: OtherRegionData[]
}

const REGIONS: Record<string, RegionData> = {
  yamazaki: {
    heroBg: '#2a1b0c',
    svg: <YamazakiSVG />,
    kicker: '関西 · KANSAI',
    kanji: '山崎',
    titleBefore: 'Yama',
    titleEm: 'zaki',
    tagline:
      'Where three rivers meet at the foot of the bamboo-cloaked Tennō hills — the birthplace of Japanese whisky, and the soft, fruit-laden voice of the Kansai valley.',
    meta: [
      { label: 'Founded', value: '1923' },
      { label: 'Location', value: 'Shimamoto, Osaka' },
      { label: 'Climate', value: 'Humid, river-misted' },
    ],
    introHeadingPre: 'The valley',
    introHeadingBefore: 'of ',
    introHeadingEm: 'three rivers',
    introPara1:
      'Tucked into the bamboo-thicketed foothills between Kyoto and Osaka, Yamazaki sits at the confluence of the Katsura, Uji, and Kizu rivers — a place so prized for its water that medieval tea masters traveled there to draw from its springs.',
    introPara2:
      'That same soft, mineral-rich water, combined with the valley\'s heavy summer mists and cold winters, gives Yamazaki whiskies their hallmark character: fruit-forward, deeply layered, and quietly elegant. Mizunara oak — a Japanese species used nowhere else in the world — lends a signature sandalwood-and-incense finish to the older expressions.',
    traits: [
      {
        icon: <path d="M16 4 C 10 14, 6 19, 16 28 C 26 19, 22 14, 16 4 Z"/>,
        label: 'Water',
        value: 'Three Rivers',
        detail: 'Soft, mineral-rich spring water once prized by Sen-no-Rikyū',
      },
      {
        icon: <><circle cx="16" cy="16" r="9"/><path d="M16 2 v4 M16 26 v4 M2 16 h4 M26 16 h4 M5.6 5.6 l2.8 2.8 M23.6 23.6 l2.8 2.8 M5.6 26.4 l2.8 -2.8 M23.6 8.4 l2.8 -2.8"/></>,
        label: 'Climate',
        value: 'Misty Valley',
        detail: 'Heavy summer humidity accelerates the maturation',
      },
      {
        icon: <path d="M16 6 v20 M16 6 c -4 4 -4 8 0 12 M16 6 c 4 4 4 8 0 12 M10 26 h12"/>,
        label: 'Character',
        value: 'Fruit · Honey · Incense',
        detail: 'Ripe stone fruit, honeyed depth, and a whisper of mizunara',
      },
    ],
    expressions: [
      {
        kanji: '山崎 12年', name: 'Yamazaki 12 Year', meta: '12 yr · 43% ABV · Single Malt',
        notes: 'Peach, honeyed pear and a thread of mizunara incense — the modern reference for Japanese single malt.',
        bg: 'linear-gradient(165deg, #3d2b1a 0%, #1a1208 60%, #c8922a22 100%)',
        bottleBody: '#c8922a', bottleOpacity: '.55', bottleKanji: '山崎', bottleSub: '12',
      },
      {
        kanji: '山崎 18年', name: 'Yamazaki 18 Year', meta: '18 yr · 43% ABV · Single Malt',
        notes: 'Sherry-driven depth — dried apricot, dark chocolate, and a long, woody, slightly bitter finish.',
        bg: 'linear-gradient(165deg, #5a2a0a 0%, #2d1408 60%, #c8922a33 100%)',
        bottleBody: '#5a2a0a', bottleOpacity: '.8', bottleKanji: '山崎', bottleSub: '18',
      },
      {
        kanji: '山崎 ディスティラリーズ・リザーブ', name: "Distiller's Reserve", meta: 'NAS · 43% ABV · Single Malt',
        notes: 'Younger, brighter — red berries, vanilla, a touch of cinnamon. The everyday gateway to the house style.',
        bg: 'linear-gradient(165deg, #c8922a 0%, #6a4422 50%, #1a1208 100%)',
        bottleBody: '#e0b86a', bottleOpacity: '.55', bottleKanji: '山崎', bottleSub: 'Reserve', darkLabel: true,
      },
    ],
    otherRegions: [
      { slug: 'hakushu',   kanji: '白州',  name: 'Hakushu',   tag: 'Forest distillery in the Southern Alps — green, smoky, alive' },
      { slug: 'yoichi',    kanji: '余市',  name: 'Yoichi',    tag: 'Hokkaido\'s salt-bitten coast — peated, bold, oceanic' },
      { slug: 'miyagikyo', kanji: '宮城峡', name: 'Miyagikyo', tag: 'A river valley north of Sendai — gentle, floral, refined' },
    ],
  },

  hakushu: {
    heroBg: '#1f2e26',
    svg: <HakushuSVG />,
    kicker: '山梨 · YAMANASHI',
    kanji: '白州',
    titleBefore: 'Haku',
    titleEm: 'shu',
    tagline:
      'A distillery in the forest — wrapped in pine and granite, fed by snowmelt from the Southern Alps. The greenest, most herbal voice in Japanese whisky.',
    meta: [
      { label: 'Founded', value: '1973' },
      { label: 'Location', value: 'Hokuto, Yamanashi' },
      { label: 'Elevation', value: '700 m above sea' },
    ],
    introHeadingBefore: 'The forest ',
    introHeadingEm: 'distillery',

    introPara1:
      'High in the foothills of the Kaikoma range, Hakushu is one of the few distilleries in the world built inside a working forest. Granite-filtered snowmelt from the Southern Alps — the same water that bottles as one of Japan\'s most renowned mineral waters — runs through every cask.',
    introPara2:
      'The altitude, the cool air, and the cedar-and-pine surrounds give Hakushu its unmistakable house style: green apple and cut grass, herbs and faint smoke, a clean mineral spine. Lightly peated malt is used in trace amounts, lending a campfire-in-the-mountains accent rather than a coastal blast.',
    traits: [
      {
        icon: <><path d="M4 28 L12 12 L20 22 L28 8"/><path d="M4 28 H28"/></>,
        label: 'Setting',
        value: 'Southern Alps',
        detail: 'Granite peaks, cedar forest, 700 m altitude',
      },
      {
        icon: <path d="M16 4 C 10 14, 6 19, 16 28 C 26 19, 22 14, 16 4 Z"/>,
        label: 'Water',
        value: 'Granite Snowmelt',
        detail: 'Soft, low-mineral water filtered through volcanic stone',
      },
      {
        icon: <path d="M16 6 v6 M11 12 v8 M21 12 v8 M16 18 v8 M6 26 h20"/>,
        label: 'Character',
        value: 'Herbal · Green · Smoke',
        detail: 'Cut grass, green apple, mint, and a wisp of light peat',
      },
    ],
    expressions: [
      {
        kanji: '白州 12年', name: 'Hakushu 12 Year', meta: '12 yr · 43% ABV · Single Malt',
        notes: 'Green apple, mint and basil over a thread of pinewood smoke — the most refreshing single malt in Japan.',
        bg: 'linear-gradient(165deg, #1e3a2a 0%, #0a1a12 60%, #c8e0c022 100%)',
        bottleCap: '#a8c8a0', bottleNeck: '#6a8060', bottleBody: '#2a4a3a', bottleOpacity: '.75', bottleKanji: '白州', bottleSub: '12',
      },
      {
        kanji: '白州 18年', name: 'Hakushu 18 Year', meta: '18 yr · 43% ABV · Single Malt',
        notes: 'Forest fruit and resinous oak, with the campfire smoke turned up. Long, complex, sappy finish.',
        bg: 'linear-gradient(165deg, #2a4a3a 0%, #0a1a12 60%, #c8e0c022 100%)',
        bottleCap: '#a8c8a0', bottleNeck: '#6a8060', bottleBody: '#1a3a2a', bottleOpacity: '.85', bottleKanji: '白州', bottleSub: '18',
      },
      {
        kanji: '白州 ディスティラリーズ・リザーブ', name: "Distiller's Reserve", meta: 'NAS · 43% ABV · Single Malt',
        notes: 'Bright, almost spring-like — pear blossom, fresh herbs, lemon zest. A perfect highball whisky.',
        bg: 'linear-gradient(165deg, #5a7a5a 0%, #1a3a2a 60%, #e0eaa844 100%)',
        bottleCap: '#a8c8a0', bottleNeck: '#6a8060', bottleBody: '#7a9a7a', bottleOpacity: '.5', bottleKanji: '白州', bottleSub: 'Reserve', darkLabel: true,
      },
    ],
    otherRegions: [
      { slug: 'yamazaki', kanji: '山崎',  name: 'Yamazaki',   tag: 'Birthplace of Japanese whisky — fruit, honey, mizunara incense' },
      { slug: 'yoichi',   kanji: '余市',  name: 'Yoichi',     tag: 'Hokkaido\'s salt-bitten coast — peated, bold, oceanic' },
      { slug: 'miyagikyo', kanji: '宮城峡', name: 'Miyagikyo', tag: 'A river valley north of Sendai — gentle, floral, refined' },
    ],
  },

  yoichi: {
    heroBg: '#1a2438',
    svg: <YoichiSVG />,
    kicker: '北海道 · HOKKAIDO',
    kanji: '余市',
    titleBefore: 'Yo',
    titleEm: 'ichi',
    tagline:
      'Coal-fired stills above a black-pebbled cove on Japan\'s northern coast. Yoichi is the closest Japanese whisky comes to the wild west of Scotland — peated, briny, and unmistakably oceanic.',
    meta: [
      { label: 'Founded', value: '1934' },
      { label: 'Location', value: 'Yoichi, Hokkaido' },
      { label: 'Climate', value: 'Cold, salt-bitten' },
    ],
    introHeadingBefore: 'The northern ',
    introHeadingEm: 'coast',
    introPara1:
      'Masataka Taketsuru — the father of Japanese whisky — chose this remote fishing village on Hokkaido\'s western shore because, more than any other place in Japan, it reminded him of Scotland: cold, damp, salt-aired, and surrounded by peat bogs.',
    introPara2:
      'Yoichi is the last distillery in the world to still fire its pot stills directly over coal, an old craft that gives the new-make spirit a brawny, slightly oily backbone. Decades of salt-laden sea winds blowing across the warehouses then layer on the brine, the smoke, and the dark stone-fruit depth that define every bottle.',
    traits: [
      {
        icon: <><path d="M2 22 Q8 18 14 22 T26 22 T34 22"/><path d="M2 28 Q8 24 14 28 T26 28 T34 28"/></>,
        label: 'Setting',
        value: 'Coastal Hokkaido',
        detail: 'Salt-laden sea winds, peat bogs, sub-arctic winters',
      },
      {
        icon: <><path d="M8 26 L12 18 L16 24 L20 14 L24 22 L28 16"/><circle cx="16" cy="8" r="2"/></>,
        label: 'Method',
        value: 'Coal-Fired Stills',
        detail: 'The last distillery in the world to direct-fire pot stills with coal',
      },
      {
        icon: <path d="M16 4 v8 M11 12 v8 M21 12 v8 M16 18 v10 M6 28 h20"/>,
        label: 'Character',
        value: 'Peat · Brine · Dark Fruit',
        detail: 'Coastal smoke, salted plum, and bittersweet cocoa depth',
      },
    ],
    fourExpressions: true,
    expressions: [
      {
        kanji: '余市 シングルモルト', name: 'Yoichi Single Malt', meta: 'NAS · 45% ABV · Single Malt',
        notes: 'The house style at full volume — coastal smoke, sea salt, baked apple. The everyday Yoichi.',
        bg: 'linear-gradient(165deg, #1e3a5f 0%, #08121e 60%, #c8922a22 100%)',
        bottleNeck: '#5a3a18', bottleBody: '#1a1208', bottleOpacity: '.9', bottleKanji: '余市', bottleSub: 'NAS',
      },
      {
        kanji: '余市 10年', name: 'Yoichi 10 Year', meta: '10 yr · 45% ABV · Single Malt',
        notes: 'A long-awaited return to age statements. Tighter, drier, smokier — pure coastal character in maturity.',
        bg: 'linear-gradient(165deg, #2a4a6a 0%, #08121e 60%, #c8922a22 100%)',
        bottleNeck: '#5a3a18', bottleBody: '#0e1a28', bottleOpacity: '.9', bottleKanji: '余市', bottleSub: '10',
      },
      {
        kanji: '余市 15年', name: 'Yoichi 15 Year', meta: '15 yr · 45% ABV · Single Malt',
        notes: 'Sherry-cask weight on the coal-smoke frame — dark cherry, espresso, leather. Sought-after.',
        bg: 'linear-gradient(165deg, #4a2a18 0%, #1a0e08 60%, #c8922a33 100%)',
        bottleNeck: '#5a3a18', bottleBody: '#3a1a0c', bottleOpacity: '.9', bottleKanji: '余市', bottleSub: '15',
      },
      {
        kanji: '竹鶴 ピュアモルト', name: 'Taketsuru Pure Malt', meta: 'NAS · 43% ABV · Blended Malt',
        notes: 'A tribute to the founder, marrying Yoichi\'s coastal grit with Miyagikyo\'s gentle fruit. Soft, layered, beautifully balanced.',
        bg: 'linear-gradient(165deg, #c8922a 0%, #5a3a18 50%, #1a1208 100%)',
        bottleNeck: '#5a3a18', bottleBody: '#8a5a2a', bottleOpacity: '.7', bottleKanji: '竹鶴', bottleSub: 'Pure Malt', darkLabel: true,
      },
    ],
    otherRegions: [
      { slug: 'yamazaki', kanji: '山崎',  name: 'Yamazaki',   tag: 'Birthplace of Japanese whisky — fruit, honey, mizunara incense' },
      { slug: 'hakushu',  kanji: '白州',  name: 'Hakushu',    tag: 'Forest distillery in the Southern Alps — green, smoky, alive' },
      { slug: 'miyagikyo', kanji: '宮城峡', name: 'Miyagikyo', tag: 'A river valley north of Sendai — gentle, floral, refined' },
    ],
  },

  miyagikyo: {
    heroBg: '#2a2440',
    svg: <MiyagikyoSVG />,
    kicker: '宮城 · MIYAGI / TŌHOKU',
    kanji: '宮城峡',
    titleBefore: 'Miyagi',
    titleEm: 'kyo',
    tagline:
      'A distillery tucked into a wooded gorge where two rivers meet, north of Sendai. Where Yoichi roars, Miyagikyo whispers — soft, fruity, and quietly perfect.',
    meta: [
      { label: 'Founded', value: '1969' },
      { label: 'Location', value: 'Sendai, Miyagi' },
      { label: 'Setting', value: 'Twin-river gorge' },
    ],
    introHeadingBefore: 'The gorge of ',
    introHeadingEm: 'two rivers',
    introPara1:
      'Legend says it took Masataka Taketsuru three years to find the right second site. He chose a wooded valley west of Sendai, where the Hirose and Nikkawa rivers meet — the kind of place, he wrote, where the morning mist sits on the water like silk.',
    introPara2:
      'Where Yoichi is fired and salt-bitten, Miyagikyo is steam-heated and slow. Tall, almost lantern-shaped stills produce a lighter, fruitier spirit; the humid valley air and gentle mineral water of the rivers do the rest. The result is the most floral, most delicate single malt in Japan — a perfect counterweight to its northern sibling.',
    traits: [
      {
        icon: <><path d="M4 26 Q12 18 16 22 Q20 26 28 18"/><path d="M4 18 Q12 10 16 14 Q20 18 28 10"/></>,
        label: 'Setting',
        value: 'Twin-River Gorge',
        detail: 'Confluence of the Hirose and Nikkawa rivers, wrapped in mist',
      },
      {
        icon: <><path d="M10 28 V14 L16 4 L22 14 V28 Z"/><path d="M10 18 H22"/></>,
        label: 'Method',
        value: 'Steam-Heated Stills',
        detail: 'Tall, lantern-shaped pots producing a lighter, more delicate spirit',
      },
      {
        icon: <><circle cx="16" cy="16" r="3"/><ellipse cx="16" cy="8" rx="3" ry="5"/><ellipse cx="16" cy="24" rx="3" ry="5"/><ellipse cx="8" cy="16" rx="5" ry="3"/><ellipse cx="24" cy="16" rx="5" ry="3"/></>,
        label: 'Character',
        value: 'Floral · Fruity · Elegant',
        detail: 'Pear, white flower, honey, with a soft sherried depth',
      },
    ],
    expressions: [
      {
        kanji: '宮城峡 シングルモルト', name: 'Miyagikyo Single Malt', meta: 'NAS · 45% ABV · Single Malt',
        notes: 'The house style in miniature — pear, lily, soft sherry. Easy, polished, beautifully drinkable.',
        bg: 'linear-gradient(165deg, #3a3050 0%, #161229 60%, #c8a8d022 100%)',
        bottleNeck: '#5a3a48', bottleBody: '#3a2a50', bottleOpacity: '.75', bottleKanji: '宮城峡', bottleSub: 'Single Malt',
      },
      {
        kanji: '宮城峡 12年', name: 'Miyagikyo 12 Year', meta: '12 yr · 45% ABV · Single Malt',
        notes: 'A celebrated discontinued reference — orchard fruit and beeswax, with a long, almost cognac-like finish.',
        bg: 'linear-gradient(165deg, #5a3a6a 0%, #161229 60%, #c8a8d033 100%)',
        bottleNeck: '#5a3a48', bottleBody: '#4a2a60', bottleOpacity: '.85', bottleKanji: '宮城峡', bottleSub: '12',
      },
      {
        kanji: '宮城峡 シェリーカスク', name: 'Miyagikyo Sherry Cask', meta: 'NAS · 46% ABV · Single Malt',
        notes: 'A limited release showcasing Miyagikyo\'s natural affinity for sherry — fig, raisin, hazelnut, a velvet finish.',
        bg: 'linear-gradient(165deg, #c8922a 0%, #5a3a48 50%, #161229 100%)',
        bottleNeck: '#5a3a48', bottleBody: '#8a4a6a', bottleOpacity: '.65', bottleKanji: '宮城峡', bottleSub: 'Sherry Cask', darkLabel: true,
      },
    ],
    otherRegions: [
      { slug: 'yamazaki', kanji: '山崎', name: 'Yamazaki',  tag: 'Birthplace of Japanese whisky — fruit, honey, mizunara incense' },
      { slug: 'hakushu',  kanji: '白州', name: 'Hakushu',   tag: 'Forest distillery in the Southern Alps — green, smoky, alive' },
      { slug: 'yoichi',   kanji: '余市', name: 'Yoichi',    tag: 'Hokkaido\'s salt-bitten coast — peated, bold, oceanic' },
    ],
  },
}

// ─── Page component ───────────────────────────────────────────────

export function RegionPage() {
  const { slug } = useParams<{ slug: string }>()
  const region = REGIONS[slug ?? '']

  if (!region) return <Navigate to="/" replace />

  const {
    heroBg, svg, kicker, kanji, titleBefore, titleEm, tagline, meta,
    introHeadingPre, introHeadingBefore, introHeadingEm, introPara1, introPara2,
    traits, expressions, fourExpressions, otherRegions,
  } = region

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.regionHero} style={{ background: heroBg }}>
        <div className={styles.heroCanvas}>{svg}</div>

        <div className={styles.heroInner}>
          <div>
            <p className={styles.heroKicker}>{kicker}</p>
            <p className={styles.heroKanji}>{kanji}</p>
            <h1 className={styles.heroTitle}>
              {titleBefore}<em>{titleEm}</em>
            </h1>
            <p className={styles.heroTagline}>{tagline}</p>
          </div>

          <div className={styles.heroMeta}>
            <dl>
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <Reveal>
        <section className={styles.intro}>
          <div>
            <p className={styles.introLabel}>産地について</p>
            <h2 className={styles.introHeading}>
              {introHeadingPre && <>{introHeadingPre}<br/></>}
              {introHeadingBefore}<em>{introHeadingEm}</em>
            </h2>
          </div>
          <div className={styles.introBody}>
            <p>{introPara1}</p>
            <p>{introPara2}</p>
          </div>
        </section>
      </Reveal>

      {/* ── TRAITS ── */}
      <Reveal>
        <div className={styles.traitsWrap}>
          <div className={styles.traits}>
            {traits.map((t) => (
              <div key={t.label} className={styles.trait}>
                <svg className={styles.traitIcon} viewBox="0 0 32 32">
                  {t.icon}
                </svg>
                <p className={styles.traitLabel}>{t.label}</p>
                <p className={styles.traitValue}>{t.value}</p>
                <p className={styles.traitDetail}>{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── EXPRESSIONS ── */}
      <section className={styles.expressions}>
        <Reveal>
          <div className={styles.exprHeader}>
            <div>
              <p className={styles.exprLabel}>代表的なボトル</p>
              <h2 className={styles.exprTitle}>
                Defining <em>Expressions</em>
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div className={`${styles.exprGrid}${fourExpressions ? ` ${styles.exprGridFour}` : ''}`}>
            {expressions.map((expr) => (
              <article key={expr.name} className={styles.exprCard}>
                <div className={styles.exprCardImg}>
                  <div className={styles.exprCardImgInner} style={{ background: expr.bg }}>
                    <BottleSVG
                      cap={expr.bottleCap}
                      neck={expr.bottleNeck}
                      body={expr.bottleBody}
                      bodyOpacity={expr.bottleOpacity}
                      kanji={expr.bottleKanji}
                      sub={expr.bottleSub}
                      darkLabel={expr.darkLabel}
                    />
                  </div>
                </div>
                <div className={styles.exprCardBody}>
                  <p className={styles.exprCardKanji}>{expr.kanji}</p>
                  <h3 className={styles.exprCardName}>{expr.name}</h3>
                  <p className={styles.exprCardMeta}>{expr.meta}</p>
                  <p className={styles.exprCardNotes}>{expr.notes}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── OTHER REGIONS ── */}
      <section className={styles.otherRegions}>
        <div className={styles.otherRegionsInner}>
          <Reveal>
            <div className={styles.otherRegionsHead}>
              <span className={styles.orSectionLabel}>他の産地</span>
              <h2>Continue your <em>journey</em></h2>
            </div>
          </Reveal>
          <Reveal style={{ transitionDelay: '0.1s' }}>
            <div className={styles.otherRegionsGrid}>
              {otherRegions.map((r) => (
                <Link key={r.slug} to={`/regions/${r.slug}`} className={styles.orCard}>
                  <p className={styles.orCardKanji}>{r.kanji}</p>
                  <h3 className={styles.orCardName}>{r.name}</h3>
                  <p className={styles.orCardTag}>{r.tag}</p>
                  <span className={styles.orCardArrow}>→</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
