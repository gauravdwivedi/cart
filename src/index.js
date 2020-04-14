import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';


 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyBjSrgoSm1VjKBHjIjoOtsKN4h8h0Y3Tdg",
  authDomain: "cart-60708.firebaseapp.com",
  databaseURL: "https://cart-60708.firebaseio.com",
  projectId: "cart-60708",
  storageBucket: "cart-60708.appspot.com",
  messagingSenderId: "1046298322329",
  appId: "1:1046298322329:web:e6ae219716e90ab65fdf08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
