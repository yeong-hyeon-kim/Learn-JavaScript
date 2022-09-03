// 메서드로서 호출 - 점 표기법, 대괄호 표기법

var obj = {
  method: function (x) {
    console.log(this, x);
  },
};

obj.method(1); //{method: f} 1
obj["method"](2); //{method: f} 2
