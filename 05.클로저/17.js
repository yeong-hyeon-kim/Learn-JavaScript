var curry3 = (func) => {
  return (a) => {
    return (b) => {
      return func(a, b);
    };
  };
};

var getMaxMin10 = curry3(Math.max)(10);
console.log(getMaxMin10(8));
console.log(getMaxMin10(25));

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8));
console.log(getMinWith10(25))