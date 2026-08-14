const CACHE = 'gentle-fuel-v21';
const FILES = [
  './index.html',
  './manifest.webmanifest',
  './gentle-fuel-icon.svg',
  './pet3d.js',
  './pets/bunny-stages.png',
  './pets/bunny-stages-v2.png',
  './pets/kitty-stages.png',
  './pets/mochi-stages.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('gentle-fuel-') && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const request = event.request;
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok && new URL(request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
