/**
 * Service Worker pour GoCanada
 * Gestion du cache et mode hors-ligne
 */

const CACHE_NAME = 'gocanada-v1';
const STATIC_CACHE = [
    '/',
    '/index.html',
    '/parcours.html',
    '/checklists.html',
    '/budget.html',
    '/ressources.html',
    '/contact.html',
    '/src/css/variables.css',
    '/src/css/global.css',
    '/src/css/components.css',
    '/src/js/app.js',
];

// Installation du Service Worker
self.addEventListener('install', event => {
    console.log('[SW] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_CACHE);
        })
    );

    // Activer immédiatement
    self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // Prendre le contrôle immédiatement
    self.clients.claim();
});

// Stratégie de cache : Network First avec fallback sur Cache
self.addEventListener('fetch', event => {
    // Ignorer les requêtes non-GET et les requêtes externes
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cloner la réponse pour la mettre en cache
                const responseClone = response.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });

                return response;
            })
            .catch(() => {
                // Si le réseau échoue, essayer le cache
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Page hors-ligne de fallback
                    if (event.request.destination === 'document') {
                        // Si offline.html n'existe pas dans le cache, retourner index.html
                        return caches.match('/offline.html').then(r => r || caches.match('/index.html'));
                    }
                });
            })
    );
});

// Gestion des messages du client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
