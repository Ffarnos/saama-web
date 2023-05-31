
// src/sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('saama-cache').then((cache) => {
            return cache.addAll([
                '/src/images/icon.png', // Ruta al icono de la PWA
                '/src/images/portada.webp',
                '/static/images/boton1.webp',
                '/static/images/boton2.webp',
                '/static/images/boton3.webp',
                '/static/images/boton4.webp',
                '/static/images/boton5.webp',
                '/static/images/boton6.webp',
                '/static/images/boton7.webp',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .map((cacheName) => {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

// Agrega esta parte para precargar los recursos necesarios inmediatamente después de la instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('saama-cache').then((cache) => {
            return cache.addAll([
                '/src/images/icon.png', // Ruta al icono de la PWA
                '/src/images/portada.webp',
                '/static/images/boton1.webp',
                '/static/images/boton2.webp',
                '/static/images/boton3.webp',
                '/static/images/boton4.webp',
                '/static/images/boton5.webp',
                '/static/images/boton6.webp',
                '/static/images/boton7.webp',
            ]);
        })
    );
});