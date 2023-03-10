let alphabet = "qwertyuiopasdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKL;ZXCVBNM<>?"

/**
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    let encrypted = "";
    for(let i = 0; i < inputStr.length; i++){
        let currentLetter = inputStr.charAt(i);

        if(currentLetter === separator) {
            encrypted += separator;
        } else if(alphabet.indexOf(currentLetter) !== -1) {
            encrypted += shiftLetter(currentLetter);
        } else {
            encrypted += currentLetter;
        }
    }
    return encrypted;
}


function shiftLetter(letter) {
    let positionInAlphabet = alphabet.indexOf(letter);

    let newPosition = (positionInAlphabet + 10) % alphabet.length;

    return alphabet.charAt(newPosition);
}