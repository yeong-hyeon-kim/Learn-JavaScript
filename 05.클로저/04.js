// return 없이도 클로저가 발생하는 다양한 경우
(() => {
  var a = 0;
  var intervalid = null;
  var inner = () => {
    if (++a >= 10) {
      clearInterval(intervalid);
    }
    console.log(a);
  };
  intervalid = setInterval(inner, 1000);
})();

// (() => {
//   var count = 0;
//   var button = document.createElement("button");
//   button.addEventListener("click", () => {
//     console.log(++count, "times clicked");
//   });
//   document.body.appendChild(button);
// })();
