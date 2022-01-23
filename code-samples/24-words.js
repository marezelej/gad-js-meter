function words(string, pattern) {
    if (pattern === undefined) {
        const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string)
        return result || []
    }
    return string.match(pattern) || []
}

function words2(string, pattern) {
    if (!pattern) {
        if (hasUnicodeWord(string)) {
            const result = unicodeWords(string)
        } else {
            const result = asciiWords(string)
        }
        return result || []
    } else {
        return string.match(pattern) || []
    }
}