const CACHE = 'gentle-fuel-v14';
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
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
