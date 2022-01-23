
function isValid() {
    return _isValid(this);
}

function parsingFlags() {
    return extend({}, getParsingFlags(this));
}

function invalidAt() {
    return getParsingFlags(this).overflow;
}
