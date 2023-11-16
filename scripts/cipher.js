let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function cipher(inputStr) {
	let encryptedText = "";

	for(let i = 0; i < inputStr.length; i++) {
		// Get a letter from the input string
		let currentLetter = inputStr[i];

		// If the current letter isn't in the alphabet, just add it without encrypting it
		if(alphabet.indexOf(currentLetter) === -1) {
			encryptedText += currentLetter;

		} else {
			// Add the current letter's and previous letter's positions together
			// Find which letter is at that new position in the alphabet, and that will be the encrypted letter
			let newLetter = addPositions(currentLetter, inputStr[i - 1]);

			encryptedText += newLetter;
		}
	}

	return encryptedText;
}

function addPositions(currentLetter, previousLetter) {
	let currentLetterPosition = alphabet.indexOf(currentLetter);
	let previousLetterPosition = alphabet.indexOf(previousLetter);

	// If the previous letter doesn't exist in the alphabet
	// (aka, "indexOf" gives back -1)
	if(previousLetterPosition === -1) {
		previousLetterPosition = 1;
	}

	// Add the current letter and previous letter's positions together to get a new position
	let newPosition = (currentLetterPosition + previousLetterPosition) % alphabet.length;

	// Find which letter is at the new position
	return alphabet[newPosition];
}
