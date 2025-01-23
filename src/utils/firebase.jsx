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
  query,
  where,
  limit,
  orderBy,
  getCountFromServer,
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
    const ref = doc(db, "Users", user.uid);
    if (navigate) {
      navigate("/");
    }

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // const email = error.customData.email;
    console.log(errorMessage);
  }
};
const addUserToDB = (username, user, ref, navigate) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("MEN DATA ADD KR RHA HUN", user);
      const {
        email,
        photoURL,
        uid,
        displayName,
        phoneNumber,
        emailVerified,
        accessToken,
      } = user;

      console.log("YE CHECK KR LYA K DATA PEHEL SE HAI YA NHI");
      await setDoc(ref, {
        email,
        photoURL,
        uid,
        accessToken,
        displayName: username ? username : displayName,
        emailVerified,
        phoneNumber,
        company: null,
        city: null,
        country: null,
        userCart: `cartFor_${uid}`,
        userOrders: [],
      });
      console.log("YE USER PEHEL NHI THA");
      console.log("ADDUSER KA KAAM KHATAM");
      let reply = await getDoc(ref);
      reply = reply.data();
      resolve(reply); // Resolve jab try successfully complete ho
    } catch (error) {
      console.log(error);
      reject(false); // Reject jab error aaye
    }
  });
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
  query,
  where,
  limit,
  orderBy,
  onSnapshot,
  addUserToDB,
  getCountFromServer,
  // STORAGE METHODS
  ref,
  uploadBytes,
  getDownloadURL,
};
