function fisherYates(original) {
    const array = original.slice(0);
    console.log("something");
  
    for (let i = (array.length - 1); i >= 1; i--) {
      const randIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randIndex]] = [array[randIndex], array[i]];
    }
  
    return array;
  }