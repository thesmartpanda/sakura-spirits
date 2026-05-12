import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── updateCartCount (directus.js) ───────────────────────────────
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('sakura_cart') || '[]');
  document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

describe('updateCartCount', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="cartCount"></span>';
    localStorage.clear();
  });

  it('shows 0 when cart key is absent', () => {
    updateCartCount();
    expect(document.getElementById('cartCount').textContent).toBe('0');
  });

  it('shows 0 when cart is an empty array', () => {
    localStorage.setItem('sakura_cart', '[]');
    updateCartCount();
    expect(document.getElementById('cartCount').textContent).toBe('0');
  });

  it('sums qty across multiple items', () => {
    localStorage.setItem('sakura_cart', JSON.stringify([
      { id: 1, qty: 2 },
      { id: 2, qty: 3 },
    ]));
    updateCartCount();
    expect(document.getElementById('cartCount').textContent).toBe('5');
  });

  it('reflects a single item with qty 1', () => {
    localStorage.setItem('sakura_cart', JSON.stringify([{ id: 1, qty: 1 }]));
    updateCartCount();
    expect(document.getElementById('cartCount').textContent).toBe('1');
  });

  it('reflects a single item with qty > 1', () => {
    localStorage.setItem('sakura_cart', JSON.stringify([{ id: 1, qty: 7 }]));
    updateCartCount();
    expect(document.getElementById('cartCount').textContent).toBe('7');
  });
});

// ─── setSubject (contact.html) ───────────────────────────────────
function setSubject(btn) {
  document.querySelectorAll('.subject-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

describe('setSubject', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="subject-tab active" id="t1">Order</button>
      <button class="subject-tab" id="t2">Product</button>
      <button class="subject-tab" id="t3">General</button>
    `;
  });

  it('removes active from all other tabs', () => {
    setSubject(document.getElementById('t2'));
    expect(document.getElementById('t1').classList.contains('active')).toBe(false);
    expect(document.getElementById('t3').classList.contains('active')).toBe(false);
  });

  it('adds active to the clicked button', () => {
    const btn = document.getElementById('t2');
    setSubject(btn);
    expect(btn.classList.contains('active')).toBe(true);
  });

  it('exactly one tab is active after the call', () => {
    setSubject(document.getElementById('t3'));
    expect(document.querySelectorAll('.subject-tab.active')).toHaveLength(1);
  });

  it('clicking the already-active tab keeps it active', () => {
    const btn = document.getElementById('t1');
    setSubject(btn);
    expect(btn.classList.contains('active')).toBe(true);
  });
});

// ─── toggleFaq (contact.html) ────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

describe('toggleFaq', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="faq-item" id="f1"><button class="faq-question" id="q1">Q1</button></div>
      <div class="faq-item" id="f2"><button class="faq-question" id="q2">Q2</button></div>
      <div class="faq-item" id="f3"><button class="faq-question" id="q3">Q3</button></div>
    `;
  });

  it('opens a closed item', () => {
    toggleFaq(document.getElementById('q1'));
    expect(document.getElementById('f1').classList.contains('open')).toBe(true);
  });

  it('closes an already-open item (toggle behaviour)', () => {
    document.getElementById('f1').classList.add('open');
    toggleFaq(document.getElementById('q1'));
    expect(document.getElementById('f1').classList.contains('open')).toBe(false);
  });

  it('closes all other items when opening one', () => {
    document.getElementById('f1').classList.add('open');
    toggleFaq(document.getElementById('q2'));
    expect(document.getElementById('f1').classList.contains('open')).toBe(false);
    expect(document.getElementById('f2').classList.contains('open')).toBe(true);
  });

  it('no more than one item is open at a time', () => {
    toggleFaq(document.getElementById('q1'));
    toggleFaq(document.getElementById('q2'));
    expect(document.querySelectorAll('.faq-item.open')).toHaveLength(1);
    expect(document.getElementById('f2').classList.contains('open')).toBe(true);
  });

  it('results in zero open items when toggling the only open item closed', () => {
    document.getElementById('f3').classList.add('open');
    toggleFaq(document.getElementById('q3'));
    expect(document.querySelectorAll('.faq-item.open')).toHaveLength(0);
  });
});

// ─── clearFieldError (reviews.html) ──────────────────────────────
function clearFieldError(inputEl, errorId) {
  inputEl.classList.remove('field-invalid');
  document.getElementById(errorId).classList.remove('show');
}

describe('clearFieldError', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="testInput" class="field-invalid" />
      <span id="testError" class="show">Error</span>
    `;
  });

  it('removes field-invalid from the input', () => {
    clearFieldError(document.getElementById('testInput'), 'testError');
    expect(document.getElementById('testInput').classList.contains('field-invalid')).toBe(false);
  });

  it('removes show from the error element', () => {
    clearFieldError(document.getElementById('testInput'), 'testError');
    expect(document.getElementById('testError').classList.contains('show')).toBe(false);
  });

  it('is idempotent when classes are already absent', () => {
    const input = document.getElementById('testInput');
    input.classList.remove('field-invalid');
    document.getElementById('testError').classList.remove('show');
    clearFieldError(input, 'testError');
    expect(input.classList.contains('field-invalid')).toBe(false);
    expect(document.getElementById('testError').classList.contains('show')).toBe(false);
  });
});

// ─── toggleDetail (reviews.html) ─────────────────────────────────
function toggleDetail(id) {
  const detail = document.getElementById('detail' + id);
  const btn = document.getElementById('expandBtn' + id);
  detail.classList.toggle('open');
  btn.classList.toggle('open');
}

describe('toggleDetail', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="detail42"></div>
      <button id="expandBtn42"></button>
    `;
  });

  it('adds open to both detail and button when closed', () => {
    toggleDetail(42);
    expect(document.getElementById('detail42').classList.contains('open')).toBe(true);
    expect(document.getElementById('expandBtn42').classList.contains('open')).toBe(true);
  });

  it('removes open from both when already open', () => {
    document.getElementById('detail42').classList.add('open');
    document.getElementById('expandBtn42').classList.add('open');
    toggleDetail(42);
    expect(document.getElementById('detail42').classList.contains('open')).toBe(false);
    expect(document.getElementById('expandBtn42').classList.contains('open')).toBe(false);
  });

  it('second call toggles back to open', () => {
    toggleDetail(42);
    toggleDetail(42);
    toggleDetail(42);
    expect(document.getElementById('detail42').classList.contains('open')).toBe(true);
  });
});

// ─── closeDrawerDirect (shop.html) ───────────────────────────────
function closeDrawerDirect() {
  document.getElementById('tastingOverlay').classList.remove('open');
}

describe('closeDrawerDirect', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="tastingOverlay" class="open"></div>';
  });

  it('removes open class from tastingOverlay', () => {
    closeDrawerDirect();
    expect(document.getElementById('tastingOverlay').classList.contains('open')).toBe(false);
  });

  it('is idempotent when overlay is already closed', () => {
    document.getElementById('tastingOverlay').classList.remove('open');
    closeDrawerDirect();
    expect(document.getElementById('tastingOverlay').classList.contains('open')).toBe(false);
  });
});

// ─── closeDrawer (shop.html) ─────────────────────────────────────
function closeDrawer(e) {
  if (e.target === document.getElementById('tastingOverlay')) closeDrawerDirect();
}

describe('closeDrawer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="tastingOverlay" class="open"><div id="inner"></div></div>';
  });

  it('removes open when the click target is the overlay itself', () => {
    const overlay = document.getElementById('tastingOverlay');
    closeDrawer({ target: overlay });
    expect(overlay.classList.contains('open')).toBe(false);
  });

  it('does NOT remove open when click target is a child element', () => {
    const overlay = document.getElementById('tastingOverlay');
    const inner = document.getElementById('inner');
    closeDrawer({ target: inner });
    expect(overlay.classList.contains('open')).toBe(true);
  });
});

// ─── showCartToast (shop.html) ───────────────────────────────────
function showCartToast() {
  const t = document.getElementById('cartToast');
  t.style.transform = 'translateY(0)';
  setTimeout(() => {
    t.style.transform = 'translateY(100px)';
  }, 2000);
}

describe('showCartToast', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="cartToast" style="transform: translateY(100px)"></div>';
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('immediately sets transform to translateY(0)', () => {
    showCartToast();
    expect(document.getElementById('cartToast').style.transform).toBe('translateY(0)');
  });

  it('slides the toast down (translateY 100px) after exactly 2000 ms', () => {
    showCartToast();
    vi.advanceTimersByTime(2000);
    expect(document.getElementById('cartToast').style.transform).toBe('translateY(100px)');
  });

  it('has not slid down at 1999 ms', () => {
    showCartToast();
    vi.advanceTimersByTime(1999);
    expect(document.getElementById('cartToast').style.transform).toBe('translateY(0)');
  });
});

// ─── toggleCartToast (shop.html) ─────────────────────────────────
function toggleCartToast() {
  const cart = JSON.parse(localStorage.getItem('sakura_cart') || '[]');
  if (!cart.length) return;
  alert(
    cart.map(i => `${i.name} × ${i.qty} — ${i.price}`).join('\n') +
      `\n\nTotal items: ${cart.reduce((s, i) => s + i.qty, 0)}`
  );
}

describe('toggleCartToast', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('does not call alert when cart is empty', () => {
    toggleCartToast();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('does not call alert when cart key is absent', () => {
    toggleCartToast();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('calls alert with formatted items and total for a single item', () => {
    localStorage.setItem(
      'sakura_cart',
      JSON.stringify([{ id: 1, name: 'Yamazaki 12', price: '£85', qty: 1 }])
    );
    toggleCartToast();
    expect(window.alert).toHaveBeenCalledWith('Yamazaki 12 × 1 — £85\n\nTotal items: 1');
  });

  it('calls alert with multiple items separated by newlines', () => {
    localStorage.setItem(
      'sakura_cart',
      JSON.stringify([
        { id: 1, name: 'Yamazaki 12', price: '£85', qty: 2 },
        { id: 2, name: 'Hakushu 18', price: '£120', qty: 1 },
      ])
    );
    toggleCartToast();
    expect(window.alert).toHaveBeenCalledWith(
      'Yamazaki 12 × 2 — £85\nHakushu 18 × 1 — £120\n\nTotal items: 3'
    );
  });
});

// ─── addToCart (shop.html) ────────────────────────────────────────
let WHISKIES_MOCK = [];

function addToCart_impl(id, e, deps) {
  if (e) e.stopPropagation();
  const w = WHISKIES_MOCK.find(x => x.id === id);
  let cart = JSON.parse(localStorage.getItem('sakura_cart') || '[]');
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name: w.name, price: w.priceSub.split('·')[0].trim(), qty: 1 });
  localStorage.setItem('sakura_cart', JSON.stringify(cart));
  deps.updateCartCount();

  const btn = document.getElementById('btn-' + id);
  if (btn) {
    btn.textContent = '✓';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add';
      btn.classList.remove('added');
    }, 1400);
  }

  deps.showCartToast();
  deps.closeDrawerDirect();
}

describe('addToCart', () => {
  const mockDeps = {
    updateCartCount: vi.fn(),
    showCartToast: vi.fn(),
    closeDrawerDirect: vi.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.clearAllMocks();
    WHISKIES_MOCK = [
      { id: 1, name: 'Yamazaki 12', priceSub: '£85 · Free UK delivery' },
      { id: 2, name: 'Hakushu 18', priceSub: '£120 · Free UK delivery' },
    ];
    document.body.innerHTML = `
      <button id="btn-1">Add</button>
      <button id="btn-2">Add</button>
    `;
  });
  afterEach(() => vi.useRealTimers());

  it('adds a new item to the cart in localStorage', () => {
    addToCart_impl(1, null, mockDeps);
    const cart = JSON.parse(localStorage.getItem('sakura_cart'));
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual({ id: 1, name: 'Yamazaki 12', price: '£85', qty: 1 });
  });

  it('extracts price as the part before "·" in priceSub', () => {
    addToCart_impl(1, null, mockDeps);
    const cart = JSON.parse(localStorage.getItem('sakura_cart'));
    expect(cart[0].price).toBe('£85');
  });

  it('increments qty when item already exists in cart', () => {
    localStorage.setItem('sakura_cart', JSON.stringify([{ id: 1, name: 'Yamazaki 12', price: '£85', qty: 1 }]));
    addToCart_impl(1, null, mockDeps);
    const cart = JSON.parse(localStorage.getItem('sakura_cart'));
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(2);
  });

  it('does not duplicate items — increments instead', () => {
    addToCart_impl(1, null, mockDeps);
    addToCart_impl(1, null, mockDeps);
    const cart = JSON.parse(localStorage.getItem('sakura_cart'));
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(2);
  });

  it('adds different items as separate entries', () => {
    addToCart_impl(1, null, mockDeps);
    addToCart_impl(2, null, mockDeps);
    const cart = JSON.parse(localStorage.getItem('sakura_cart'));
    expect(cart).toHaveLength(2);
  });

  it('calls stopPropagation when an event is passed', () => {
    const e = { stopPropagation: vi.fn() };
    addToCart_impl(1, e, mockDeps);
    expect(e.stopPropagation).toHaveBeenCalledOnce();
  });

  it('changes button text to ✓ and adds "added" class immediately', () => {
    addToCart_impl(1, null, mockDeps);
    const btn = document.getElementById('btn-1');
    expect(btn.textContent).toBe('✓');
    expect(btn.classList.contains('added')).toBe(true);
  });

  it('resets button text back to "Add" after 1400 ms', () => {
    addToCart_impl(1, null, mockDeps);
    vi.advanceTimersByTime(1400);
    const btn = document.getElementById('btn-1');
    expect(btn.textContent).toBe('Add');
    expect(btn.classList.contains('added')).toBe(false);
  });

  it('button text is still ✓ at 1399 ms', () => {
    addToCart_impl(1, null, mockDeps);
    vi.advanceTimersByTime(1399);
    expect(document.getElementById('btn-1').textContent).toBe('✓');
  });

  it('calls updateCartCount, showCartToast, closeDrawerDirect', () => {
    addToCart_impl(1, null, mockDeps);
    expect(mockDeps.updateCartCount).toHaveBeenCalledOnce();
    expect(mockDeps.showCartToast).toHaveBeenCalledOnce();
    expect(mockDeps.closeDrawerDirect).toHaveBeenCalledOnce();
  });
});

// ─── filterReviews (reviews.html) ────────────────────────────────
let activeDistillery = 'all';
const renderReviewsSpy = vi.fn();

function filterReviews(val) {
  activeDistillery = val;
  document.querySelectorAll('#distilleryFilters .sidebar-filter-item').forEach(el => {
    el.classList.toggle('active', el.dataset.filter === val);
  });
  renderReviewsSpy();
}

describe('filterReviews', () => {
  beforeEach(() => {
    activeDistillery = 'all';
    renderReviewsSpy.mockClear();
    document.body.innerHTML = `
      <div id="distilleryFilters">
        <div class="sidebar-filter-item active" data-filter="all">All</div>
        <div class="sidebar-filter-item" data-filter="Yamazaki">Yamazaki</div>
        <div class="sidebar-filter-item" data-filter="Hakushu">Hakushu</div>
      </div>
    `;
  });

  it('updates activeDistillery to the selected value', () => {
    filterReviews('Yamazaki');
    expect(activeDistillery).toBe('Yamazaki');
  });

  it('activates the matching filter item', () => {
    filterReviews('Yamazaki');
    const items = document.querySelectorAll('.sidebar-filter-item');
    expect(items[0].classList.contains('active')).toBe(false); // all
    expect(items[1].classList.contains('active')).toBe(true);  // Yamazaki
    expect(items[2].classList.contains('active')).toBe(false); // Hakushu
  });

  it('deactivates all when switching back to "all"', () => {
    filterReviews('Yamazaki');
    filterReviews('all');
    const items = document.querySelectorAll('.sidebar-filter-item');
    expect(items[0].classList.contains('active')).toBe(true);
    expect(items[1].classList.contains('active')).toBe(false);
  });

  it('calls renderReviews', () => {
    filterReviews('Hakushu');
    expect(renderReviewsSpy).toHaveBeenCalledOnce();
  });
});

// ─── filterByScore (reviews.html) ────────────────────────────────
let activeMinScore = 0;
const renderReviewsSpy2 = vi.fn();

function filterByScore(min, el) {
  activeMinScore = min;
  document.querySelectorAll('#scoreFilters .star-filter-row').forEach(r => r.classList.remove('active'));
  el.classList.add('active');
  renderReviewsSpy2();
}

describe('filterByScore', () => {
  beforeEach(() => {
    activeMinScore = 0;
    renderReviewsSpy2.mockClear();
    document.body.innerHTML = `
      <div id="scoreFilters">
        <div class="star-filter-row active" id="s0">Any</div>
        <div class="star-filter-row" id="s85">85+</div>
        <div class="star-filter-row" id="s90">90+</div>
        <div class="star-filter-row" id="s95">95+</div>
      </div>
    `;
  });

  it('updates activeMinScore', () => {
    filterByScore(90, document.getElementById('s90'));
    expect(activeMinScore).toBe(90);
  });

  it('removes active from all rows, adds to clicked row', () => {
    filterByScore(90, document.getElementById('s90'));
    expect(document.getElementById('s0').classList.contains('active')).toBe(false);
    expect(document.getElementById('s85').classList.contains('active')).toBe(false);
    expect(document.getElementById('s90').classList.contains('active')).toBe(true);
    expect(document.getElementById('s95').classList.contains('active')).toBe(false);
  });

  it('exactly one row is active after the call', () => {
    filterByScore(85, document.getElementById('s85'));
    expect(document.querySelectorAll('.star-filter-row.active')).toHaveLength(1);
  });

  it('calls renderReviews', () => {
    filterByScore(95, document.getElementById('s95'));
    expect(renderReviewsSpy2).toHaveBeenCalledOnce();
  });

  it('setting min to 0 resets the score filter', () => {
    filterByScore(90, document.getElementById('s90'));
    filterByScore(0, document.getElementById('s0'));
    expect(activeMinScore).toBe(0);
    expect(document.getElementById('s0').classList.contains('active')).toBe(true);
  });
});

// ─── setFilter (shop.html) ───────────────────────────────────────
let currentFilter = 'all';
const filterAndSortSpy = vi.fn();

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  filterAndSortSpy();
}

describe('setFilter', () => {
  beforeEach(() => {
    currentFilter = 'all';
    filterAndSortSpy.mockClear();
    document.body.innerHTML = `
      <button class="filter-chip active" data-filter="all" id="c-all">All</button>
      <button class="filter-chip" data-filter="yamazaki" id="c-yam">Yamazaki</button>
      <button class="filter-chip" data-filter="hakushu" id="c-hak">Hakushu</button>
    `;
  });

  it('updates currentFilter', () => {
    setFilter('yamazaki', document.getElementById('c-yam'));
    expect(currentFilter).toBe('yamazaki');
  });

  it('removes active from all chips and adds it to the clicked chip', () => {
    setFilter('yamazaki', document.getElementById('c-yam'));
    expect(document.getElementById('c-all').classList.contains('active')).toBe(false);
    expect(document.getElementById('c-yam').classList.contains('active')).toBe(true);
    expect(document.getElementById('c-hak').classList.contains('active')).toBe(false);
  });

  it('exactly one chip is active', () => {
    setFilter('hakushu', document.getElementById('c-hak'));
    expect(document.querySelectorAll('.filter-chip.active')).toHaveLength(1);
  });

  it('calls filterAndSort', () => {
    setFilter('yamazaki', document.getElementById('c-yam'));
    expect(filterAndSortSpy).toHaveBeenCalledOnce();
  });
});
