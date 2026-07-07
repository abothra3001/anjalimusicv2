// ============================================================
// Firebase Cloud Messaging — background notification handler
// This file MUST live in the same folder as requests.html and
// be served over HTTPS. It runs even when the tab is closed or
// the phone is locked (once notifications are enabled).
//
// NOTE: Service workers can't read window.* config, so the
// Firebase config is duplicated here. If you ever change your
// Firebase project config in requests.html, update it here too.
// ============================================================
importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyCHVFwE634VObOGsqS5kmUXhh_J5sIzNu0",
  authDomain:        "anjali-requests.firebaseapp.com",
  databaseURL:       "https://anjali-requests-default-rtdb.firebaseio.com",
  projectId:         "anjali-requests",
  storageBucket:     "anjali-requests.firebasestorage.app",
  messagingSenderId: "352245091478",
  appId:             "1:352245091478:web:5d118cb2468b97593b06b7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  self.registration.showNotification(data.title || "New song request", {
    body: data.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: "anjali-request", // collapse multiple into one if several arrive at once
  });
});

// Tapping the notification focuses/opens the dashboard
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("requests.html") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("requests.html#dashboard");
    })
  );
});
