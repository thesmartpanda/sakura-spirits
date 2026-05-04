const DIRECTUS_URL = 'http://localhost:8055';
const DIRECTUS_TOKEN = 'nkM2Y3r_kXxQbQNnOM35Zxao6sbecgIj';

async function directusFetch(path) {
  const res = await fetch(DIRECTUS_URL + path, {
    headers: { Authorization: 'Bearer ' + DIRECTUS_TOKEN }
  });
  if (!res.ok) throw new Error('Directus ' + res.status);
  return (await res.json()).data;
}

async function directusPost(collection, data) {
  const res = await fetch(DIRECTUS_URL + '/items/' + collection, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + DIRECTUS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error('Directus ' + res.status), { body: json });
  return json.data;
}

function bottleSVG(kanji) {
  return `<svg style="position:absolute;width:45%;height:auto;z-index:1" viewBox="0 0 80 220" fill="none">
    <rect x="33" y="0" width="14" height="22" rx="3" fill="#c8922a" opacity=".7"/>
    <rect x="30" y="18" width="20" height="8" rx="2" fill="#a0721f" opacity=".8"/>
    <path d="M30 26 Q24 40 22 60 L22 200 Q22 210 40 210 Q58 210 58 200 L58 60 Q56 40 50 26Z" fill="#c8922a" opacity=".45"/>
    <rect x="27" y="90" width="26" height="38" rx="2" fill="#f5ead0" opacity=".12"/>
    <text x="40" y="114" text-anchor="middle" font-size="9" fill="#f5ead0" font-family="serif" opacity=".7">${kanji || ''}</text>
  </svg>`;
}

function starRating(rating) {
  const full = Math.round(rating);
  return [1,2,3,4,5].map(i =>
    `<span class="star" style="${i > full ? 'color:var(--cream-deeper)' : ''}">&#9733;</span>`
  ).join('') + `<span style="font-size:0.78rem;color:var(--text-muted);margin-left:6px;">${rating}</span>`;
}
