function combineWithoutRepetitions(comboOptions, comboLength) {
    // If the length of the combination is 1 then each element of the original array
    // is a combination itself.
    if (comboLength === 1) {
        return comboOptions.map((comboOption) => [comboOption]);
    }

    // Init combinations array.
    const combos = [];

    // Extract characters one by one and concatenate them to combinations of smaller lengths.
    // We need to extract them because we don't want to have repetitions after concatenation.
    comboOptions.forEach((currentOption, optionIndex) => {
        // Generate combinations of smaller size.
        const smallerCombos = combineWithoutRepetitions(
            comboOptions.slice(optionIndex + 1),
            comboLength - 1,
        );

        // Concatenate currentOption with all combinations of smaller size.
        smallerCombos.forEach((smallerCombo) => {
            combos.push([currentOption].concat(smallerCombo));
        });
    });

    return combos;
}

function combineWithoutRepetitions2(options, length) {
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