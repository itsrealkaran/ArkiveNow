export async function fetchTweets(params = {}) {
  const url = new URL('/api/tweets', window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v as string));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch tweets');
  return res.json();
}

export async function fetchUser(username: string) {
  const url = new URL(`/api/users/${encodeURIComponent(username)}`, window.location.origin);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function fetchUserTweets(username: string, params = {}) {
  const url = new URL(`/api/users/${encodeURIComponent(username)}/tweets`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v as string));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch user tweets');
  return res.json();
}

export async function fetchArkivers(params = {}) {
  const url = new URL('/api/arkivers', window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v as string));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch arkivers');
  return res.json();
}

export async function verifyImageUrl(urlToVerify: string) {
  const url = new URL('/api/tweets/verifyimageurl', window.location.origin);
  url.searchParams.set('url', urlToVerify);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to verify image URL');
  return res.json();
}

export async function searchTweets(q: string, params = {}) {
  const url = new URL('/api/tweets/search', window.location.origin);
  url.searchParams.set('q', q);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v as string));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to search tweets');
  return res.json();
} 