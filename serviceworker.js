/** 
 * Created with help from https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
 *  and Wittr example.
 */

console.log('Service Worker: Registered');

self.addEventListener('install', function(event) {
  console.log('We are here');
  const cacheFiles = [
      '/',
      '/index.html',
      '/restaurant.html',
      '/css/styles.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/serviceworker.js',
      '/data/restaurants.json',
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
      '/img/9.jpg',
      '/img/10.jpg'
  ];

  event.waitUntil(
    caches.open('mws-restaurant-static-v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('inside fetch');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request, ' in cache');
          return response;
      }
      else {
        console.log('Could not find ', event.request, ' in cache, FETCHING!');
        return fetch(event.request)
        .then(function(response) {
            const clonedResponse = response.clone();
            caches.open('mws-restaurant-static-v1').then(function(cache) {
                cache.put(event.request, clonedResponse);
            })
            return response;
        })
      }
    })
  );
});

