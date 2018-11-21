let cacheName = "v4";
 let cacheFiles= [
     "./",
     "./index.html",
     "./restaurant.html",
     "./js/main.js",
     "./js/dbhelper.js",
     "./js/restaurant_info.js",
     "./css/styles.css",
     "./data/restaurants.json",
     "./img/1.jpg",
     "./img/2.jpg",
     "./img/3.jpg",
     "./img/4.jpg",
     "./img/5.jpg",
     "./img/6.jpg",
     "./img/7.jpg",
     "./img/8.jpg",
     "./img/9.jpg",
     "./img/10.jpg"
 ];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {

         return cache.addAll(cacheFiles);

        })
    );
});

self.addEventListener("activate", function (event) {
    console.log("activated");

    event.waitUntil(

           caches.keys()
               .then(function (cacheList) {

                   return Promise.all(
                       cacheList.filter(function (cache) {
                           console.log(`cachename is ${cache}`);
                           if (cache !== cacheName) {
                               return cache;

                           }

                       }).map(function (cache) {
                           console.log("the cache going to be deleetd is");
                           console.log(cache);

                           return caches.delete(cache);
                       })
                   ) ;

               })
            
    );


});

self.addEventListener("fetch", function (event) {
     event.respondWith(
         caches.match(event.request)
            .then((response)=> {
                return response|| fetch(event.request).then((response)=> {
                    let clonedResponse = response.clone();
                    caches.open(cacheName)
                        .then((cache)=> {

                            cache.put(event.request,clonedResponse);

                        })

                        return response;

                })
            })
            .catch (function() {
                return caches.match('./index.html');

            })
     );
     

});