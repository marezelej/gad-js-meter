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


function anagrams(stringA, stringB) {
    return stringA.replace(/[^\w]/g).toLowerCase().split('').sort().join() === stringB.replace(/[^\w]/g).toLowerCase().split('').sort().join()
}

