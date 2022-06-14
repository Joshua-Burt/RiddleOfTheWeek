/**
 * @param input      Encrypted string or array
 * @returns {string}    Decrypted string
 */
function sec(input) {
    let values;

    if(Array.isArray(input)) {
        values = separate(input)
    } else {
        values = "";
        let tokens = input.split(" ");

        for (let i = 0; i < tokens.length; i++) {
            tokens[i] = bitFlip(tokens[i])
            tokens[i] = parseInt(tokens[i], 2);

            values += String.fromCharCode(tokens[i]);
        }
    }

    return values;
}

function separate(array) {
    let values = [];
    for(let i = 0; i < array.length; i++) {
        values.push(sec(array[i]));
    }

    return values;
}