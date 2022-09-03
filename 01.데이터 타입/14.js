// 예제 1 - 14 중첩된 객체에 대한 얕은 복사
var user = {
  name: "jaenam",
  urls: {
    portfolio: "https://portfolio.co.kr",
    blog: "htps://blog.log",
    facebook: "https://facebook.co.kr",
  },
};

var copyObject = function name(target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }

  return result;
};

var user2 = copyObject(user);

user.name = "jung";
console.log(user.name === user2.name);

user.urls.portfolio = "https:proli.com";
console.log(user.urls.portfolio === user2.urls.portfolio);

user.urls.blog = "https:blog.com";
console.log(user.urls.blog === user2.urls.blog);
