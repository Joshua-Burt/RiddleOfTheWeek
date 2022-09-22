/**
 * @param input      Encrypted string or array
 * @returns {array<string>}    Decrypted string
 */
function sec(input) {
    let unencrypted = []
    let letters = ""

    if(Array.isArray(input)) {
        for(let i = 0; i < input.length; i++) {

            for(let j = 0; j < input[i].length; j++) {
                letters += getAntiLetter(input[i].charAt(j));
            }
            unencrypted.push(letters);
        }
    } else {
        for(let i = 0; i < input.length; i++) {
            letters += getAntiLetter(input.charAt(i));
        }
        unencrypted.push(letters);
    }

    return unencrypted;
}

/**
 *
 * @param char          A single letter
 * @returns {string}    Encrypted letter
 */
function getAntiLetter(char) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz!~=\\\";\'<>,.1234567890+-:()?_"
    let cipher_alphabet = "codingABCDEFGHIJKLMNOPQRSTUVWXYZ rulesabfhjkmpqtvwxyz!~=\\\";\'<>,.1234567890+-:()?_"

    if(char === "_") {
        return "\n";
    }

    return alphabet.charAt(cipher_alphabet.indexOf(char));
}