// 예제 1-11 객체의 가변성에 따른 문제점의 해결 방법
var user = {
  name: "Jeenam",
  gender: "male",
};

var changeName = function name(user, newName) {
  return {
    name: newName,
    gender: user,
  };
};

var user2 = changeName(user, "jung");

if (user !== user2) {
  console.log("유저 정보가 변경되었습니다.");
}

console.log(user.name, user2.name);
console.log(user === user2);
