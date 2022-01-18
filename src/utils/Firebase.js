import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4V0SiSRbwvMVjnZLnQuS6PX1mPHFmRIU",
    authDomain: "kure-dev-191711.firebaseapp.com",
    databaseURL: "https://kure-dev-191711.firebaseio.com",
    projectId: "kure-dev-191711",
    storageBucket: "kure-dev-191711.appspot.com",
    messagingSenderId: "880900664877",
    appId: "1:880900664877:web:e792da0bb55f78ed0152a4"
};

const App = firebase.initializeApp(firebaseConfig);
const db = App.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({  prompt: 'select_account' });

export { db, auth, provider };