// 스코프 체인

var a = 1;

var outer = function () {
  var inner = function () {
    console.log(a);
    var a = 3;
  };

  inner();
  console.log(a);
};

outer();
console.log(a);
