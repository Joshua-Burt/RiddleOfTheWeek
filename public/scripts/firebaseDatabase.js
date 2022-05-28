// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRHo5QphDs9HQn2eJsQjugnE1gTVkiA6E",
    authDomain: "joshuaburt-dev.firebaseapp.com",
    projectId: "joshuaburt-dev",
    storageBucket: "joshuaburt-dev.appspot.com",
    messagingSenderId: "802039798789",
    appId: "1:802039798789:web:a62f70cd2a7f53acbd906c",
    measurementId: "G-G6J463XCRC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


// Get list of names of code breakers
const dbRef = ref(db);
get(child(dbRef, `codeBreakers/name/`)).then((snapshot) => {
    if (snapshot.exists()) {
        let nameList = [];
        let colorList = [];

// Get name and colour values from firebase and insert into two arrays
        snapshot.forEach((child) => {
            nameList.push(child.val().name);
            colorList.push(child.val().color);
        });

        let string = "";

        for(let i = 0; i < nameList.length; i++) {
            string += "<div style='color: " + colorList[i] + "'>" + nameList[i] + "</div>";
        }

        document.getElementById("breakerList").innerHTML = "<p>" + string + "</p>"
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});


function writeUserData(name, color) {
    const db = getDatabase();

    let regex = /(<([^>]+)>)/ig
    let result = name.replace(regex, "");

    set(ref(db, 'codeBreakers/name/' + Date.now()), {
        color: color,
        name: result
    });
}

window.writeUserData = writeUserData;