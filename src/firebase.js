// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCylT9TcRVeP6UzjIEao8DCU9u7ezPwbNo",
  authDomain: "financely-9ab36.firebaseapp.com",
  projectId: "financely-9ab36",
  storageBucket: "financely-9ab36.appspot.com",
  messagingSenderId: "694978569544",
  appId: "1:694978569544:web:7f0ee6fdfc5847e4c0ff7d",
  measurementId: "G-ZXKQ48VDKJ"
};

// Initialize Firebase
import{getAuth,GoogleAuthProvider} from "firebase/auth";
import{getFirestore,doc,setDoc} from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export{db,auth,provider,analytics,doc,setDoc};