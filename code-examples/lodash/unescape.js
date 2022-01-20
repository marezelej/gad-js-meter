function unescape(string) {
    return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
        : (string || '')
}