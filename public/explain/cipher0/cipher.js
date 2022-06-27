/**
 * Converts the input string into space-separated UTF-16 codes
 * eg: 'Hello!'
 *  -> '72 101 108 108 111 33'
 *
 * @param inputStr      String to be converted to char codes
 * @returns {string}    Converted string
 */
function toCharCodeString(inputStr) {
    let str = "";

    for(let i = 0; i < inputStr.length; i++) {
        str += inputStr.charCodeAt(i) + " ";
    }

    return str.trimEnd();
}

/**
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    let values = toCharCodeString(inputStr);
    return btoa(values);
}