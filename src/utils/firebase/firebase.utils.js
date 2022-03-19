import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDtzOwJl7yemWkvPCX3dLn5rvWJqUvBK_M",
    authDomain: "bilamba-talo-db.firebaseapp.com",
    projectId: "bilamba-talo-db",
    storageBucket: "bilamba-talo-db.appspot.com",
    messagingSenderId: "368412630428",
    appId: "1:368412630428:web:1276656ff5746e7a52bc59"
  };
  
 
  const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);


const userSnapshot = await getDoc(userDocRef);


if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createAt,
        });
    } catch (error) {
        console.log('error creating the user', error.message);
    }
}

return userDocRef;

};