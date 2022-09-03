var obj = {
  a: 1,
  b: {
    c: null,
    d: {
      func1: function () {
        console.log(3);
      },
    },
  },
  func2: function () {
    console.log(4);
  },
};

var copyObjectViaJSON = function (target) {
  return JSON.parse(JSON.stringify(target));
};

var obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1];

console.log(obj);
console.log(obj2);
