import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpq30gkFoK3WGR6YLhmIeMFKiCgaeuWTE",
  authDomain: "night-reserve.firebaseapp.com",
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
