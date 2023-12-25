import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optiona
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9e5f1KOIkirgqAQdPb8ofZrlxx9lISUU",
  authDomain: "pro-slack-database.firebaseapp.com",
  projectId: "pro-slack-database",
  storageBucket: "pro-slack-database.appspot.com",
  messagingSenderId: "142221963597",
  appId: "1:142221963597:web:afbba6453408c92d240704",
  measurementId: "G-3W3WHFCZCL"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;