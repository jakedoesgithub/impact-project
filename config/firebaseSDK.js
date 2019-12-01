import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAZ6pJR8aZLEAOUxQn4aVDFIuqBYStmqTo",
        authDomain: "impact-dc23e.firebaseapp.com",
        databaseURL: "https://impact-dc23e.firebaseio.com",
        projectId: "impact-dc23e",
        storageBucket: "impact-dc23e.appspot.com",
        messagingSenderId: "763671268785"
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;