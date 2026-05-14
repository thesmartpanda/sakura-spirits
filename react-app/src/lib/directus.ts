// ─── Config ───────────────────────────────────────────────────────

const DIRECTUS_URL =
  (import.meta.env.VITE_DIRECTUS_URL as string | undefined) ?? 'http://localhost:8055'
const DIRECTUS_TOKEN =
  (import.meta.env.VITE_DIRECTUS_TOKEN as string | undefined) ??
  'nkM2Y3r_kXxQbQNnOM35Zxao6sbecgIj'

// ─── Raw API shapes (what Directus actually returns) ───────────────

export interface FlavorProfileApiItem {
  flavor_name: string
  value: number
}

export interface WhiskyApiItem {
  id: number
  name: string
  tagline: string
  age_statement: string
  abv: string
  price_gbp: number
  price_jpy: number
  rating: number
  badge: string | null
  kanji: string
  nose: string
  palate: string
  finish: string
  background_css: string | null
  filter_key: string
  distillery: string
  flavor_profile: FlavorProfileApiItem[] | null
  image: string | null
}

export interface RegionApiItem {
  id: number
  name: string
  kanji: string
  description: string
  filter_key: string
}

export interface ReviewWhiskyApiItem {
  id: number
  name: string
  distillery: string
  age_statement: string
  abv: string
}

export interface ReviewApiItem {
  id: number
  score: number
  stars: number
  badge: string | null
  nose: string | null
  palate: string | null
  finish: string | null
  verdict: string
  author_name: string
  author_initials: string
  review_date: string | null
  whisky_id: ReviewWhiskyApiItem | null
}

export interface TeamMemberApiItem {
  id: number
  name: string
  initials: string
  role: string
  bio: string
}

export interface FaqApiItem {
  id: number
  question: string
  answer: string
}

// ─── Domain types (mapped, used by React components) ──────────────

export interface Whisky {
  id: number
  filter: string
  region: string
  name: string
  sub: string
  age: string
  abv: string
  price: string       // formatted ¥ string
  priceSub: string    // '£XX · Free UK delivery'
  priceNum: number
  rating: number
  badge: string | null
  kanji: string
  nose: string
  palate: string
  finish: string
  flavors: { name: string; val: number }[]
  bg: string
  imageUrl: string | null
}

export interface Review {
  id: number
  distillery: string
  name: string
  age: string
  abv: string
  score: number
  stars: number
  badge: string | null
  nose: string | null
  palate: string | null
  finish: string | null
  verdict: string
  author: string
  initials: string
  date: string
  scoreColor: string
  shopId: number | undefined
}

// ─── Submission payload types ─────────────────────────────────────

export interface ReviewPayload {
  author_name: string
  author_initials: string
  whisky_id: number
  stars: number
  score: number
  verdict: string
  review_date: string
  status: 'draft'
}

export interface NewsletterPayload {
  email: string
  status: 'active'
}

export interface ContactPayload {
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
  status: 'new'
}

// ─── Mapping functions ────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 95) return '#c8922a'
  if (score >= 90) return '#e0b86a'
  if (score >= 85) return '#6b8cba'
  return '#8aaa78'
}

export function mapWhisky(w: WhiskyApiItem): Whisky {
  return {
    id: w.id,
    filter: w.filter_key,
    region: w.distillery,
    name: w.name,
    sub: w.tagline,
    age: w.age_statement,
    abv: w.abv,
    price: '¥' + w.price_jpy.toLocaleString(),
    priceSub: '£' + w.price_gbp + ' · Free UK delivery',
    priceNum: w.price_gbp,
    rating: w.rating,
    badge: w.badge,
    kanji: w.kanji,
    nose: w.nose,
    palate: w.palate,
    finish: w.finish,
    flavors: (w.flavor_profile ?? []).map((f) => ({ name: f.flavor_name, val: f.value })),
    bg:
      w.background_css ??
      'linear-gradient(160deg, #3d2b1a 0%, #1a1208 60%, #c8922a22 100%)',
    imageUrl: w.image ? directusAssetUrl(w.image) : null,
  }
}

export function mapReview(r: ReviewApiItem): Review {
  const w = r.whisky_id
  const d = r.review_date
    ? new Date(r.review_date).toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      })
    : ''
  return {
    id: r.id,
    distillery: w?.distillery ?? '',
    name: w?.name ?? '',
    age: w?.age_statement ?? '',
    abv: w?.abv ?? '',
    score: r.score,
    stars: r.stars,
    badge: r.badge,
    nose: r.nose,
    palate: r.palate,
    finish: r.finish,
    verdict: r.verdict,
    author: r.author_name,
    initials: r.author_initials,
    date: d,
    scoreColor: scoreColor(r.score),
    shopId: w?.id,
  }
}

// ─── Asset helpers ────────────────────────────────────────────────

export function directusAssetUrl(fileId: string): string {
  return `${DIRECTUS_URL}/assets/${fileId}?access_token=${DIRECTUS_TOKEN}`
}

// ─── API client ───────────────────────────────────────────────────

export async function directusFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(DIRECTUS_URL + path, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    signal,
  })
  if (!res.ok) throw new Error(`Directus ${res.status}`)
  const json = (await res.json()) as { data: T }
  return json.data
}

export async function directusPost<TResponse = unknown, TPayload = unknown>(
  collection: string,
  data: TPayload,
  signal?: AbortSignal,
): Promise<TResponse> {
  const res = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  })
  const json = (await res.json()) as unknown
  if (!res.ok) throw Object.assign(new Error(`Directus ${res.status}`), { body: json })
  return (json as { data: TResponse }).data
}
