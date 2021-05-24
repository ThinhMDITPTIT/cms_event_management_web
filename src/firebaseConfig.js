import firebase from 'firebase';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyApCZrSdX8Lds9akkE3KlMquIjdKIzHkzY',
  authDomain: 'eventmanagement-34f92.firebaseapp.com',
  databaseURL: 'https://eventmanagement-34f92-default-rtdb.firebaseio.com',
  projectId: 'eventmanagement-34f92',
  storageBucket: 'eventmanagement-34f92.appspot.com',
  messagingSenderId: '885610668406',
  appId: '1:885610668406:web:ff065fba85fec638df9a57',
  measurementId: 'G-YSNQ06L9GV',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebaseAnalytics = firebase.analytics();

export default firebase;
