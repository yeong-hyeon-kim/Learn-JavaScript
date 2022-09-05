var obj = {
  values: [1, 2, 3],
  logValues: (v, i) => {
    console.log(this, v, i);
  },
};

// 메서드로 전달하므로 this를 출력하면 obj로 표시됩니다.
obj.logValues(1, 2);

// 콜백 함수로 객체의 메서드를 전달해도 함수로서 호출됩니다.
[4, 5, 6].forEach(obj.logValues);
