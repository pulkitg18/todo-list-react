import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNOH4ZIhHZbWIKhFCj6j1IDnR1uXBmbe0",
  authDomain: "todoapp-pulkit.firebaseapp.com",
  databaseURL: "https://todoapp-pulkit.firebaseio.com",
  projectId: "todoapp-pulkit",
  storageBucket: "todoapp-pulkit.appspot.com",
  messagingSenderId: "502694633323",
  appId: "1:502694633323:web:705a3c57562adb0c15362e",
  measurementId: "G-T2HLKLLP7S",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const db = firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export default db;
