function permutateWithoutRepetitions(options) {
    if (options.length === 1) {
      return [options];
    }
    const permutations = [];
    const smallerPermutations = permutateWithoutRepetitions(options.slice(1));
    const firstOption = options[0];
  
    let permIndex = 0;
    while (permIndex < smallerPermutations.length) {
      const smallerPermutation = smallerPermutations[permIndex];
  
      let posIndex = 0;
      while (posIndex <= smallerPermutation.length) {
        const permutationPrefix = smallerPermutation.slice(0, posIndex);
        const permutationSuffix = smallerPermutation.slice(posIndex);
        permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));

        posIndex++;
      }

      permIndex++;
    }
  
    return permutations;
  }