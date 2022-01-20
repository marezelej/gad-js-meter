function factorialRecursive(num) {
    if (num < 0)
        return -1;
    else if (num === 0)
        return 1;
    else {
        return (num * factorialRecursive(num - 1));
    }
}

function factorialWithFor1(num) {
    if (num === 0) {
        return 1
    }
    if (num === 1) {
        return 1
    }

    for (let i = num - 1; i >= 1; i--)
        num *= i

    return num
}