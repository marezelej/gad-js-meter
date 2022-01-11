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