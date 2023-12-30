
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';
const getReactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} else {
    app = getApp();
}

const auth = getAuth(app);

export { auth };

/*
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

*/