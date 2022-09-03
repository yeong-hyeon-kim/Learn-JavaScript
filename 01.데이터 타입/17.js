// 예제 1 - 17 깊은 복사 결과 확인
var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
  },
};

var copyObjectDeep = function (target) {
  var result = {};

  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
    result = target;
  }

  return result;
};

var obj2 = copyObjectDeep(obj);

obj2.a = 2;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj);
console.log(obj2);
