// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAGumzYewQPjh3BT741r_h3PBcOeSrvVwU',
	authDomain: 'habit-8ec62.firebaseapp.com',
	projectId: 'habit-8ec62',
	storageBucket: 'habit-8ec62.appspot.com',
	messagingSenderId: '325489200005',
	appId: '1:325489200005:web:9b52372f9c557b787d52ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
