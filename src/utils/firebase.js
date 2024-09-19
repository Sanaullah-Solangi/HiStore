import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBILntw32izD6Jh-gO9DuL_bVSPWRshEYg",
  authDomain: "histore-296d9.firebaseapp.com",
  projectId: "histore-296d9",
  storageBucket: "histore-296d9.appspot.com",
  messagingSenderId: "456635063936",
  appId: "1:456635063936:web:d449bf6b6484869e721065",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export default app;
export {
  app,
  auth,
  db,
  storage,
  // AUTH METHODS
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // DATA BASE METHODS
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  // STORAGE METHODS
  ref,
  uploadBytes,
  getDownloadURL,
};
