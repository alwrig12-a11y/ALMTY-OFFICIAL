// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT6dvq5xRZR2wFNAJymx5Pxk9DAhsAGHo",
  authDomain: "almty-b34e9.firebaseapp.com",
  projectId: "almty-b34e9",
  storageBucket: "almty-b34e9.firebasestorage.app",
  messagingSenderId: "368119145618",
  appId: "1:368119145618:web:94f9ffd2e6fdad4ab5324b",
  measurementId: "G-PMX5RPN65Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
