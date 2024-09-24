// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyAveTn_hNs-s5nQyHz6XHUOKryhW86SSLk",

  authDomain: "suparchat-d31cc.firebaseapp.com",

  projectId: "suparchat-d31cc",

  storageBucket: "suparchat-d31cc.appspot.com",

  messagingSenderId: "767843297226",

  appId: "1:767843297226:web:713ab26ed7b925222a9133",

  measurementId: "G-NQDVVMJB1Y"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db, signInWithPopup, signOut };
