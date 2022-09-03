// 매계변수와 변수에 대한 호이스팅 (2) - 매개변수를 변수 선언/ 할당과 같다고 간주하여 변환한 상태
function a(x) {
  var x;
  var x;
  var x;

  x = 1;

  console.log(x);
  console.log(x);

  x = 2;

  console.log(x);
}

a();
