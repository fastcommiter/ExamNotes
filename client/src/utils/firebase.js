import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-a8d6b.firebaseapp.com",
  projectId: "authexamnotes-a8d6b",
  storageBucket: "authexamnotes-a8d6b.firebasestorage.app",
  messagingSenderId: "498887747358",
  appId: "1:498887747358:web:bd97e1279a28cb3cea4b0f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider} 