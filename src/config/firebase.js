import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDirmxFnXxe65R-TotylsAv9PEQZvSBvis",
  authDomain: "kemsi-airlines.firebaseapp.com",
  projectId: "kemsi-airlines",
  storageBucket: "kemsi-airlines.appspot.com",
  messagingSenderId: "319990061300",
  appId: "1:319990061300:web:d446de42a53795347d66a1",
  measurementId: "G-MY0M46SMQB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);