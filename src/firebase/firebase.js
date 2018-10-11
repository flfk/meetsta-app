import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'online-meet-and-greets.firebaseapp.com',
  databaseURL: 'https://online-meet-and-greets.firebaseio.com',
  projectId: 'online-meet-and-greets',
  storageBucket: 'online-meet-and-greets.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export default firebase;

// const db = firebase.firestore();

// export const storage = firebase.storage();

// To ensure ensure firestore timestamp objects supported in future
// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

// export default db;
