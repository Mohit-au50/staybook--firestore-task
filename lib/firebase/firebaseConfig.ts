import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// copy your app config from the firebase
const firebaseConfig = {
  apiKey: "AIzaSyCj50DB9xHfe_GLJEaiLb8DLlq2BZUTFNY",
  authDomain: "staybook-b63ef.firebaseapp.com",
  projectId: "staybook-b63ef",
  storageBucket: "staybook-b63ef.appspot.com",
  messagingSenderId: "358827111073",
  appId: "1:358827111073:web:42c8dbba3ce59ba19cb6e0", 
  measurementId: "G-Y07QV63LX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


