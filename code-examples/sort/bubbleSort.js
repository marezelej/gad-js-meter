function bubbleSortWithForLoop(inputArr) {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
        }
    }
    return inputArr;
}

function bubbleSortWithDoWhileLoopAndFlag(inputArr) {
    let len = inputArr.length;
    let checked;
    do {
        checked = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                checked = true;
            }
        }
    } while (checked);
    return inputArr;
}

const bubbleSort = (array)=>{
    let sorted = false;
    let counter =0;
    while(!sorted){
      sorted = true;  
      for(let i =0; i < array.length -1 -counter; i++){
  
        if(array[i] > array[i+1]){
          helper(i,i+1,array);        
          sorted = false;
        }
      } 
      counter++;
    }
    return array;
  
  }