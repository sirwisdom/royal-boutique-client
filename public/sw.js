const STATIC = "STATIC-V1";
const DYNAMIC = "DYNAMIC-V1";
const urls = ["/", "index.html", "offline.html"];

const self = this;

self.addEventListener("install", (event) => {
  console.log("service worker installed successfully");
  event.waitUntil(
    caches
      .open(STATIC)
      .then((cache) => {
        return cache.addAll(urls);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== STATIC && key !== DYNAMIC) {
            caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then((res) => {
            caches
              .open(DYNAMIC)
              .then((cache) => {
                cache.put(event.request.url, res.clone());
                return res;
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => caches.match("offline.html"));
      }
    })
  );
});
