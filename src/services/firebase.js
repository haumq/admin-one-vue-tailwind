import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU",
      authDomain: "ornate-axiom-330401.firebaseapp.com",
      databaseURL: "https://ornate-axiom-330401-default-rtdb.firebaseio.com",
      projectId: "ornate-axiom-330401",
      storageBucket: "ornate-axiom-330401.appspot.com",
      messagingSenderId: "961046440332",
      appId: "1:961046440332:web:d365531092c97bbc424ea9",
      measurementId: "G-CQY5Y97T3K"
    };
    // Initialize Firebase
const FirebseApp = initializeApp(firebaseConfig);

export default FirebseApp
