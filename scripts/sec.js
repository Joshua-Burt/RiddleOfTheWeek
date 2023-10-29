/**
 * @param inputStr      Encrypted string or array
 * @returns string    Decrypted string
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
    let plainText = "";

    for(let i = 0; i < inputStr.length; i++) {
        let currentLetter = inputStr[i];

        if(alphabet.indexOf(currentLetter) === -1) {
            plainText += currentLetter;
        } else {
            // Add the current letter's and previous letter's positions together
            let newLetter = subPositions(currentLetter, plainText[i - 1]);

            plainText += newLetter;
        }
    }

    return plainText;
}

function subPositions(currentLetter, previousDecryptedLetter) {
    let currentPosition = alphabet.indexOf(currentLetter);
    let subAmount = alphabet.indexOf(previousDecryptedLetter);

    // If the previous letter doesn't exist in the alphabet
    // (aka, "indexOf" gives back -1)
    if(subAmount === -1) {
        subAmount = 1;
    }

    let newCharacter = (currentPosition - subAmount);

    if(newCharacter < 0) {
        newCharacter += alphabet.length;
    }

    return alphabet[newCharacter];
}