// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNE-9-9BZBuAEqycL1CzKtWOY_KW58f30",
  authDomain: "blog-app-p4.firebaseapp.com",
  projectId: "blog-app-p4",
  storageBucket: "blog-app-p4.appspot.com",
  messagingSenderId: "1087259453801",
  appId: "1:1087259453801:web:5625c5906455e852a6b5f8",
  measurementId: "G-1MCX84R81R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
