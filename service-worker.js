const CACHE_NAME = "Firstpwa-V1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  // Assets
  "/assets/background-image.jpg",
  "/assets/logo.png",
  "/assets/che-mc.jpg",
  "/assets/delle-ali.jpg",
  "/assets/news-mu.jpg",
  "/assets/pekan17.jpg",
  "/assets/pierre.jpg",
  "/assets/icon.png",
  // Pages
  "/pages/clubs.html",
  "/pages/managers.html",
  "/pages/news.html",
  "/pages/tables.html",
  // CSS
  "/css/style.css",
  "/css/materialize.min.css",
  // JS
  "/js/materialize.min.js",
  "/js/nav.js",
  // Icons
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  // Font
  "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  // Club Logo
  "https://upload.wikimedia.org/wikipedia/id/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
  "https://upload.wikimedia.org/wikipedia/id/0/0c/Crystal_Palace_FC_logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
  "https://upload.wikimedia.org/wikipedia/id/e/eb/Manchester_City_FC_badge.svg",
  "https://upload.wikimedia.org/wikipedia/id/c/cc/Chelsea_FC.svg",
  "https://upload.wikimedia.org/wikipedia/id/7/7c/Everton_FC_logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/f/f9/Aston_Villa_FC_crest_%282016%29.svg",
  "https://upload.wikimedia.org/wikipedia/id/c/c9/FC_Southampton.svg",
  "https://upload.wikimedia.org/wikipedia/id/6/6d/Burnley_FC_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/f/fd/Brighton_%26_Hove_Albion_logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/b/b4/Tottenham_Hotspur.svg",
  "https://upload.wikimedia.org/wikipedia/id/c/c2/West_Ham_United_FC_logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/5/54/Leeds_United_F.C._logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/f/fc/Wolverhampton_Wanderers.svg",
  "https://upload.wikimedia.org/wikipedia/id/5/56/Newcastle_United_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/1/13/Fulham_FC.svg",
  "https://upload.wikimedia.org/wikipedia/id/8/8b/West_Bromwich_Albion.svg",
  "https://upload.wikimedia.org/wikipedia/id/9/9c/Sheffield_United_FC_logo.svg",
  "https://upload.wikimedia.org/wikipedia/id/0/0c/Liverpool_FC.svg",
  "https://upload.wikimedia.org/wikipedia/id/6/6c/Leicester_FC_Logo.svg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
        console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
