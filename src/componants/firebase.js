
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVOE8LuA2Ey9aySJiuKg9g3YTr632pQs0",
  authDomain: "food-blog-acab8.firebaseapp.com",
  projectId: "food-blog-acab8",
  storageBucket: "food-blog-acab8.appspot.com",
  messagingSenderId: "808049090754",
  appId: "1:808049090754:web:792cb93e065a97a228db5b",
  measurementId: "G-D8DPGGMVCZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;