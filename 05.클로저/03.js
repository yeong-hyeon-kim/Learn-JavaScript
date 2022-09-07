var outer = () => {
  var a = 1;
  var inner = () => {
    return ++a;
  };

  return inner;
};

var outer2 = outer();

console.log(outer2());
console.log(outer2());
