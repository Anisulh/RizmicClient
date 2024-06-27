import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { openDB } from "idb";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// cleanup old caches
cleanupOutdatedCaches();

const manifest = self.__WB_MANIFEST || [];
precacheAndRoute(manifest);

// Cache first for static assets
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

// stale while revalidate for api requests
registerRoute(
  ({ url }) => url.pathname.startsWith("/api"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }),
);

// offline page to show when users request new page that is not cached
const offlinePage = "/offline.html";

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => cache.add(offlinePage)),
  );
});

// Function to open IndexedDB
const openIndexedDB = async () => {
  return openDB("RizmicFits", 1, {
    upgrade(db) {
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains("auth")) db.createObjectStore("auth");
      if (!db.objectStoreNames.contains("user")) db.createObjectStore("user");
      if (!db.objectStoreNames.contains("friends"))
        db.createObjectStore("friends");
      if (!db.objectStoreNames.contains("clothes"))
        db.createObjectStore("clothes");
      if (!db.objectStoreNames.contains("outfits"))
        db.createObjectStore("outfits");
    },
  });
};

self.addEventListener("fetch", (event: FetchEvent) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const db = await openIndexedDB();
        // If fetch fails (offline), try to get data from IndexedDB
        const store = event.request.url.includes("validate")
          ? "auth"
          : event.request.url.includes("user")
            ? "user"
            : event.request.url.includes("clothes")
              ? "clothes"
              : event.request.url.includes("outfits")
                ? "outfits"
                : null;

        if (store) {
          const data = await db.get(store, "items");
          if (data) {
            return new Response(JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        // If no data in IndexedDB, return a custom offline response
        return new Response(
          JSON.stringify({
            error: "You are offline and no cached data is available",
          }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          },
        );
      }),
    );
  }
});
