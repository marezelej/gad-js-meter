/**
 * This function types are described on the following paper:
 *  -   https://www.researchgate.net/publication/282431515_Duplicate_Code_Detection_using_Control_Statements
 * Each type is a different form of code similarity to be detected.
 */

function aType1(n /*A number*/) {
    //if the number is positive
    if (n > 0) {
        n = n * 1; //multiply by plus 1
    } else {
        n = n * -1; // multiply by minus 1
    }
    /**
     * Some complex code would go here
     * However, I am a comment
     */
    return n;
}

function bType1(n) {
    if (n > 0) {
        n = n * 1; //multiply by +1
    } else {
        n = n * -1; //multiply by -1
    }
    return n; //return the number
}

function aType2(n) {
    if (n > 0) {
        n = n * 1;
    } else {
        n = n * -1;
    }
    return n;
}

function bType2(m) {
    if (m > 0) {
        m = m * 1;
    } else {
        m = m * -1;
    }
    return m;
}

function aType3(n) {
    if (n > 0) {
        n = n * 1;
    } else {
        n = n * -1;
    }
    return n;
}

function bType3(n) {
    if (n > 0) {
        n = n * 1;
    } else {
        n = n * -1;
        let x = 5;
    }
    return n;
}

function aType4(n) {
    let j = 1;
    for (let i = 1; i <= n; i++) {
        j = j * i;
    }
    return j;
}

function bType4(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * bType4(n - 1);
    }
}