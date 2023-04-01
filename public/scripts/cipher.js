// Define the alphabet to be used in the cipher
let alphabet = "qwertyuiopasdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKL;ZXCVBNM<>?"
 
/**
 * Cipher function to encrypt the input string
 * @param inputStr      String to be encrypted
 * @returns {string}    Encrypted string
 */
function cipher(inputStr) {
    // Initialize an empty string for the encrypted text
    let encrypted = "";
 
    // Loop through each character in the input string
    for(let i = 0; i < inputStr.length; i++){
        // Get the current character
        let currentLetter = inputStr.charAt(i);
 
        // If the character is the separator, add it to the output string
        if(currentLetter === "|") {
            encrypted += "|";
        } 
        // If the character is in the alphabet, shift it by 10 positions and add to the output string
        else if(alphabet.indexOf(currentLetter) !== -1) {
            encrypted += shiftLetter(currentLetter);
        } 
        // If the character is not in the alphabet, add it to the output string as-is
        else {
            encrypted += currentLetter;
        }
    }
    // Return the encrypted string
    return encrypted;
}
 
/**
 * Shifts a letter by 10 positions in the alphabet
 * @param letter    Letter to be shifted
 * @returns         Shifted letter
 */
function shiftLetter(letter) {
    // Find the current position of the letter in the alphabet
    let positionInAlphabet = alphabet.indexOf(letter);
 
    // Calculate the new position of the letter after shifting by 10 positions
    let newPosition = (positionInAlphabet + 10) % alphabet.length;
 
    // Return the letter at the new position in the alphabet
    return alphabet.charAt(newPosition);
}
