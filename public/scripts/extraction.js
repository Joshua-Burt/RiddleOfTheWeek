let riddles;
let words;
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
                    lastRiddle.riddle + "</i><br>" + "<b>" + sec(lastRiddle.answer) + "</b>";
            }
        }
    });

fetch("rotw/words.txt")
    .then(response => response.text())
    .then(data => {
        words = data.split("\r\n");
    });

function hasSwearWord(string) {
    return words.includes(string)
}

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

            // Skip over a line to ignore the =
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
 * Ensures the checkbox is selected before the user can submit their name
 */
function enableSubmission() {
    document.getElementById("submitBreaker").disabled = !document.getElementById("confirmNoCheat").checked;
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
 * Retrieves the name and text colour for the Hall of Code Breakers
 * and writes it to the database
 */
function addToHall() {
    let name = document.getElementById("name").value
    let nameSplit = name.split(" ");

    for(let i = 0; i < nameSplit.length; i++) {
        if(hasSwearWord(nameSplit[i].toLowerCase())) {
            return;
        }
    }

    if(gotNextRiddle && name.length > 0 && name.length <= 32 && document.getElementById("confirmNoCheat").checked) {
        let color = document.getElementById("inputColor").value

        window.writeUserData(name, color);

        // Wait 0.1 seconds before reloading to make sure Firebase uploads
        setTimeout(function(){
            location.reload()
        }, 100);
    }
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


// April Fools!

if(new Date().getDate() === 1) {
    let t = setInterval(setCountdown, 1000);
    let countdown = document.getElementById("countdown");
    let message = document.getElementById("message");
    let buttonPresses = 0;

    let msgs = ["Hey there",
        "Didn't you read the button?",
        "It says not to click it",
        "That means you're not supposed to click it",
        "I guess we're just breaking rules today",
        "Stop clicking the button",
        "Please stop",
        "I can be a rule breaker too, you know",
        "Watch this",
        "...",
        "...",
        "Were you expecting something?",
        "I'm just trying to enjoy my time here",
        "But there's an awful lot of clicking going on",
        "...",
        "...",
        "You gotta stop eventually, right?",
        "I know what I can do to stop this",
        "If I tell you the answer to the riddle, will you stop?",
        "...",
        "You didn't answer me, you just kept clicking the button",
        "I guess that means no then",
        "I'll give you a hint at least",
        "But you have to promise not to click any more afterwards, okay?",
        "Pinky swear?",
        "Alright, the hint is...",
        "April Fools!"]


    function setCountdown() {
        let minutes = Math.floor((msToNextHour() / 1000) / 60);
        let seconds = Math.floor((msToNextHour() / 1000) % 60);
        countdown.innerHTML = "<h3>" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "</h3>";

        if (isValidTime()) {
            countdown.innerHTML = "<button onclick='onCountDownClick()'>Don't Click Me</button>"
            clearInterval(t);
        }
    }

    function onCountDownClick() {
        if (isValidTime()) {
            buttonPresses++;
            if (buttonPresses === 1) {
                message.innerText = msgs[0];
            } else if (buttonPresses === 2) {
                message.innerText = msgs[1];
            } else if (buttonPresses === 4) {
                message.innerText = msgs[2];
            } else if (buttonPresses > 4) {
                message.innerText = msgs[3 + Math.floor(buttonPresses / 10)];
            }

            if (3 + Math.floor(buttonPresses / 10) === 26) {
                countdown.innerHTML = ""
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank').focus();
            }
        }
    }


    function isValidTime() {
        return Math.floor(msToNextHour()) <= 0;
    }

    function msToNextHour() {
        return (3600000 - new Date().getTime() % 3600000) - 600000;
    }
}