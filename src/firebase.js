import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC0EecOxJwpeGIqhUmlYyXm00824DnvPLE",
    authDomain: "slack-clone-70168.firebaseapp.com",
    projectId: "slack-clone-70168",
    storageBucket: "slack-clone-70168.appspot.com",
    messagingSenderId: "456698271889",
    appId: "1:456698271889:web:b482d9e6eb3382a0680730",
    measurementId: "G-63WY25ZV1M"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;