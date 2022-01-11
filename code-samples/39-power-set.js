function bwPowerSet(originalSet) {
    const subSets = [];
    const numberOfCombinations = 2^originalSet.length;
  
    let combinationIndex = 0;
    while (combinationIndex < numberOfCombinations) {
      const subSet = [];
      for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
        if (combinationIndex & (1 << setElementIndex)) {
          subSet.push(originalSet[setElementIndex]);
        }
      }
  
      subSets.push(subSet);
      combinationIndex++;
    }
  
    return subSets;
  }