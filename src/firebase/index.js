import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = {
  apiKey: "AIzaSyDlWm4bmvdRGz9fRJcpsm1ZplrusX1BR1E",
  authDomain: "cmuh-3f3d8.firebaseapp.com",
  databaseURL: "https://cmuh-3f3d8.firebaseio.com",
  projectId: "cmuh-3f3d8",
  storageBucket: "cmuh-3f3d8.appspot.com",
  messagingSenderId: "346526469801"
}
export default firebase.initializeApp(config)
