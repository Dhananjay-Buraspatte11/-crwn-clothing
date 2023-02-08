import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDw25RGnbJVX4l05Db8-YAjOPae7e34sk",
  authDomain: "crwn-clothing-web-app-c541e.firebaseapp.com",
  projectId: "crwn-clothing-web-app-c541e",
  storageBucket: "crwn-clothing-web-app-c541e.appspot.com",
  messagingSenderId: "174785918267",
  appId: "1:174785918267:web:6de871d1e874d8f3bc331e",
  measurementId: "G-34Z7X1W3S1"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,  googleProvider);
export const signInWithGoogleRedirect=()=> signInWithRedirect(auth,  googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async(email,password)=>{
  if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth,email,password)
}