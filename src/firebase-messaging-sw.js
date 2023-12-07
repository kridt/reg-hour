importScripts(
  "https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBpq30gkFoK3WGR6YLhmIeMFKiCgaeuWTE",
  authDomain: "night-reserve.firebaseapp.com",
  databaseURL:
    "https://night-reserve-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "night-reserve",
  storageBucket: "night-reserve.appspot.com",
  messagingSenderId: "1062451369756",
  appId: "1:1062451369756:web:b93749afefea8b6a82ccd9",
  measurementId: "G-MLSF1JYQHH",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Add event listener for background message handling
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize how you want to handle the notification
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "./logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
