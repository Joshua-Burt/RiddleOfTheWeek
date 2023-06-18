let addingNumbers = [1,2,3,4,5,6,7,8,9,10]
let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function cipher(inputStr) {
	let cipherText = "";

	for(let i = 0; i < inputStr.length; i++) {
		// Get a letter from the input string
		let currentLetter = inputStr[i];

		// If the current letter isn't in the alphabet, just add it without encrypting it
		if(alphabet.indexOf(currentLetter) === -1) {
			cipherText += currentLetter;
		} else {
			// Find the position of the current letter in the alphabet string at the top
			// Example: the letter 'a' has the position 0, 'b' has 1, etc.
			let position = alphabet.indexOf(currentLetter);

			// We add a number to the position number to get a new position
			// Hint: this is a big part of the encryption
			let newPosition = position + addingNumbers[i % 10];

			// If the new position is bigger than the alphabet, wrap back to the beginning
			if(newPosition >= alphabet.length) {
				newPosition -= alphabet.length;
			}

			let newLetter = alphabet[newPosition];

			cipherText += newLetter;
		}
	}

	return cipherText;
}