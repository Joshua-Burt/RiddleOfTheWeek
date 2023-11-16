let riddles;
let gotNextRiddle = false;
let separator = "|"
window.gotNextRiddle = gotNextRiddle;


/**
 * Riddle object to hold a riddle and answer
 */
class Riddle {
    constructor(riddle, answer) {
        this.riddle = riddle;
        this.answer = answer;
    }

    toString(key) {
        return "~" + this.riddle + separator + "=" + key(this.answer) + separator + separator;
    }
}

let quotes = [];

fetch("rotw/quotes.txt")
    .then(response => response.text())
    .then(data => {
        quotes = data.split("|");
    });

/**
 * Get file containing the encrypted riddle questions and answers
 */
fetch("rotw/riddles.txt")
    .then(response => response.text())
    .then(data => {
        // Take the encrypted riddles and decrypt them and parse through them
        let input = sec(data);
        riddles = parseRiddles(input);

        // Get the current riddle number (By the week number)
        let riddleNumber = getRiddleNumber();
        let lastRiddleNumber = riddleNumber - 1;

        //Retrieve the riddles based on the number and display on screen
        if(document.getElementById("riddle")) {
            if (riddleNumber >= riddles.length || riddleNumber < 0) {
                document.getElementById("riddle").innerHTML = "Josh needs to add more riddles :)"
            } else {
                // Current Riddle
                let currentRiddle = getRiddle(riddleNumber);
                document.getElementById("riddle").innerHTML = currentRiddle.riddle;

                // Last Riddle
                let lastRiddle = getRiddle(lastRiddleNumber);
                document.getElementById("last").innerHTML = "<h3>Last week's riddle & answer:</h3><br><i>" +
                    lastRiddle.riddle + "</i><br>" + "<b>" + sec(lastRiddle.answer).join(", ") + "</b>";
            }
        }
    });


/**
 * Take the unencrypted riddles and parse the questions and answers into objects
 * @param data      String containing the formatted riddle text
 * @returns {*[]}   Array containing riddle objects for each riddle
 */
function parseRiddles(data) {
    // Split the decrypted riddles into an array
    let riddles = [];
    let lines = data[0].split(separator);

    // Go through each string in the array
    // Strings starting with ~ are a riddle question
    // Strings starting with = are a riddle answer
    // Lines are separated by |

    for(let i = 0; i < lines.length; i++) {
        if(lines[i].includes("~")) {
            // Once the ~ has been found, the line after is always the =

            let riddle;
            // Encrypt next weeks riddle
            if(riddles.length >= getRiddleNumber() + 1) {
                riddle = cipher(lines[i].substr(1));
            } else {
                riddle = lines[i].substr(1);
            }

            let answer = lines[i + 1].substr(1).trim().split(",");

            for(let j = 0; j < answer.length; j++) {
                answer[j] = cipher(answer[j]);
            }

            // Skip over a line to account for the =
            i += 1;

            // Create a new riddle object and add to the array of riddles
            let riddleObj = new Riddle(riddle, answer);
            riddles.push(riddleObj);
        }
    }
    return riddles;
}

function getRiddle(riddleNumber) {
    return riddles[riddleNumber];
}


/**
 * Confirm if the user has gotten the correct answer and display the result
 */
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value;

    // Correct answers will never be 0 characters or longer than 30 characters
    if(userAnswer.length <= 0 || userAnswer.length >= 30) {
        return;
    }

    // Set the delay for the background colour to fast
    document.body.className = "fast";

    let sec1 = [];
    let sec2 = [];

    for(let i = 0; i < getRiddle(getRiddleNumber()).answer.length; i++) {
        sec1.push(sec(getRiddle(getRiddleNumber()).answer[i]));
    }


    if(getRiddle(getRiddleNumber() + 1) != null) {
        for(let i = 0; i < getRiddle(getRiddleNumber() + 1).answer.length; i++) {
            sec2.push(sec(getRiddle(getRiddleNumber() + 1).answer[i]));
        }
    }

    // Entered the current riddle answer
    if(equalsIgnoringCase(userAnswer.trim(), sec1)) {
        document.body.style.backgroundColor = 'rgb(' + [85,228,47].join(",") + ')';
        document.getElementById("result").style.display = "inline-block";
        document.getElementById("result").innerHTML = "Nice job! Go and write your name on the board! :D<br>Don't spoil the answer!";
        document.getElementById("answer").className = "blur";

        // Entered the next riddle answer
    } else {
        if(equalsIgnoringCase(userAnswer.trim(), sec2)) {
            document.body.style.backgroundColor = 'rgb(' + [250,220,0].join(",") + ')';
            document.getElementById("result").style.display = "none";
            // Add quote
            document.getElementById("quote").innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById("hallInput").style.display = "inline-block";
            document.getElementById("answer").className = "blur";

            gotNextRiddle = true;
            window.gotNextRiddle = gotNextRiddle;

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

/**
 * @returns {number}    Current week number
 */
Date.prototype.getWeekNumber = function(){
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};


/**
 * @returns {number}    Current week number
 */
function getRiddleNumber() {
    return new Date().getWeekNumber();
}


/**
 * Compares two different texts, but ignores if the letters are upper or lower case
 * @param text      Text 1 to compare
 * @param other     Text 2 to compare
 * @returns {boolean|*}     True if they are the same, false otherwise
 */
function equalsIgnoringCase(text, other) {
    if(Array.isArray(other)) {
        for(let i = 0; i < other.length; i++) {
            if(text.localeCompare(other[i], undefined, {sensitivity: 'base'}) === 0 || text.includes(other[i])) {
                return true;
            }
        }
    } else {
        return text.localeCompare(other, undefined, {sensitivity: 'base'}) === 0 || text.includes(other);
    }
}