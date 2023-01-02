import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmN_jWLZSXFxLk7cYSR26yjR_Rplr6V9c",
  authDomain: "equation-hub.firebaseapp.com",
  projectId: "equation-hub",
  storageBucket: "equation-hub.appspot.com",
  messagingSenderId: "563801178935",
  appId: "1:563801178935:web:0c5632b7ce1fdda7d050b2",
  measurementId: "G-FDPJ0V1B8J",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
