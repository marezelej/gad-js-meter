function linearSearch(array, seekElement, comparatorCallback) {
    const comparator = new Comparator(comparatorCallback);

    array.forEach((element, index) => {
        if (comparator.equal(element, seekElement)) {
            return index;
        }
    });
}