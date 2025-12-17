import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqNO-30ziTPS70nY86MxgLT58RRvz7-yo",
  authDomain: "expense-if-d7d6d.firebaseapp.com",
  projectId: "expense-if-d7d6d",
  storageBucket: "expense-if-d7d6d.firebasestorage.app",
  messagingSenderId: "1033573271334",
  appId: "1:1033573271334:web:b55a9e1c15281b91af63e7",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;
