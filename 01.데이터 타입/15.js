// 예제 1 - 15 중첩된 객체에 대한 깊은 복사
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
user2.urls = copyObject(user.urls);

user.urls.portfolio = "https:proli.com";
console.log(user.urls.portfolio === user2.urls.portfolio);

user.urls.blog = "https:blog.com";
console.log(user.urls.blog === user2.urls.blog);
