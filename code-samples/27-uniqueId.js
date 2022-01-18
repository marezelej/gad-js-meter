function uniqueId(prefix = '$lodash$') {
    if (!idCounter[prefix]) {
        idCounter[prefix] = 0
    }

    const id = ++idCounter[prefix]
    if (prefix === '$lodash$') {
        return `${id}`
    }

    return `${prefix}${id}`
}

function uniqueId2(prefix = '$lodash$') {
    if (!idCounter[prefix]) {
        idCounter[prefix] = 0
    }
    idCounter[prefix]++
    const id = idCounter[prefix]
    if (prefix === '$lodash$') {
        return `${id}`
    } else {
        return `${prefix}${id}`
    }
}