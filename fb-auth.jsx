// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX9mRNROKlJwrqK1d60ttEQrz8WuuouDg",
    authDomain: "medifind-55bc7.firebaseapp.com",
    projectId: "medifind-55bc7",
    storageBucket: "medifind-55bc7.appspot.com",
    messagingSenderId: "1059535825843",
    appId: "1:1059535825843:web:937dbf5da4391a1ee639c6"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };