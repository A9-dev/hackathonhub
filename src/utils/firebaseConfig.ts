// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYqDbQKsl6g0Z5Sogf-rsBIQh_P1WFmXM",
    authDomain: "daily-hackathon.firebaseapp.com",
    projectId: "daily-hackathon",
    storageBucket: "daily-hackathon.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "1:160081154544:web:98b97fe5ebdea710424d35",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
