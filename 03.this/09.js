// 내부함수에서의 this
var obj1 = {
  outer: function () {
    console.log(this); // obj1
    var innerFunc = function () {
      console.log(this); // Window, innerMethod
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
  },
};

obj1.outer();
