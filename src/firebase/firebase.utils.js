import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDxB2_fLN-3SIRv7Q_HErBtw2YUcbnRHPk',
  authDomain: 'clothing-db-d03bc.firebaseapp.com',
  databaseURL: 'https://clothing-db-d03bc.firebaseio.com',
  projectId: 'clothing-db-d03bc',
  storageBucket: 'clothing-db-d03bc.appspot.com',
  messagingSenderId: '417459789036',
  appId: '1:417459789036:web:c06f1ec43cce4d10b699c9',
  measurementId: 'G-GKFCRLFWVM',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
