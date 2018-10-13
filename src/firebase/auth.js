import 'firebase/auth';

import firebase from './firebase';

const auth = firebase.auth();

// Listen for auth
// auth.onAuthStateChanged(async user => {
//   if (!user) {
//     await firebase.auth().signInAnonymously();
//   }
// });

export default auth;
