/**
 * @param input      Encrypted string or array
 * @returns {array<string>}    Decrypted string
 */
function sec(input) {
    let unencrypted = []

    if(Array.isArray(input)) {
        for(let i = 0; i < input.length; i++) {
            let rev = reverseString(input[i]);
            let nonHex = fromHex(rev)
            let codes = fromCharCode(nonHex);
            unencrypted.push(reverseString(codes))
        }
    } else {
        let rev = reverseString(input);
        let nonHex = fromHex(rev)
        let codes = fromCharCode(nonHex);
        unencrypted.push(reverseString(codes))
    }

    // for(let i = 0; i < unencrypted.length; i++) {
    //     unencrypted[i] = reverseString(unencrypted[i]);
    // }

    return unencrypted;
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