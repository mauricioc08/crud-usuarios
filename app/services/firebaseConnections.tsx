import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZVcLJl4FBv4Epu4rIA_TVwE5B8uZoA6k",
    authDomain: "sistema-crud-de-usuarios.firebaseapp.com",
    projectId: "sistema-crud-de-usuarios",
    storageBucket: "sistema-crud-de-usuarios.firebasestorage.app",
    messagingSenderId: "919870629824",
    appId: "1:919870629824:web:641a0184bc9a63ed7f0a25"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };