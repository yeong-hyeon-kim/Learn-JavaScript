// 예제 1 - 12 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얇은 복사)
var user = {
  name: "Jeenam",
  gender: "male",
};

var copyObject = function name(target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }

  return result;
};

var user2 = copyObject(user);
user2.name = "jung";

if (user !== user2) {
  console.log("유저 정보가 변경되었습니다.");
}

console.log(user.name, user2.name);
console.log(user === user2);
