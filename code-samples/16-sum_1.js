function sumWithWile(list) {
    let r = 0
    let i = 0
    while (i < list.length) {
        r += list[i]
        i++
    }
    return r
}

function sumWithWile2(list) {
    let sum = 0
    let index = 0
    while (index < list.length) {
        sum += list[index]
        index++
    }
    return sum
}