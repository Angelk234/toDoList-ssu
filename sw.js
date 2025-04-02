const CACHE_TODO = "mi-pwa-cache-v1";
const ASSETS = [
  "./css",
  "./html",
  "./ico",
  "./js",
  "./node_modules",
  "./index.html",
  "./manifest.json",
  "./package-lock.json",
  "./package.json"
];

// Instalación: guardar recursos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_TODO).then((cache) => {
      console.log("Cache abierto");
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: servir desde caché si está disponible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Actualización: eliminar cachés antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_TODO) {
            console.log("Eliminando caché antiguo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});