import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCvaqlASs_1wp2K5tpvlsd6_AlD25Gzz-E",
  authDomain: "build-part.firebaseapp.com",
  projectId: "build-part",
  storageBucket: "build-part.appspot.com",
  messagingSenderId: "236716886322",
  appId: "1:236716886322:web:da49d6cbd1a7154d1aef2b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app)

export {db,app}
