import firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyD5PRN78gRWrO_ZPEjusyCbu0EPYCYRg58",
    authDomain: "meeting-app-a1947.firebaseapp.com",
    databaseURL: "https://meeting-app-a1947.firebaseio.com",
    projectId: "meeting-app-a1947",
    storageBucket: "meeting-app-a1947.appspot.com",
    messagingSenderId: "310704561880"
  };
  firebase.initializeApp(config);


  export default firebase