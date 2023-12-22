// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOIH9i43u6w_FxZCJ-5zV292pA1py69Rc",
  authDomain: "finaco-a93b4.firebaseapp.com",
  projectId: "finaco-a93b4",
  storageBucket: "finaco-a93b4.appspot.com",
  messagingSenderId: "474200864893",
  appId: "1:474200864893:web:4221a314d1e49e24a91914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;