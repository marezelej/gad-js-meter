// checkFlatCase method checks if the given string is in flatcase or not. Flatcase is a convention
// where all letters are in lowercase, and there are no spaces between words.
// thisvariable is an example of flatcase. In camelCase it would be thisVariable, snake_case this_variable and so on.

// Problem Source & Explanation: https://en.wikipedia.org/wiki/Naming_convention_(programming)

function checkFlatCase(varname) {
    // firstly, check that input is a string or not.
    if (typeof varname !== 'string') {
        return new TypeError('Argument is not a string.')
    }

    const pat = /^[a-z]*$/
    return pat.test(varname)
}

function anagram2(s1, s2) {
    if (s1.length !== s2.length) {
        // not the same length, can't be anagram
        return false;
    }
    if (s1 === s2) {
        // same string must be anagram
        return true;
    }

    var c = '',
        i = 0,
        limit = s1.length,
        match = 0,
        idx;
    while (i < s1.length) {
        // chomp the next character
        c = s1.substr(i++, 1);
        // find it in the second string
        idx = s2.indexOf(c);
        if (idx > -1) {
            // found it, add to the match
            match++;
            // assign the second string to remove the character we just matched
            s2 = s2.substr(0, idx) + s2.substr(idx + 1);
        } else {
            // not found, not the same
            return false;
        }
    }
    return match === s1.length;
}




