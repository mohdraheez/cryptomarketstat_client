import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDjPddmvt4bGFW9cLBfK7H9rnQmUbEEHfU",
    authDomain: "cryptomarketstat.firebaseapp.com",
    databaseURL: "https://cryptomarketstat-default-rtdb.firebaseio.com",
    projectId: "cryptomarketstat",
    storageBucket: "cryptomarketstat.appspot.com",
    messagingSenderId: "996063393940",
    appId: "1:996063393940:web:d4f3883185331df3dcdc81",
    measurementId: "G-1E72SDD0X3"
};

  const firebase = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebase);

export default firebase;
