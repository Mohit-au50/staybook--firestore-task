import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyByd5XTphAsmjzd-IcNqOEVOmiXMxbE7F4",
  authDomain: "staybook-task.firebaseapp.com",
  projectId: "staybook-task",
  storageBucket: "staybook-task.appspot.com",
  messagingSenderId: "369102355256",
  appId: "1:369102355256:web:a7699243e00f198f715fcd",
  measurementId: "G-53VVLV1ER3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };