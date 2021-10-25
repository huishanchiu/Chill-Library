import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxf5hedqQ7VEb6geCZAbZ2sRfEm00-IbM",
  authDomain: "chill-library.firebaseapp.com",
  projectId: "chill-library",
  storageBucket: "chill-library.appspot.com",
  messagingSenderId: "207408765805",
  appId: "1:207408765805:web:1fb3ade0d3f7bed6e5d864",
  measurementId: "G-84JDQML53S",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
