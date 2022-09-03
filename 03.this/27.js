var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };

    innerFunc.call(this);
    innerFunc();
  },
};

obj.outer();
