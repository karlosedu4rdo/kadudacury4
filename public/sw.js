// Service Worker for PWA functionality and caching

const CACHE_NAME = 'kakodacury-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/imoveis',
  '/sobre-nos',
  '/contato',
  '/indicacao',
  '/manifest.json',
  '/icon.svg',
  '/apple-icon.svg',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        
        return fetch(request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }
            
            // Clone the response
            const responseToCache = response.clone()
            
            // Cache based on content type
            if (isStaticAsset(request.url)) {
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })
            } else {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })
            }
            
            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline.html')
            }
          })
      })
  )
})

// Helper function to determine if asset is static
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.woff', '.woff2']
  return staticExtensions.some(ext => url.includes(ext))
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm())
  }
})

// Sync contact form submissions
async function syncContactForm() {
  try {
    const formData = await getStoredFormData()
    if (formData) {
      await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      await clearStoredFormData()
    }
  } catch (error) {
    console.error('Failed to sync contact form:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver imóveis',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-192x192.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Kakodacury', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/imoveis')
    )
  }
})

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.addAll(event.data.urls)
        })
    )
  }
})

// Utility functions for form data storage
async function getStoredFormData() {
  const cache = await caches.open(DYNAMIC_CACHE)
  const response = await cache.match('/form-data')
  return response ? await response.json() : null
}

async function clearStoredFormData() {
  const cache = await caches.open(DYNAMIC_CACHE)
  await cache.delete('/form-data')
}
