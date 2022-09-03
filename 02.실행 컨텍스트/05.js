// 함수 선언의 호이스팅(1) - 원본 코드
function a() {
  console.log(b);

  var b = "bbb";

  console.log(b);

  function b() {}

  console.log(b);
}

a();
