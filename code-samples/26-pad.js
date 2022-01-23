function pad(string, length, chars) {
    const strLength = length ? stringSize(string) : 0
    if (!length || strLength >= length) {
        return (string || '')
    }
    const mid = (length - strLength) / 2
    return (
        createPadding(Math.floor(mid), chars) +
        string +
        createPadding(Math.ceil(mid), chars)
    )
}

function pad2(string, length, chars) {
    const strLength = length ? stringSize(string) : 0
    if (!length) {
        return (string || '')
    }
    if (strLength >= length) {
        return (string || '')
    }
    const mid = (length - strLength) / 2
    const strStart = createPadding(Math.floor(mid), chars)
    const strEnd = createPadding(Math.ceil(mid), chars)
    return (strStart + string + strEnd)
}