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