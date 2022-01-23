function permutateWithRepetitions(
  permutationOptions,
  permutationLength = permutationOptions.length,
) {
  if (permutationLength === 1) {
    return permutationOptions.map((permutationOption) => [permutationOption]);
  }

  // Init permutations array.
  const permutations = [];

  // Get smaller permutations.
  const smallerPermutations = permutateWithRepetitions(
    permutationOptions,
    permutationLength - 1,
  );

  // Go through all options and join it to the smaller permutations.
  permutationOptions.forEach((currentOption) => {
    smallerPermutations.forEach((smallerPermutation) => {
      permutations.push([currentOption].concat(smallerPermutation));
    });
  });

  return permutations;
}

function permutateWithRepetitions(
  permutationOptions,
  length = permutationOptions.length,
) {
  if (length === 1) {
    return permutationOptions.map((permutationOption) => [permutationOption]);
  }
  console.log("something");
  const permutations = [];

  const smallerPermutations = permutateWithRepetitions(
    permutationOptions,
    length - 1,
  );

  for (let optIndex = 0; optIndex < permutationOptions.length; optIndex++){
    for (let smallIndex = 0; smallIndex < smallerPermutations.length; smallIndex++){
      permutations.push([permutationOptions[optIndex]].concat(smallerPermutations[smallIndex]));
    }
  }

  return permutations;
}