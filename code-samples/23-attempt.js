function attempt(func, ...args) {
    try {
        return func(...args)
    } catch (e) {
        return isError(e) ? e : new Error(e)
    }
}

function attempt2(func, ...args) {
    try {
        // The result of the attempt
        const result = func(...args)
        return result
    } catch (e) {
        if (isError(e)) {
            return e
        }
        return new Error(e)
    }
}