import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// copy your app config from the firebase
const firebaseConfig = {
  apiKey: "AIzaSyDENBTOs8o5ffmDOZ1autkBfjGzxZ0K0wY",
  authDomain: "hotel-assignment-46ff1.firebaseapp.com",
  projectId: "hotel-assignment-46ff1",
  storageBucket: "hotel-assignment-46ff1.appspot.com",
  messagingSenderId: "122605796143",
  appId: "1:122605796143:web:767af4ba920dacbb827fda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
