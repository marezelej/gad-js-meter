function sumWithFor(list) {
    let r = 0
    for (let i = 0; i < list.length; i++) {
        r += list[i]
    }
    return r
}

function sumWithFor2(list) {
    let sum = 0
    list.forEach((value) => sum += value)
    return sum
}