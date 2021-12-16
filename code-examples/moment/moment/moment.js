
function createUnix(input) {
    return createLocal(input * 1000);
}

function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
}
