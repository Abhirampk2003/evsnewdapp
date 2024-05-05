
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlAFQP-duQe2axIhXrjep-N1oq7bEH-mo",
  authDomain: "dapp-evs-c4ff3.firebaseapp.com",
  projectId: "dapp-evs-c4ff3",
  storageBucket: "dapp-evs-c4ff3.appspot.com",
  messagingSenderId: "327093488903",
  appId: "1:327093488903:web:28101348fc98f35003c9a2",
  measurementId: "G-KFHZNRW9VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);