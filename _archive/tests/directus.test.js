import { describe, it, expect, vi, beforeEach } from 'vitest';

const DIRECTUS_URL = 'https://api.example.com';
const DIRECTUS_TOKEN = 'test-token';

// ─── directusFetch (directus.js) ─────────────────────────────────
async function directusFetch(path) {
  const res = await fetch(DIRECTUS_URL + path, {
    headers: { Authorization: 'Bearer ' + DIRECTUS_TOKEN },
  });
  if (!res.ok) throw new Error('Directus ' + res.status);
  return (await res.json()).data;
}

// ─── directusPost (directus.js) ──────────────────────────────────
async function directusPost(collection, data) {
  const res = await fetch(DIRECTUS_URL + '/items/' + collection, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + DIRECTUS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error('Directus ' + res.status), { body: json });
  return json.data;
}

function makeFetch(ok, status, jsonBody) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => jsonBody,
  });
}

describe('directusFetch', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('calls fetch with the full URL and Bearer token', async () => {
    const mockFetch = makeFetch(true, 200, { data: [] });
    vi.stubGlobal('fetch', mockFetch);

    await directusFetch('/items/whiskies');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/items/whiskies',
      { headers: { Authorization: 'Bearer test-token' } }
    );
  });

  it('returns the .data property of the JSON response', async () => {
    vi.stubGlobal('fetch', makeFetch(true, 200, { data: [{ id: 1 }, { id: 2 }] }));
    const result = await directusFetch('/items/whiskies');
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('works for a single-object .data response', async () => {
    vi.stubGlobal('fetch', makeFetch(true, 200, { data: { id: 42, name: 'Yamazaki' }, meta: {} }));
    const result = await directusFetch('/items/whiskies/42');
    expect(result).toEqual({ id: 42, name: 'Yamazaki' });
  });

  it('throws "Directus 403" when response status is 403', async () => {
    vi.stubGlobal('fetch', makeFetch(false, 403, {}));
    await expect(directusFetch('/items/private')).rejects.toThrow('Directus 403');
  });

  it('throws "Directus 500" when response status is 500', async () => {
    vi.stubGlobal('fetch', makeFetch(false, 500, {}));
    await expect(directusFetch('/items/whiskies')).rejects.toThrow('Directus 500');
  });

  it('does not throw when response is ok (status 200)', async () => {
    vi.stubGlobal('fetch', makeFetch(true, 200, { data: [] }));
    await expect(directusFetch('/items/whiskies')).resolves.toBeDefined();
  });

  it('appends path to DIRECTUS_URL without extra slash', async () => {
    const mockFetch = makeFetch(true, 200, { data: null });
    vi.stubGlobal('fetch', mockFetch);
    await directusFetch('/items/regions?filter[status][_eq]=published');
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.example.com/items/regions?filter[status][_eq]=published'
    );
  });
});

describe('directusPost', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('calls fetch with POST method and correct URL', async () => {
    const mockFetch = makeFetch(true, 200, { data: { id: 1 } });
    vi.stubGlobal('fetch', mockFetch);
    await directusPost('reviews', { author_name: 'Test' });
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.example.com/items/reviews');
    expect(mockFetch.mock.calls[0][1].method).toBe('POST');
  });

  it('sends Authorization and Content-Type headers', async () => {
    const mockFetch = makeFetch(true, 200, { data: { id: 1 } });
    vi.stubGlobal('fetch', mockFetch);
    await directusPost('reviews', {});
    expect(mockFetch.mock.calls[0][1].headers).toEqual({
      Authorization: 'Bearer test-token',
      'Content-Type': 'application/json',
    });
  });

  it('serialises data as JSON body', async () => {
    const mockFetch = makeFetch(true, 200, { data: { id: 1 } });
    vi.stubGlobal('fetch', mockFetch);
    const payload = { author_name: 'John', score: 92 };
    await directusPost('reviews', payload);
    expect(mockFetch.mock.calls[0][1].body).toBe(JSON.stringify(payload));
  });

  it('returns json.data on success', async () => {
    vi.stubGlobal('fetch', makeFetch(true, 200, { data: { id: 5, author_name: 'John' } }));
    const result = await directusPost('reviews', { author_name: 'John' });
    expect(result).toEqual({ id: 5, author_name: 'John' });
  });

  it('throws "Directus 400" with body attached when not ok', async () => {
    const errorBody = { errors: [{ message: 'Unique constraint violation' }] };
    vi.stubGlobal('fetch', makeFetch(false, 400, errorBody));

    let caught;
    try {
      await directusPost('newsletter_subscribers', { email: 'dup@test.com' });
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
    expect(caught.message).toBe('Directus 400');
    expect(caught.body).toEqual(errorBody);
  });

  it('thrown error is an instance of Error', async () => {
    vi.stubGlobal('fetch', makeFetch(false, 422, {}));
    await expect(directusPost('reviews', {})).rejects.toBeInstanceOf(Error);
  });

  it('uses the collection name in the URL path', async () => {
    const mockFetch = makeFetch(true, 200, { data: {} });
    vi.stubGlobal('fetch', mockFetch);
    await directusPost('newsletter_subscribers', { email: 'a@b.com', status: 'active' });
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.example.com/items/newsletter_subscribers'
    );
  });
});
