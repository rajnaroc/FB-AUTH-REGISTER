import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAP-eMLULunH8ZFvMo_8p-bEZiZwonNZIA",
  authDomain: "fir-s-primera.firebaseapp.com",
  projectId: "fir-s-primera",
  storageBucket: "fir-s-primera.firebasestorage.app",
  messagingSenderId: "386788510219",
  appId: "1:386788510219:web:6fb22aa12f7609df78550e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app) 
export { auth }