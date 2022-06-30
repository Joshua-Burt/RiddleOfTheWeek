/**
 * @param input      Encrypted string or array
 * @returns {string}    Decrypted string
 */
function sec(input) {
    let rev = reverseString(input);
    let nonHex = fromHex(rev)
    let codes = fromCharCode(nonHex);
    return reverseString(codes);
}

function fromHex(hex) {
    let list = hex.split(" ");
    let nonHex = "";
    for(let i = 0; i < list.length; i++) {
        nonHex += parseInt(list[i], 16).toString() + " ";
    }

    return nonHex.trim();
}

function fromCharCode(inputStr) {
    let outStr = "";
    let list = inputStr.split(" ");
    for(let i = 0; i < list.length; i++) {
        outStr += String.fromCharCode(list[i])
    }

    return outStr;
}