import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

export const ensureUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      createdAt: new Date(),
    },
    { merge: true }
  );
};
