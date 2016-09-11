var cacheName = 'weatherPWA-v5';
var dataCacheName = 'weatherData-v5';
var filesToCache = [
  '/',
  '/assets/application.css',
  '/assets/application.js',
  '/assets/clear.png',
  '/assets/cloudy-scattered-showers.png',
  '/assets/cloudy.png',
  '/assets/fog.png',
  '/assets/ic_add_white_24px.svg',
  '/assets/ic_refresh_white_24px.svg',
  '/assets/partly-cloudy.png',
  '/assets/rain.png',
  '/assets/scattered-showers.png',
  '/assets/sleet.png',
  '/assets/snow.png',
  '/assets/thunderstorm.png',
  '/assets/wind.png'
];
var weatherAPIUrlBase = 'https://publicdata-weather.firebaseio.com/';

self.addEventListener('install', function(e) {
    console.log("[ServiceWorker] Installed");

    e.waitUntil(
      caches.open(cacheName)
        .then(function(cache) {
          console.log("[ServiceWorker] Caching filesToCache");
          return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName){

          if (thisCacheName !== cacheName) {

            console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
            return caches.delete(thisCacheName);
          }

        }))
      })
    )
})

self.addEventListener('fetch', function(e){
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(
      caches.match(e.request).then(function(response){
        if ( response ) {
          console.log("[ServiceWorker] Found in cache", e.request.url);
          return response;
        }

        return fetch(e.request);
      })
    )
})
