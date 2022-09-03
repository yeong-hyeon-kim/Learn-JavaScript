// 내부함수에서의 this를 우회하는 방법
var obj = {
  outer: function () {
    console.log(this); // outer
    var innerFunc1 = function () {
      console.log(this); // window
    };

    innerFunc1();

    var self = this;
    var innerFunc2 = function () {
      console.log(self); // outer
    };

    innerFunc2();
  },
};

obj.outer();
