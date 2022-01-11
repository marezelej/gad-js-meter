function jumpSearch(sortedArray, seekElement, comparatorCallback) {
    const comparator = new Comparator(comparatorCallback);
    const arraySize = sortedArray.length;

    if (arraySize > 0) {
        const jumpSize = Math.floor(Math.sqrt(arraySize));

        let blockStart = 0;
        let blockEnd = jumpSize;
        while (comparator.greaterThan(seekElement, sortedArray[Math.min(blockEnd, arraySize) - 1])) {
            blockStart = blockEnd;
            blockEnd += jumpSize;

            if (blockStart > arraySize) {
                return -1;
            }
        }

        for (let currentIndex = blockStart; currentIndex < Math.min(blockEnd, arraySize); currentIndex++) {
            if (comparator.equal(sortedArray[currentIndex], seekElement)) {
                return currentIndex;
            }
        }
    }

    return -1;
}