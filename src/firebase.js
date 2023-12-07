import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getMessaging, getToken } from "firebase/messaging";

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

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore(app);
export const auth = firebase.auth(app);
export const messaging = getMessaging(app);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (err) {
      console.error("Service Worker registration failed:", err);
    });
}

getToken(messaging, {
  vapidKey:
    "BA2NoU2MRM3c0z2k74IYcgB8rdn6HdzTui4M7fvku_ZmA9zIE7GOMiJ0pqwb6I4811x3siim-LaX8aAVok04IX4",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
