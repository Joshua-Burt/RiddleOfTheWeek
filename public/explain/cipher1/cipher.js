/**
 * Pads the input num with leading 0s
 * e.g. num = 5, places = 3
 *      -> 005
 *
 * @param num       Number to be padded
 * @param places    Number of total characters to pad to
 * @returns {string}    String containing num padded to places
 */
function zeroPad(num, places) {
    return String(num).padStart(places, '0')
}


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
 * Flips the bits of a binary string, removes any characters that aren't a 1 or 0
 * eg: 001011
 *  -> 110100
 *
 * @param inputStr      String containing binary
 * @returns {string}    A bit-flipped version of the input string
 */
 function bitFlip(inputStr) {
    let array = inputStr.split(" ");

    for(let i = 0; i < array.length; i++) {
        let invertedString = "";

        // Go through each character and add the opposite to invertedString
        for(let j = 0; j < array[i].length; j++) {
            let char = array[i].charAt(j)

            if(char === "0") {
                invertedString += 1;
            } else if(char === "1") {
                invertedString += 0;
            }
        }

        array[i] = invertedString
    }

    return array.join(" ")
}


/**
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    let values = toCharCodeString(inputStr);
    let array = values.split(" ");

    for(let i = 0; i < array.length; i++) {
        let binary = parseInt(array[i], 10).toString(2);

        array[i] = zeroPad(binary, 8);
        array[i] = bitFlip(array[i]);
    }

    return array.join(" ").trimEnd();
}