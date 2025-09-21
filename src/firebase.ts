import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUmimvDnv6KeoS02uwEf6IuMF6FEWQHxU",
  authDomain: "farming-86716.firebaseapp.com",
  projectId: "farming-86716",
  storageBucket: "farming-86716.appspot.com",  // ✅ fix typo: should be "appspot.com"
  messagingSenderId: "336580063861",
  appId: "1:336580063861:web:442bbc19f553383df2fe3c",
  measurementId: "G-XM951VZHV0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);   // ✅ Firestore instance
export const analytics = getAnalytics(app);
