import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

//this is a comment trying for change.