let mask = [1,2,3,4,5,6,7,8,9,10]

function cipher(inputStr) {
	let cipherText = "";

	for(let i = 0; i < inputStr.length; i++) {

		if(inputStr[i] === "|" || inputStr[i] === "~" || inputStr[i] === "=") {
			cipherText += inputStr[i];
		} else {
			let characterCode = inputStr.charCodeAt(i);
			characterCode += mask[i % 10];


			// Make sure it does not include the characters
			// [ \ ] ^ _ `
			if(characterCode > 90 && characterCode < 97) {
				characterCode = 97 + (characterCode % 90);
			} else if(characterCode > 122) {
				characterCode = 32 + characterCode % 122;
			}

			cipherText += String.fromCharCode(characterCode);
		}
	}

	return cipherText;
}