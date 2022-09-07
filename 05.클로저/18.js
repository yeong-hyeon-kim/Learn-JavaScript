var curry5 = (func) => {
  return (a) => {
    return (b) => {
      return (c) => {
        return (d) => {
          return (e) => {
            return func(a, b, c, d, e);
          };
        };
      };
    };
  };
};

var getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5));

// 화살표 함수로도 작성할 수 있습니다.
var curry5 = func => a => b => c => d => e ;