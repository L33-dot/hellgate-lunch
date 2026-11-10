// Replaces the old address's service worker: clears its offline copy and steps aside,
// so phones that opened the old address reach the redirect (and the new address).
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (clients) {
        clients.forEach(function (c) { c.navigate("https://hellgatelunch.github.io/"); });
      })
  );
});
