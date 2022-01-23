function factorialRecursive(num) {
    if (num < 0)
        return -1;
    else if (num === 0)
        return 1;
    else {
        return (num * factorialRecursive(num - 1));
    }
}

function factorialWithWhile(num) {
    let result = num;
    if (num === 0 || num === 1)
        return 1;
    while (num > 1) {
        num--;
        result *= num;
    }
    return result;
}