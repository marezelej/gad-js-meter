function permutateWithoutRepetitions(permutationOptions) {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

  // Insert first option into every possible position of every smaller permutation.
  const firstOption = permutationOptions[0];

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex];

    // Insert first option into every possible position of smallerPermutation.
    for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
    }
  }

  return permutations;
}

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