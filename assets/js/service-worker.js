

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            console.log('Opened cache');
            return cache.addAll([
                '/',
                '/index.html',
                '/assets/css/style.css',
                '/assets/js/map.js',
                '/assets/js/vities.js',
                '/assets/js/script.js'
            ]);
        })
    );
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // Clone the request to avoid consuming it
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response to avoid consuming it
                    var responseToCache = response.clone();

                    caches.open('my-cache').then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});




 
// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker has been activated');
})
