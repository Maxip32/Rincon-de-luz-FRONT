import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCO1y3gPAsVbVzUthGGvJkiKZYfbanJqMc",

  authDomain: "rincon-de-luz-9e7df.firebaseapp.com",

  projectId: "rincon-de-luz-9e7df",

  storageBucket: "rincon-de-luz-9e7df.appspot.com",

  messagingSenderId: "135988129728",

  appId: "1:135988129728:web:a1cef050d4fdca5a70a225",

};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app); // Configura Firestore
const storage = getStorage(app); 

export { auth, database, firestore, storage  };







 