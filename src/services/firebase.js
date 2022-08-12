import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
    
    var config = {
        apiKey: "AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU",
        authDomain: "ornate-axiom-330401.firebaseapp.com",
        databaseURL: "https://ornate-axiom-330401-default-rtdb.firebaseio.com",
        projectId: "ornate-axiom-330401",
        storageBucket: "ornate-axiom-330401.appspot.com",
        messagingSenderId: "961046440332"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);
    // console.log(database)
    var ref = database.ref("changed");
    var data = db.collection("changed").doc("changed").get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
})
      // console.log(data)


// ref.on("child_added", function(snapshot) {
//   console.log(snapshot.key);
// });

    ref.on('child_changed', function(childSnapshot, prevChildKey) {
        // refreshData();
        console.log("refresh page");
         const utt = new SpeechSynthesisUtterance('xin chào thế giới');
            speechSynthesis.speak(utt);
    });
