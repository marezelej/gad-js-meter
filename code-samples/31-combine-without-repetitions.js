function combineWithoutRepetitions(comboOptions, comboLength) {
    if (comboLength === 1) {
      return comboOptions.map((comboOption) => [comboOption]);
    }
  
    const combos = [];
    comboOptions.forEach((currentOption, optionIndex) => {
      const smallerCombos = combineWithoutRepetitions(
        comboOptions.slice(optionIndex + 1),
        comboLength - 1,
      );
  
      smallerCombos.forEach((smallerCombo) => {
        combos.push([currentOption].concat(smallerCombo));
      });
    });
  
    return combos;
  }

  function combineWithoutRepetitions(options, length) {
    if (length <= 1) {
      return options.map((comboOption) => [comboOption]);
    }
  
    const combinations = [];
    options.forEach((currentOption, optionIndex) => {
      const smallerCombos = combineWithoutRepetitions(
        options.slice(optionIndex + 1),
        length - 1,
      );
  
      smallerCombos.forEach((smallerCombo) => {
        combinations.push([currentOption].concat(smallerCombo));
      });
    });
  
    console.log(combinations);
    return combinations;
  }