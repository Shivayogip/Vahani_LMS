import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeIM4KRLpUgUA3HCvxod-W1jxV3RsZ3Xw",
  authDomain: "vahani-lms.firebaseapp.com",
  projectId: "vahani-lms",
  storageBucket: "vahani-lms.firebasestorage.app",
  messagingSenderId: "782346864950",
  appId: "1:782346864950:web:68d2508f1ec5c06d7dcb97",
  measurementId: "G-W2LG8WBTH7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;