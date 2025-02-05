import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const APIKEY = import.meta.env.VITE_APIKEY;
const AUTHDOMAIN = import.meta.env.VITE_AUTHDOMAIN;
const PROJECTID = import.meta.env.VITE_PROJECTID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
