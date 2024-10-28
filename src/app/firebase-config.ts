
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBHJDoAnNgHZwLCgD5vssJe7AAFAkg54WA",
  authDomain: "recetin-cl.firebaseapp.com",
  projectId: "recetin-cl",
  storageBucket: "recetin-cl.appspot.com",
  messagingSenderId: "1039825676842",
  appId: "1:1039825676842:web:032d47130028ccbb9eb153"
};


const app = initializeApp(firebaseConfig);


export { firebaseConfig, app };
