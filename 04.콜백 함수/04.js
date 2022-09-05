var newArr = [10, 20, 30].map((index, currentValue) => {
    console.log(index, currentValue);
    return currentValue + 5;
  });
  
  console.log(newArr);
  