new Promise((resolve) => {
  setTimeout(() => {
    var name = "에스프레소";
    console.log(name);
    resolve(name);
  }, 500);
})
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        var name = prevName + ", 아메리카노";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        var name = prevName + ", 카페라떼";
        console.log(name);
        resolve(name);
      }, 500);
    });
  });