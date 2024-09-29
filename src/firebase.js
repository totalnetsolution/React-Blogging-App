// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuOc1JDWnEZADVU8Meem2MdJFHnGEECQk",
  authDomain: "react-blogging-app-66d66.firebaseapp.com",
  projectId: "react-blogging-app-66d66",
  storageBucket: "react-blogging-app-66d66.appspot.com",
  messagingSenderId: "255510546976",
  appId: "1:255510546976:web:c37f2049b46af7815bca45",
  measurementId: "G-LTQ29390SG"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
