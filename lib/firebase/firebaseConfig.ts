import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// copy your app config from the firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5KbL7WiaL2eeH4DTFz2hKQ7_VPMMvWNE",
  authDomain: "staybook-6fe7c.firebaseapp.com",
  projectId: "staybook-6fe7c",
  storageBucket: "staybook-6fe7c.appspot.com",
  messagingSenderId: "869937623693",
  appId: "1:869937623693:web:bb38ef69cf264aa78228c4",
  measurementId: "G-LRVG9S3NJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
