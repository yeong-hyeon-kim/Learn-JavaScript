// this를 바인딩하지 않는 함수(화살표 함수)
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };

    innerFunc();
  },
};

obj.outer();
