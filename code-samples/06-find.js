function find1(value, array) {
    const found = array.find(e => value === e)
    return found
}

function find2(value, array) {
    const founds = array.filter(e => value === e)
    return founds.lenght > 0 ? founds[0] : null
}