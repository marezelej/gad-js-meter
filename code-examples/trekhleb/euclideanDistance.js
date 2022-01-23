function euclideanDistanceWithReduce(a, b) {
    return a
            .map((x, i) => Math.abs(x - b[i]) ** 2) // square the difference
            .reduce((sum, now) => sum + now) // sum
        ** (1 / 2)
}

function euclideanDistanceWithMath(a, b) {
    return Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));
}