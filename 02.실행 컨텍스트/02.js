//매계변수와 변수에 대한 호이스팅(1) - 원본코드

function a(x) {
  console.log(x);

  var x;

  console.log(x);

  var x = 2;

  console.log(x);
}

a(1);
