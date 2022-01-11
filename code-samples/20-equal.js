function eq(value, other) {
    return value === other || (value !== value && other !== other)
}

function eq2(value, other) {
    if (value === other) {
        return true
    }
    if (value !== value && other !== other) {
        return true
    }
    return false
}