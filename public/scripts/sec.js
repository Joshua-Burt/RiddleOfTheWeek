/**
 * @param inputStr      Encrypted string or array
 * @returns string    Decrypted string
 */
function sec(inputStr) {
    let plainText = "";

    for(let i = 0; i < inputStr.length; i++) {

        if(inputStr[i] === "|" || inputStr[i] === "~" || inputStr[i] === "=") {
            plainText += inputStr[i];
        } else {
            let characterCode = inputStr.charCodeAt(i);
            characterCode -= mask[i % 10];

            if(characterCode > 90 && characterCode < 97) {
                characterCode = 90 - (characterCode % 90)
            } else if(characterCode < 32) {
                characterCode = 122 - (32 - characterCode)
            }

            plainText += String.fromCharCode(characterCode);
        }
    }

    return plainText;
}
