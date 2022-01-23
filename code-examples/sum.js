function sumWithWile(list) {
    let r = 0
    let i = 0
    while (i < list.length) {
        r += list[i]
        i++
    }
    return r
}

function sumWithFor(list) {
    let r = 0
    for (let i = 0; i < list.length; i++) {
        r += list[i]
    }
    return r
}

function sumWithReduce(list) {
    return list.reduce((c, e) => c + e, 0)
}