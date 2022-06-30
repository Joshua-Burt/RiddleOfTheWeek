/**
 *
 * @param string        String containing text
 * @returns {string}    txet gniniatnoc gnirtS
 */
function reverseString(string) {
    string = string.toString();
    return string.split("").reverse().join("");
}


/**
 *
 * @param str           String containing text
 * @returns {string}    String encoded in Hexadecimal
 */
function toHex(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16) + " ";
    }
    return result.trim();
}

/**
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    let revStr = reverseString(inputStr);
    let hex = toHex(revStr);

    return reverseString(hex);
}