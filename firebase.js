import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvaqlASs_1wp2K5tpvlsd6_AlD25Gzz-E",
  authDomain: "build-part.firebaseapp.com",
  projectId: "build-part",
  storageBucket: "build-part.appspot.com",
  messagingSenderId: "236716886322",
  appId: "1:236716886322:web:da49d6cbd1a7154d1aef2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
