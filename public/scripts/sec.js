/**
 * @param inputStr      Encrypted string or array
 * @returns {array<string>}    Decrypted string
 */
function sec(inputStr) {
    let decrypted = [];
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
    let decrypted = "";
    for(let i = 0; i < inputStr.length; i++){
        let currentLetter = inputStr.charAt(i);

        if(currentLetter === separator) {
            decrypted += separator;
            i++;
        } else if(alphabet.indexOf(currentLetter) !== -1) {
            decrypted += antiShiftLetter(currentLetter);
        } else {
            decrypted += currentLetter;
        }
    }
    return decrypted;
}



function antiShiftLetter(letter) {
    let positionInAlphabet = alphabet.indexOf(letter);
    let newPosition = positionInAlphabet - 10;

    if(newPosition < 0) {
        newPosition += alphabet.length;
    }

    return alphabet.charAt(newPosition);
}