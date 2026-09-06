// Service Worker для кэширования
const CACHE_NAME = 'rune-site-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/gods.html',
    '/mifolgi.html',
    '/about.html',
    '/rune-horoscope.html',
    '/feedback.html'
];

// Установка
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Активация
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});