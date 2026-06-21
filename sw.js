self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('countdown-v1').then((cache) => {
      return cache.addAll(['./index.html', './manifest.json', './icon.png']);
    })
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
self.addEventListener('push', function(event) {
  let data = { title: '会える日まであと少し！', body: '二人が会える日が近づいています❤️' };
  if (event.data) { try { data = event.data.json(); } catch (e) { data.body = event.data.text(); } }
  const options = { body: data.body, icon: 'icon.png', badge: 'icon.png', vibrate: [100, 50, 100] };
  event.waitUntil(self.registration.showNotification(data.title, options));
});