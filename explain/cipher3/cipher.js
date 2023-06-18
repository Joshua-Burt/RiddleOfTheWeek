/**
 *
 * @param char          A single letter
 * @returns {string}    Encrypted letter
 */
function getLetter(char) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz!~=\\\";\'<>,.1234567890+-:()?_"
    let cipher_alphabet = "codingABCDEFGHIJKLMNOPQRSTUVWXYZ rulesabfhjkmpqtvwxyz!~=\\\";\'<>,.1234567890+-:()?_"

    return cipher_alphabet.charAt(alphabet.indexOf(char));
}

/**
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    let finished_cipher = "";

    // Replace any \n or \r with _
    inputStr = inputStr.replace(/[\r\n]/gm, '_')

    // Encrypt letter by letter
    for(let i = 0; i < inputStr.length; i++) {
        finished_cipher += getLetter(inputStr.charAt(i));
    }

    return finished_cipher;
}