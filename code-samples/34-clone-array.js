function cloneArray(original) {
    const newArray = [];
    let i = 0;
    while (i < original.length) {
        newArray.push(original[i]);
        i++;
    }
  
    return newArray;
  }