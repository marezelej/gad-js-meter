function eq(value, other) {
    return value === other || (value !== value && other !== other)
}

function eq2(value, other) {
    const c1 = value === other
    const c2 = (value !== value && other !== other)
    return c1 || c2
}