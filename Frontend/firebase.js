// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBj9lP6WpH25bddwX2QyJifUq580pz3xH8",
  authDomain: "xenocrm-47ee4.firebaseapp.com",
  projectId: "xenocrm-47ee4",
  storageBucket: "xenocrm-47ee4.appspot.com", // fixed typo (should be .app**spot**.com)
  messagingSenderId: "400258650483",
  appId: "1:400258650483:web:6c2f578fe2718cf883f506",
  measurementId: "G-NNC4ZDF2VR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
