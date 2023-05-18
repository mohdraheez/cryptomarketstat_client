import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import image from '../images/loginimage.png'
import facebook from '../images/facebook.png'
import axios from "axios";
// import GooglePopup from "./googlepopup";
// import facebookPopup from "./facebookpopup";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
firebase.initializeApp(firebaseConfig);

function Login() {

firebase.auth().getRedirectResult().then(function(result) 
{
    // document.querySelector('.login-btn').disabled = true;
    if(result.user)
   var user = result.user;
   var userDetails= {

   }
   userDetails.id=user.uid;
   userDetails.email=user.email;
   userDetails.name = user.displayName;
   userDetails.verified = user.emailVerified;
   userDetails.photourl = user.photoURL;
//    axios.post('https://cryptomarketstat.azurewebsites.net/user',userDetails);
   axios.post('https://cryptomarketstat.azurewebsites.net/user',userDetails);

   localStorage.setItem("loginAutentication",JSON.stringify(userDetails));
   localStorage.removeItem("currentlocation");
   window.history.go(-3);

}).catch(function(error) {
   var errorCode = error.code;
   var errorMessage = error.message;
 
   console.log(error.code)
   console.log(error.message)
});

function GooglePopup(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
}
function facebookPopup(){
    var facebookprovider = new firebase.auth.FacebookAuthProvider();
     
     firebase.auth().signInWithPopup(facebookprovider)
    
     .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
          
        console.log(token)
        console.log(user)
     }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
     });
 }

    return (
        <div className="logindiv">
            <div className="loginimagediv">
                <img src={image} className="loginimage"></img>
            </div>
            <div className="login-selector">
                <button className="btn btn-outline-light login-btn" onClick={GooglePopup}><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="google-logo"></img>Continue with Google</button>
                <button className="btn btn-primary login-btn" disabled onClick={facebookPopup}><img src={facebook} className="google-logo"></img>Continue with Facebook</button>

            </div>
        </div>
    )
}

export default Login;