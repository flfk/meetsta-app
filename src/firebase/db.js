import 'firebase/firestore';

import firebase from './firebase';

const db = firebase.firestore();

// To ensure ensure firestore timestamp objects supported in future
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
