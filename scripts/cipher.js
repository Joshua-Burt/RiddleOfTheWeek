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
			// Add the current letter's and previous letter's positions together
			let newLetter = addPositions(currentLetter, inputStr[i - 1]);

			cipherText += newLetter;
		}
	}

	return cipherText;
}

function addPositions(currentLetter, previousLetter) {
	let currentPosition = alphabet.indexOf(currentLetter);
	let addAmount = alphabet.indexOf(previousLetter);

	// If the previous letter doesn't exist in the alphabet
	// (aka, "indexOf" gives back -1)
	if(addAmount === -1) {
		addAmount = 1;
	}

	let newCharacter = (currentPosition + addAmount) % alphabet.length;
	return alphabet[newCharacter];
}