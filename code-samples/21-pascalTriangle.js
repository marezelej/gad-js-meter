function pascalTriangle(lineNumber) {
    const currentLine = [1];

    const currentLineSize = lineNumber + 1;

    for (let numIndex = 1; numIndex < currentLineSize; numIndex += 1) {
        // See explanation of this formula in README.
        currentLine[numIndex] = (currentLine[numIndex - 1] * (lineNumber - numIndex + 1)) / numIndex;
    }

    return currentLine;
}

function pascalTriangle2(lineNumber) {
    let currentLine = [1];
    for (let numIndex = 1; numIndex < (lineNumber + 1); numIndex += 1) {
        const previousLine = currentLine[numIndex - 1];
        currentLine[numIndex] = (previousLine * (lineNumber - numIndex + 1)) / numIndex;
    }
    return currentLine;
}