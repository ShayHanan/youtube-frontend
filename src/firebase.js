import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPUhIF9HIy-9vqIKV7rwaW3PcgBqJtxZ8",
  authDomain: "clone-9f678.firebaseapp.com",
  projectId: "clone-9f678",
  storageBucket: "clone-9f678.appspot.com",
  messagingSenderId: "251540291682",
  appId: "1:251540291682:web:b9083461a5e2b0288a113b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;