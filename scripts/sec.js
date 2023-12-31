/**
 * @param inputStr      Encrypted string or array
 * @returns string[]    Decrypted string
 */
function sec(inputStr) {
   let decrypted = [];
    currentPosition = 20;

    if(Array.isArray(inputStr)) {
        for(let i = 0; i < inputStr.length; i++) {
            decrypted.push(decrypt(inputStr[i]));
        }
    } else {
        decrypted.push(decrypt(inputStr));
    }

    return decrypted;
}

function decrypt(inputStr) {
    let plainText = "";
    let array = inputStr.split(" ")

    for(let i = 0; i < array.length; i++) {
        let currentGroup = array[i];

        if(isNumber(currentGroup)) {
            let newLetter = subPositions(currentGroup);

            plainText += newLetter;
        } else if(currentGroup === "") {
            plainText += " ";
        } else {
            plainText += currentGroup;
        }
    }

    return plainText;
}

function subPositions(currentPos) {

    let currentPi = parseInt(pi.at(currentPosition).toString() + pi.at(currentPosition + 1).toString())

    currentPos -= currentPi;

    currentPosition += 2;

    return alphabet[currentPos];
}


function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }