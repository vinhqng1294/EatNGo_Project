import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAi_Bo_JGPLsEsPuSrhcoGzl854orNO9gw",
  authDomain: "eatngo-a7c8f.firebaseapp.com",
  databaseURL: "https://eatngo-a7c8f.firebaseio.com",
  projectId: "eatngo-a7c8f",
  storageBucket: "eatngo-a7c8f.appspot.com",
  messagingSenderId: "449555065359"
};

export const firebaseApp = firebase.initializeApp(config);