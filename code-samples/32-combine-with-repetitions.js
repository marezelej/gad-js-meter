function combineWithRepetitions(comboOptions, comboLength) {
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }
  
  const combos = [];
  comboOptions.forEach((currentOption, optionIndex) => {
    const smallerCombos = combineWithRepetitions(
      comboOptions.slice(optionIndex),
      comboLength - 1,
    );

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