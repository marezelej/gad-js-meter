
function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return Object.getOwnPropertyNames(obj).length === 0;
    } else {
        var k;
        for (k in obj) {
            if (hasOwnProp(obj, k)) {
                return false;
            }
        }
        return true;
    }
}
