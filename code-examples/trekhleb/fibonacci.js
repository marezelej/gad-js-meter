function fibonacci(n) {
    const fibSequence = [1];

    let currentValue = 1;
    let previousValue = 0;

    if (n === 1) {
        return fibSequence;
    }

    let iterationsCounter = n - 1;

    while (iterationsCounter) {
        currentValue += previousValue;
        previousValue = currentValue - previousValue;

        fibSequence.push(currentValue);

        iterationsCounter -= 1;
    }

    return fibSequence;
}

function fibonacciNth(n) {
    let currentValue = 1;
    let previousValue = 0;

    if (n === 1) {
        return 1;
    }

    let iterationsCounter = n - 1;

    while (iterationsCounter) {
        currentValue += previousValue;
        previousValue = currentValue - previousValue;

        iterationsCounter -= 1;
    }

    return currentValue;
}

function fibonacciRecursive(n) {
    return n < 1 ? 0
        : n <= 2 ? 1
            : fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}