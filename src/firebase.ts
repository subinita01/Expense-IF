import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_r49Y2EspMhId9ecOkc8B_8bousTfhwY",
  authDomain: "expense-if-9f3da.firebaseapp.com",
  projectId: "expense-if-9f3da",
  storageBucket: "expense-if-9f3da.firebasestorage.app",
  messagingSenderId: "451839787347",
  appId: "1:451839787347:web:6cbd80c245f698b814a1a6",
  measurementId: "G-JJF526Z84H",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const analytics: Analytics = getAnalytics(app);

export default app;
