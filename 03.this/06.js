// 함수로서 호출, 메서드로서 호출

var func = function (x) {
  console.log(this, x);
};

func(1); // Window{}

var obj = {
  method: func,
};

obj.method(2); // {method: f}
