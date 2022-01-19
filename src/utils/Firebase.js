import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_apiKey,
    authDomain: process.env.REACT_APP_FIRESTORE_authDomain,
    databaseURL: process.env.REACT_APP_FIRESTORE_databaseURL,
    projectId: process.env.REACT_APP_FIRESTORE_projectId,
    storageBucket: process.env.REACT_APP_FIRESTORE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIRESTORE_messagingSenderId,
    appId: process.env.REACT_APP_FIRESTORE_appId
};

const App = firebase.initializeApp(firebaseConfig);
const db = App.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({  prompt: 'select_account' });

export { db, auth, provider };