// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyANX3z9GR7Ej2fAFX8nsLCCJ9biGneKM5w",
	authDomain: "video-app-395e7.firebaseapp.com",
	databaseURL: "https://video-app-395e7-default-rtdb.firebaseio.com",
	projectId: "video-app-395e7",
	storageBucket: "video-app-395e7.appspot.com",
	messagingSenderId: "858578164655",
	appId: "1:858578164655:web:968d33f64db179e13e6d5a",
	measurementId: "G-RVWNF8MCBC",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
