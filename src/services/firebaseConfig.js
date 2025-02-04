import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjtRV9mI-AEXjhkf8D5XQrIobzXf0oRTM",
  authDomain: "blogapp-a7e55.firebaseapp.com",
  projectId: "blogapp-a7e55"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
