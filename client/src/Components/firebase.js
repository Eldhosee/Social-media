import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBD5RgX5UU9VGqbD_YrAlNPARUz_HINfUE",
    authDomain: "social-d242e.firebaseapp.com",
    projectId: "social-d242e",
    storageBucket: "social-d242e.appspot.com",
    messagingSenderId: "35642570361",
    appId: "1:35642570361:web:342448d598517b21e6c6a8"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);