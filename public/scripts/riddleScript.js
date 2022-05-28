let riddles;
let currentRiddle;
let nextRiddleAnswer;
let gotNextRiddle = false;


// Create a Riddle object to hold the riddles
class Riddle {
    constructor(riddle, answer) {
        this.riddle = riddle;
        this.answer = answer;
    }
}

// Returns the current week number
Date.prototype.getWeekNumber = function(){
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};


// Get file containing the encrypted riddle questions and answers
fetch("rotw/riddles.txt")
    .then(response => response.text())
    .then(data => {
        // Take the encrypted riddles and decrypt them and parse through them
        let input = antiCipher(data);
        riddles = parseRiddles(input);

        // Get the current riddle number (By the week number)
        let riddleNumber = getRiddleNumber();
        let lastRiddleNumber = riddleNumber - 1;

        //Retrieve the riddles based on the number and display on screen
        if(riddleNumber >= riddles.length || riddleNumber < 0) {
            document.getElementById("riddle").innerHTML = "Josh needs to add more riddles :)"
        } else {
            // Current Riddle
            currentRiddle = riddles[riddleNumber];
            document.getElementById("riddle").innerHTML = currentRiddle.riddle;

            // Last Riddle
            let lastRiddle = riddles[lastRiddleNumber];
            document.getElementById("last").innerHTML = "<h3>Last week's riddle & answer:</h3><br><i>" + lastRiddle.riddle + "</i><br>" + "<b>" + antiCipher(lastRiddle.answer) + "</b>";

            // Next Riddle
            if(riddleNumber + 1 < riddles.length) {
                nextRiddleAnswer = riddles[riddleNumber + 1].answer;
            }
        }
    });


// Take the unencrypted riddles and parse the questions and answers into objects
function parseRiddles(data) {
    // Split the decrypted riddles into an array
    let riddles = [];
    let lines = data.split("\n");

    // Go through each string in the array
    // Strings starting with ~ are a riddle question
    // Strings starting with = are a riddle answer
    for(let i = 0; i < lines.length; i++) {
        if(lines[i].includes("~")) {
            // Once the ~ has been found, the line after is always the =
            let riddle = lines[i].substr(1);
            let answer = cipher(lines[i + 1].substr(1).trim());

            // Skip over a line to ignore the =
            i += 1;

            // Create a new riddle object and add to the array of riddles
            let riddleObj = new Riddle(riddle, answer);
            riddles.push(riddleObj);
        }
    }
    return riddles;
}


// Confirm if the user has gotten the correct answer and display the result
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value;

    if(userAnswer.length > 0) {
        // Set the delay for the background colour to fast
        document.body.className = "fast";

        // Entered the current riddle answer
        if(equalsIgnoringCase(userAnswer.trim(), antiCipher(currentRiddle.answer))) {
            document.body.style.backgroundColor = 'rgb(' + [85,228,47].join(",") + ')';
            document.getElementById("result").style.display = "inline-block";
            document.getElementById("result").innerHTML = "Nice job! Go and write your name on the board! :D<br>Don't spoil the answer!";
            document.getElementById("answer").className = "blur";

            // Entered the next riddle answer
        } else if(equalsIgnoringCase(userAnswer.trim(), antiCipher(nextRiddleAnswer))) {
            document.body.style.backgroundColor = 'rgb(' + [250,220,0].join(",") + ')';
            document.getElementById("result").style.display = "none";
            document.getElementById("hallInput").style.display = "inline-block";
            document.getElementById("answer").className = "blur";

            gotNextRiddle = true;

            // Entered an incorrect answer
        } else {
            document.body.style.backgroundColor = 'rgb(' + [224,74,74].join(",") + ')';
            document.getElementById("result").style.display = "inline-block";
            document.getElementById("result").innerHTML = "Incorrect! Try again :)";
            $( "#answerBox" ).effect("shake", {times:2, distance:10});
            document.getElementById("answer").className = "";

            setTimeout(() => {
                document.body.className = "slow";
                document.body.style.backgroundColor = 'rgb(' + [233,233,233].join(",") + ')';
            }, 500);
        }
    }
}



// Helper functions

// Pads the input num with leading 0s
// e.g. input: num = 5, places = 3
//      output: 005
const zeroPad = (num, places) => String(num).padStart(places, '0')

//TODO: Implement swear filter
function swearFilter(string) {

}


function toCharCodeString(inputStr) {
    let str = "";

    for(let i = 0; i < inputStr.length; i++) {
        str += inputStr.charCodeAt(i) + " ";
    }

    return str.trimEnd();
}


// Make sure the checkbox is selected before the user can submit their name
function enableSubmission() {
    document.getElementById("submitBreaker").disabled = !document.getElementById("confirmNoCheat").checked;
}


function getRiddleNumber() {
    return new Date().getWeekNumber();
}


// Retrieves the name and text colour for the Hall of Code Breakers
function addToHall() {
    let name = document.getElementById("name").value

    if(gotNextRiddle && name.length > 0 && document.getElementById("confirmNoCheat").checked) {
        let color = document.getElementById("inputColor").value

        window.writeUserData(name, color);

        // Wait 0.1 seconds before reloading to make sure Firebase uploads
        setTimeout(function(){
            location.reload()
        }, 100);
    }
}


// Compares two different texts, but ignores if the letters are upper or lower case
function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, {sensitivity: 'base'}) === 0 || text.includes(other);
}


// Flips the bits of a binary string
// 001011 -> 110100
function bitFlip(inputStr) {
    let array = inputStr.split(" ");

    for(let i = 0; i < array.length; i++) {
        let invert = "";

        for(let j = 0; j < array[i].length; j++) {
            invert += array[i].charAt(j) === "0" ? 1 : 0;
        }

        array[i] = invert
    }

    return array.join(" ")
}


// If you're reading comments, this is a pretty good place to start
function antiCipher(inputStr) {
    let values = "";
    let tokens = inputStr.split(" ");

    for(let i = 0; i < tokens.length; i++) {
        tokens[i] = bitFlip(tokens[i])
        tokens[i] = parseInt(tokens[i], 2);

        values += String.fromCharCode(tokens[i]);
    }
    return values;
}


function cipher(inputStr) {
    let values = toCharCodeString(inputStr);
    let array = values.split(" ");

    for(let i = 0; i < array.length; i++) {
        let bin = parseInt(array[i]).toString(2);

        array[i] = zeroPad(bin, 8);
        array[i] = bitFlip(array[i]);
    }

    return array.join(" ").trimEnd();
}