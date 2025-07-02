import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD4vS2EXZO3Y2DRTZVfWJK8JZtA9HJTyvE",
  authDomain: "flipkart-clone-ed6ba.firebaseapp.com",
  projectId: "flipkart-clone-ed6ba",
  storageBucket: "flipkart-clone-ed6ba.firebasestorage.app",
  messagingSenderId: "87297113660",
  appId: "1:87297113660:web:f28a2a8981003ee0430d39",
  measurementId: "G-BT0FYJ6EW5"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


