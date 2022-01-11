function btPowerSetRecursive(originalSet, allSubsets = [[]], currentSubSet = [], startAt = 0) {
    let position = startAt;
    while (position < originalSet.length) {
      currentSubSet.push(originalSet[position]);
      allSubsets.push([...currentSubSet]);
      btPowerSetRecursive(originalSet, allSubsets, currentSubSet, position + 1);
      currentSubSet.pop();

      position++
    }
    
    return allSubsets;
  }