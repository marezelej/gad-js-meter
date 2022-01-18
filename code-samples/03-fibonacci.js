function fibonacciRecursive(n) {
    return n < 1 ? 0
        : n <= 2 ? 1
            : fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}

function fib(n) {
    let phi = (1 + Math.sqrt(5))/2;
    let asymp = Math.pow(phi, n) / Math.sqrt(5);

    return Math.round(asymp);
}