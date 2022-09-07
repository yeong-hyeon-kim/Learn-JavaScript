// 클로저의 메모리 관리
// return에 의한 클로저의 메모리 해제 - 1

var outer = () => {
  var a = 1;
  var inner = () => {
    return ++a;
  };
  return inner;
};

console.log(outer());
console.log(outer());

outer = null;

// setInterval에 의한 클로저의 메모리 해제 - 2
(() => {
  var a = 0;
  var IntervalId = null;
  var inner = () => {
    if (++a >= 10) {
      // Inner 식별자의 함수 참조를 끊음.
      inner = null;
    }
    console.log(a);
  };
  IntervalId = setInterval(inner, 1000);
})();

// eventListener에 의한 클로저의 메모리 해제 - 3
(() => {
  var count = 0;
  var button = document.createElement("button");
  button.innerText = "click";

  var clickHandler = () => {
    console.log(++count, "times clicked");

    if (count >= 10) {
      button.removeEventListener("click", clickHandler);
      // clickHandler 식별자의 함수 참조를 끊음.
      clickHandler = null;
    }
  };

  button.addEventListener("click", clickHandler);
  document.body.appendChild(button);
})();
