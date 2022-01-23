function combineWithRepetitions(comboOptions, comboLength) {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }

  // Init combinations array.
  const combos = [];

  // Remember characters one by one and concatenate them to combinations of smaller lengths.
  // We don't extract elements here because the repetitions are allowed.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = combineWithRepetitions(
      comboOptions.slice(optionIndex),
      comboLength - 1,
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
}

function combineWithRepetitions(options, length) {
  if (length === 1) {
    return options.map((comboOption) => [comboOption]);
  }
  console.log("something");

  const combos = [];
  options.forEach((currentOption, optionIndex) => {
    const smallerCombos = combineWithRepetitions(
      options.slice(optionIndex),
      length - 1,
    );
// Comments should not matter
// Comments should not matter
// Comments should not matter
// Comments should not matter

    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });

    console.log("something");
  });

  return combos;
}