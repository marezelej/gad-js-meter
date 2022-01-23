function times(n, iteratee) {
    if (n < 1 || n > MAX_SAFE_INTEGER) {
        return []
    }
    let index = -1
    const length = Math.min(n, MAX_ARRAY_LENGTH)
    const result = new Array(length)
    while (++index < length) {
        result[index] = iteratee(index)
    }
    index = MAX_ARRAY_LENGTH
    n -= MAX_ARRAY_LENGTH
    while (++index < n) {
        iteratee(index)
    }
    return result
}

function times2(n, callback) {
    if (n < 1) {
        return []
    }
    if (n > MAX_SAFE_INTEGER) {
        return []
    }
    let index = -1
    const length = Math.min(n, MAX_ARRAY_LENGTH)
    const result = new Array(length)
    while (++index < length) {
        result[index] = callback(index)
    }
    index = MAX_ARRAY_LENGTH
    n -= MAX_ARRAY_LENGTH
    while (++index < n) {
        callback(index)
    }
    return result
}