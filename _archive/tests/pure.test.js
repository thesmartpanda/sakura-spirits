import { describe, it, expect } from 'vitest';

// ─── getScoreColor (reviews.html) ────────────────────────────────
function getScoreColor(s) {
  if (s >= 95) return '#c8922a';
  if (s >= 90) return '#e0b86a';
  if (s >= 85) return '#6b8cba';
  return '#8aaa78';
}

describe('getScoreColor', () => {
  it('returns gold for score === 95 (boundary)', () => {
    expect(getScoreColor(95)).toBe('#c8922a');
  });
  it('returns gold for score 96–100', () => {
    expect(getScoreColor(100)).toBe('#c8922a');
    expect(getScoreColor(99)).toBe('#c8922a');
  });
  it('returns light gold for score === 90 (boundary)', () => {
    expect(getScoreColor(90)).toBe('#e0b86a');
  });
  it('returns light gold for scores 91–94', () => {
    expect(getScoreColor(91)).toBe('#e0b86a');
    expect(getScoreColor(94)).toBe('#e0b86a');
  });
  it('returns blue for score === 85 (boundary)', () => {
    expect(getScoreColor(85)).toBe('#6b8cba');
  });
  it('returns blue for scores 86–89', () => {
    expect(getScoreColor(86)).toBe('#6b8cba');
    expect(getScoreColor(89)).toBe('#6b8cba');
  });
  it('returns green for score === 84 (just below blue boundary)', () => {
    expect(getScoreColor(84)).toBe('#8aaa78');
  });
  it('returns green for low scores', () => {
    expect(getScoreColor(0)).toBe('#8aaa78');
    expect(getScoreColor(50)).toBe('#8aaa78');
  });
});

// ─── renderStars (reviews.html) ──────────────────────────────────
function renderStars(n) {
  return [1, 2, 3, 4, 5].map(i => `<span class="star${i <= n ? '' : ' empty'}">★</span>`).join('');
}

describe('renderStars', () => {
  it('always produces exactly 5 span elements', () => {
    expect(renderStars(3).match(/<span/g)).toHaveLength(5);
    expect(renderStars(0).match(/<span/g)).toHaveLength(5);
  });

  it('n=5: all stars filled (no "empty" class)', () => {
    const html = renderStars(5);
    expect(html).not.toContain('empty');
    expect(html.match(/class="star"/g)).toHaveLength(5);
  });

  it('n=0: all stars empty', () => {
    const html = renderStars(0);
    expect(html.match(/star empty/g)).toHaveLength(5);
    expect(html).not.toContain('class="star">');
  });

  it('n=3: first 3 filled, last 2 empty', () => {
    const html = renderStars(3);
    expect(html.match(/class="star"/g)).toHaveLength(3);
    expect(html.match(/star empty/g)).toHaveLength(2);
  });

  it('n=1: one filled, four empty', () => {
    const html = renderStars(1);
    expect(html.match(/class="star"/g)).toHaveLength(1);
    expect(html.match(/star empty/g)).toHaveLength(4);
  });

  it('each star contains the ★ character', () => {
    expect(renderStars(3).match(/★/g)).toHaveLength(5);
  });
});

// ─── starRating (directus.js) ─────────────────────────────────────
function starRating(rating) {
  const full = Math.round(rating);
  return [1, 2, 3, 4, 5]
    .map(i => `<span class="star" style="${i > full ? 'color:var(--cream-deeper)' : ''}">&#9733;</span>`)
    .join('') + `<span style="font-size:0.78rem;color:var(--text-muted);margin-left:6px;">${rating}</span>`;
}

describe('starRating', () => {
  it('always renders 5 star spans', () => {
    expect(starRating(3).match(/<span class="star"/g)).toHaveLength(5);
  });

  it('appends a trailing span containing the raw rating value', () => {
    expect(starRating(4.5)).toContain(
      '<span style="font-size:0.78rem;color:var(--text-muted);margin-left:6px;">4.5</span>'
    );
  });

  it('rating=5: all 5 stars filled (empty style attribute)', () => {
    const html = starRating(5);
    expect(html.match(/style=""/g)).toHaveLength(5);
    expect(html).not.toContain('cream-deeper');
  });

  it('rating=0: all 5 stars dimmed', () => {
    const html = starRating(0);
    expect(html.match(/color:var\(--cream-deeper\)/g)).toHaveLength(5);
  });

  it('rating=4.4 rounds to 4: 4 filled, 1 dimmed', () => {
    const html = starRating(4.4);
    expect(html.match(/style=""/g)).toHaveLength(4);
    expect(html.match(/color:var\(--cream-deeper\)/g)).toHaveLength(1);
  });

  it('rating=4.5 rounds to 5 (JS round-half-up): all 5 filled', () => {
    const html = starRating(4.5);
    expect(html.match(/style=""/g)).toHaveLength(5);
  });

  it('rating=3.5 rounds to 4: 4 filled, 1 dimmed', () => {
    const html = starRating(3.5);
    expect(html.match(/style=""/g)).toHaveLength(4);
    expect(html.match(/color:var\(--cream-deeper\)/g)).toHaveLength(1);
  });
});

// ─── bottleSVG (directus.js) ──────────────────────────────────────
function bottleSVG(kanji) {
  return `<svg style="position:absolute;width:45%;height:auto;z-index:1" viewBox="0 0 80 220" fill="none">
    <rect x="33" y="0" width="14" height="22" rx="3" fill="#c8922a" opacity=".7"/>
    <rect x="30" y="18" width="20" height="8" rx="2" fill="#a0721f" opacity=".8"/>
    <path d="M30 26 Q24 40 22 60 L22 200 Q22 210 40 210 Q58 210 58 200 L58 60 Q56 40 50 26Z" fill="#c8922a" opacity=".45"/>
    <rect x="27" y="90" width="26" height="38" rx="2" fill="#f5ead0" opacity=".12"/>
    <text x="40" y="114" text-anchor="middle" font-size="9" fill="#f5ead0" font-family="serif" opacity=".7">${kanji || ''}</text>
  </svg>`;
}

describe('bottleSVG', () => {
  it('returns an SVG string', () => {
    expect(bottleSVG('山')).toContain('<svg');
    expect(bottleSVG('山')).toContain('</svg>');
  });

  it('embeds the kanji inside the text element', () => {
    expect(bottleSVG('山')).toContain('>山<');
  });

  it('renders empty text element when kanji is null', () => {
    const svg = bottleSVG(null);
    expect(svg).toContain('opacity=".7"></text>');
    expect(svg).not.toContain('>null<');
  });

  it('renders empty text element when kanji is undefined', () => {
    const svg = bottleSVG(undefined);
    expect(svg).toContain('opacity=".7"></text>');
  });

  it('renders empty text element when kanji is empty string', () => {
    const svg = bottleSVG('');
    expect(svg).toContain('opacity=".7"></text>');
  });

  it('SVG viewBox is always "0 0 80 220"', () => {
    expect(bottleSVG('A')).toContain('viewBox="0 0 80 220"');
  });
});

// ─── mapReview (reviews.html) ─────────────────────────────────────
function mapReview(r) {
  const w = r.whisky_id || {};
  const d = r.review_date
    ? new Date(r.review_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : '';
  return {
    id: r.id,
    distillery: w.distillery || '',
    name: w.name || '',
    age: w.age_statement || '',
    abv: w.abv || '',
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
    scoreColor: getScoreColor(r.score),
    shopId: w.id,
  };
}

const BASE_REVIEW = {
  id: 7,
  whisky_id: {
    id: 42,
    distillery: 'Yamazaki',
    name: 'Single Malt 12',
    age_statement: '12 Year',
    abv: '43%',
  },
  score: 92,
  stars: 4,
  badge: "Editor's Pick",
  nose: 'Peach',
  palate: 'Oak',
  finish: 'Long',
  verdict: 'Excellent whisky.',
  author_name: 'Jane Smith',
  author_initials: 'JS',
  review_date: '2024-03-15',
};

describe('mapReview', () => {
  it('maps scalar review fields directly', () => {
    const r = mapReview(BASE_REVIEW);
    expect(r.id).toBe(7);
    expect(r.score).toBe(92);
    expect(r.stars).toBe(4);
    expect(r.badge).toBe("Editor's Pick");
    expect(r.nose).toBe('Peach');
    expect(r.palate).toBe('Oak');
    expect(r.finish).toBe('Long');
    expect(r.verdict).toBe('Excellent whisky.');
    expect(r.author).toBe('Jane Smith');
    expect(r.initials).toBe('JS');
  });

  it('maps whisky sub-fields from whisky_id', () => {
    const r = mapReview(BASE_REVIEW);
    expect(r.distillery).toBe('Yamazaki');
    expect(r.name).toBe('Single Malt 12');
    expect(r.age).toBe('12 Year');
    expect(r.abv).toBe('43%');
    expect(r.shopId).toBe(42);
  });

  it('formats review_date as "Month Year" (en-GB locale)', () => {
    const r = mapReview(BASE_REVIEW);
    expect(r.date).toBe('March 2024');
  });

  it('returns empty string for date when review_date is null', () => {
    expect(mapReview({ ...BASE_REVIEW, review_date: null }).date).toBe('');
  });

  it('returns empty string for date when review_date is undefined', () => {
    expect(mapReview({ ...BASE_REVIEW, review_date: undefined }).date).toBe('');
  });

  it('returns empty strings for all whisky fields when whisky_id is null', () => {
    const r = mapReview({ ...BASE_REVIEW, whisky_id: null });
    expect(r.distillery).toBe('');
    expect(r.name).toBe('');
    expect(r.age).toBe('');
    expect(r.abv).toBe('');
    expect(r.shopId).toBeUndefined();
  });

  it('scoreColor reflects score via getScoreColor', () => {
    expect(mapReview({ ...BASE_REVIEW, score: 95 }).scoreColor).toBe('#c8922a');
    expect(mapReview({ ...BASE_REVIEW, score: 90 }).scoreColor).toBe('#e0b86a');
    expect(mapReview({ ...BASE_REVIEW, score: 85 }).scoreColor).toBe('#6b8cba');
    expect(mapReview({ ...BASE_REVIEW, score: 70 }).scoreColor).toBe('#8aaa78');
  });

  it('passes badge through even when null', () => {
    expect(mapReview({ ...BASE_REVIEW, badge: null }).badge).toBeNull();
  });
});

// ─── mapWhisky (shop.html) ────────────────────────────────────────
function mapWhisky(w) {
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
    flavors: (w.flavor_profile || []).map(f => ({ name: f.flavor_name, val: f.value })),
    bg: w.background_css || 'linear-gradient(160deg, #3d2b1a 0%, #1a1208 60%, #c8922a22 100%)',
  };
}

const BASE_WHISKY = {
  id: 1,
  filter_key: 'yamazaki',
  distillery: 'Yamazaki',
  name: 'Single Malt 12',
  tagline: 'Elegant · Fruity',
  age_statement: '12 Year',
  abv: '43%',
  price_jpy: 15000,
  price_gbp: 85,
  rating: 4.5,
  badge: 'Best Seller',
  kanji: '山',
  nose: 'Peach and vanilla',
  palate: 'Sweet oak',
  finish: 'Long and smooth',
  flavor_profile: [
    { flavor_name: 'Sweetness', value: 80 },
    { flavor_name: 'Smokiness', value: 10 },
  ],
  background_css: 'linear-gradient(160deg, #3d2b1a, #1a1208)',
};

describe('mapWhisky', () => {
  it('maps identity fields', () => {
    const w = mapWhisky(BASE_WHISKY);
    expect(w.id).toBe(1);
    expect(w.filter).toBe('yamazaki');
    expect(w.region).toBe('Yamazaki');
    expect(w.name).toBe('Single Malt 12');
    expect(w.sub).toBe('Elegant · Fruity');
    expect(w.age).toBe('12 Year');
    expect(w.abv).toBe('43%');
    expect(w.rating).toBe(4.5);
    expect(w.badge).toBe('Best Seller');
    expect(w.kanji).toBe('山');
  });

  it('formats price_jpy with ¥ prefix and locale separators', () => {
    expect(mapWhisky(BASE_WHISKY).price).toBe('¥' + (15000).toLocaleString());
  });

  it('formats large price_jpy correctly', () => {
    expect(mapWhisky({ ...BASE_WHISKY, price_jpy: 1000000 }).price).toBe('¥' + (1000000).toLocaleString());
  });

  it('builds priceSub as "£{gbp} · Free UK delivery"', () => {
    expect(mapWhisky(BASE_WHISKY).priceSub).toBe('£85 · Free UK delivery');
  });

  it('exposes priceNum as raw GBP number', () => {
    expect(mapWhisky(BASE_WHISKY).priceNum).toBe(85);
  });

  it('maps flavor_profile to flavors array with name/val shape', () => {
    const { flavors } = mapWhisky(BASE_WHISKY);
    expect(flavors).toEqual([
      { name: 'Sweetness', val: 80 },
      { name: 'Smokiness', val: 10 },
    ]);
  });

  it('returns empty flavors array when flavor_profile is null', () => {
    expect(mapWhisky({ ...BASE_WHISKY, flavor_profile: null }).flavors).toEqual([]);
  });

  it('returns empty flavors array when flavor_profile is undefined', () => {
    expect(mapWhisky({ ...BASE_WHISKY, flavor_profile: undefined }).flavors).toEqual([]);
  });

  it('uses background_css when provided', () => {
    expect(mapWhisky(BASE_WHISKY).bg).toBe('linear-gradient(160deg, #3d2b1a, #1a1208)');
  });

  it('falls back to default gradient when background_css is null', () => {
    const fallback = 'linear-gradient(160deg, #3d2b1a 0%, #1a1208 60%, #c8922a22 100%)';
    expect(mapWhisky({ ...BASE_WHISKY, background_css: null }).bg).toBe(fallback);
  });

  it('falls back to default gradient when background_css is undefined', () => {
    const fallback = 'linear-gradient(160deg, #3d2b1a 0%, #1a1208 60%, #c8922a22 100%)';
    expect(mapWhisky({ ...BASE_WHISKY, background_css: undefined }).bg).toBe(fallback);
  });
});
