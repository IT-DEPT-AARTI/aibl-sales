// AIBL SALES service worker: app shell works offline; API calls (POST) always go to the network.
const V = 'aibl-v1', SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
const put = (r, x) => { if (x && x.ok) { const c = x.clone(); caches.open(V).then(h => h.put(r, c)); } return x; };
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  if (u.origin === location.origin)            // own files: network first (updates apply), cache when offline
    e.respondWith(fetch(r).then(x => put(r, x)).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
  else if (/cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u.hostname))   // libraries/fonts: cache first
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(x => put(r, x))));
});
