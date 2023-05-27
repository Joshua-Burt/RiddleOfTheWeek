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

        if(alphabet_original.indexOf(inputStr[i]) === -1) {
            plainText += inputStr[i];
        } else {
            let position = alphabet_original.indexOf(inputStr[i]);
            let newPosition = position - addingNumbers[i % 10];

            if(newPosition < 0) {
                newPosition += alphabet_original.length;
            }

            let newLetter = alphabet_original[newPosition];

            plainText += newLetter;
        }
    }

    return plainText;
}
