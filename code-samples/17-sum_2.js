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