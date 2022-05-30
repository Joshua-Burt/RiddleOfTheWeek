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
let lists = [];
let mostRecentEncryption = 1;
let currentEncryptionNum = mostRecentEncryption;

// Get list of names of code breakers
const dbRef = ref(db);
get(child(dbRef, `codeBreakers/`)).then((snapshot) => {
    if (snapshot.exists()) {

        snapshot.forEach((child) => {
            lists.push(child.val());
        });

        // Default encryption number
        let propLists = getPropertyListsByEncryption(currentEncryptionNum);
        displayCodeBreakers(propLists[0], propLists[1]);

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

function getListByEncryption(encryptionNum) {
    return lists[encryptionNum];
}

function isArrayIndex(n) {
    return !isNaN(parseInt(n, 10));
}

function getPropertyListsByEncryption(encryptionNum) {
    let nameList = [];
    let colorList = [];
    let currentList = getListByEncryption(encryptionNum);

    for (let n in currentList) {
        if (currentList.hasOwnProperty(n) && isArrayIndex(n)) {
            nameList.push(currentList[n].name);
            colorList.push(currentList[n].color);
        }
    }


    return [colorList, nameList];
}


function displayCodeBreakers(colorList, nameList) {
    if(nameList.length > 0) {
        let string = "";

        for (let i = 0; i < nameList.length; i++) {
            string += "<div style='color: " + colorList[i] + "'>" + nameList[i] + "</div>";
        }

        document.getElementById("breakerList").innerHTML = "<p>" + string + "</p>"
    } else {
        document.getElementById("breakerList").innerHTML = "<p>No Code Breakers yet!</p>"
    }
}

function previousCodeBreakers() {
    if(currentEncryptionNum > 0) {
        currentEncryptionNum--;
        let propLists = getPropertyListsByEncryption(currentEncryptionNum);
        displayCodeBreakers(propLists[0], propLists[1])
    }
    document.getElementById("nextCodeBreaker").disabled = false;
    document.getElementById("prevCodeBreaker").disabled = currentEncryptionNum === 0;
}

function nextCodeBreakers() {
    if(currentEncryptionNum < lists.length - 1) {
        currentEncryptionNum++;
        let propLists = getPropertyListsByEncryption(currentEncryptionNum);
        displayCodeBreakers(propLists[0], propLists[1])
    }
    document.getElementById("prevCodeBreaker").disabled = false;
    document.getElementById("nextCodeBreaker").disabled = currentEncryptionNum === lists.length - 1;
}


function writeUserData(name, color) {
    const db = getDatabase();

    let regex = /(<([^>]+)>)/ig
    let result = name.replace(regex, "");

    set(ref(db, 'codeBreakers/' + mostRecentEncryption + "/" + Date.now()), {
        color: color,
        name: result
    });
}

window.writeUserData = writeUserData;
window.previousCodeBreakers = previousCodeBreakers;
window.nextCodeBreakers = nextCodeBreakers;