//함수 선언의 호이스팅(2) - 호이스팅을 마친 상태

function a() {
  var b;
  function b() {}

  console.log(b);

  b = "bbb";

  console.log(b);
  console.log(b);
}

a();
