function factorialRecursive(num) {
    if (num < 0)
        return -1;
    else if (num === 0)
        return 1;
    else {
        return (num * factorialRecursive(num - 1));
    }
}