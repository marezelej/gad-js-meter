function product(a, exp) {
    let total = 1;
    for (let i = 0; i < exp; i++) {
        total = total * a;
    }

    return total;
}