import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// *Your web app's Firebase configuration*
const firebaseConfig = {
  apiKey: "AIzaSyDdFZ_d89wityxJL_EBMa5H2tw9vdCw0bo",
  authDomain: "e-commerce-project-41b32.firebaseapp.com",
  projectId: "e-commerce-project-41b32",
  storageBucket: "e-commerce-project-41b32.appspot.com",
  messagingSenderId: "6962663571",
  appId: "1:6962663571:web:3c083a7c67844dc3b83d66",
};

// *Initialize Firebase*
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("some error..", error.message);
    }
  }

  // if user data exists
  // return UserDocRef
  return userDocRef;
};
