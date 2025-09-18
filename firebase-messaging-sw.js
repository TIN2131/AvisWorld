// Firebase Service Worker for Push Notifications
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyCOyRtkQfHK593CfOwQe33on5mUEPYduEc",
  authDomain: "avi-tracker.firebaseapp.com",
  projectId: "avi-tracker",
  storageBucket: "avi-tracker.firebasestorage.app",
  messagingSenderId: "783062575404",
  appId: "1:783062575404:web:2ce2e7812bec4b2d4ee489"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        vibrate: [200, 100, 200],
        tag: payload.data.type || 'general',
        data: payload.data
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Open the app when notification is clicked
    event.waitUntil(
        clients.openWindow('/')
    );
});

// Cache for offline use
const CACHE_NAME = 'avi-tracker-v1';
const urlsToCache = [
    '/',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
