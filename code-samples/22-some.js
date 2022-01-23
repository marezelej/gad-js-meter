function some(array, predicate) {
    let index = -1
    const length = array == null ? 0 : array.length

    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true
        }
    }
    return false
}

function some2(array, predicate) {
    const length = array == null ? 0 : array.length

    for(let i = 0; i < length; i++) {
        if (predicate(array[i], i, array)) {
            return true
        }
    }

    return false
}