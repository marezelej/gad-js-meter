function unescape(string) {
    return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
        : (string || '')
}

function unescape2(string) {
    if (string && reHasEscapedHtml.test(string)) {
        return string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    } else {
        return (string || '')
    }
}