import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC3jI7BDw7sOa-ODjAm4a_OONQlCGt88vg',
  authDomain: 'letsmeet-14180.firebaseapp.com',
  databaseURL: 'https://letsmeet-14180.firebaseio.com',
  projectId: 'letsmeet-14180',
  storageBucket: 'letsmeet-14180.appspot.com',
  messagingSenderId: '1080646127435',
  appId: '1:1080646127435:web:4cb9e92576bbf41d16a2ce',
  measurementId: 'G-TRSMD1ECYC',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
