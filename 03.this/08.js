// 메서드 내부에서의 this

var obj = {
  methodA: function () {
    console.log(this);
  },

  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};

obj.methodA(); // === obj
obj["methodA"](); // === obj

obj.inner.methodB(); // === obj.inner
obj.inner["methodB"](); // === obj.inner

obj["inner"].methodB(); // === obj.inner
obj["inner"]["methodB"](); // === obj.inner
