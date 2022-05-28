/**
 * @param inputStr      Encrypted string
 * @returns {string}    Decrypted string
 */
function sec(inputStr) {
    let values = "";
    let tokens = inputStr.split(" ");

    for(let i = 0; i < tokens.length; i++) {
        tokens[i] = bitFlip(tokens[i])
        tokens[i] = parseInt(tokens[i], 2);

        values += String.fromCharCode(tokens[i]);
    }
    return values;
}