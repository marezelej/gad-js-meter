function isPangram(string) {
    let strArr = string.toLowerCase();
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    for (let i = 0; i < alphabet.length; i++) {
        if (strArr.indexOf(alphabet[i]) < 0) {
            return false;
        }
    }
    return true;
}


function checkPangram(string) {
    if (typeof string !== 'string') {
        throw new TypeError('The given value is not a string')
    }

    const frequency = new Set()

    for (const letter of string.toLowerCase()) {
        if (letter >= 'a' && letter <= 'z') {
            frequency.add(letter)
        }
    }

    return frequency.size === 26
}
  
  