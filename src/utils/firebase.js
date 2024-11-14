import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

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
const provider = new GoogleAuthProvider();
// FUNCTION TO SIGN IN WITH GOOGLE
const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const ref = doc(db, "users", user.uid);
    setDoc(ref, {
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      displayName: user.displayName,
    });
    navigate("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // const email = error.customData.email;
    console.log(errorMessage);
  }
};

export {
  app,
  auth,
  db,
  storage,
  // AUTH METHODS
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sendPasswordResetEmail,
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
