# 05.클로저

* 함수형 프로그래밍 언어에서 등장하는 보편적인 특성입니다.
* 지역변수를 참조하는 내부함수를 외부에 전달하는 것을 클로저라 합니다.

## 클로저와 메모리 관리

* 클로저는 객체지향과 함수형 모두를 아우르는 매우 중요한 개념입니다.
* 클로저는 메모리 누수의 위험 우려가 있어 메모리 관리가 필요합니다.

```javascript

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
```

## 클로저 활용 사례

### 5-3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

* 이벤트 리스너

```javascript

var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

fruits.forEach((fruit) => {
  var $li = document.createElement("li");
  $ul.innerText = fruit;
  $li.addEventListener("click", () => {
    alert("your choice is " + fruit);
  });

  $ul.appendChild($li);
});

document.body.appendChild($ul);

```

### 5-3-2 접근 권한 제어(정보 은닉)

* 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈 간의 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념입니다.

* 자바스크립는 기본적으로 접근 권한을 부여하도록 설계되어있지 않습니다.

* 클로저를 이용해 구분하는 것은 가능합니다.

* 함수에서 지역변수 및 내부함수 등을 생성합니다.
* 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터(대상이 여럿일 때는 객체 또는 배열, 하나일 때는 함수)를 retrun합니다.
  * return 한 변수들은 공개 멤버가 되고, 그렇지 않은 변수들은 비공개 멤버가 됩니다.

### 5-3-3 부분 적용 함수

* n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에(n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수입니다.

### 5-3-4 커링 함수

* 커링 함수란?
  * 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것을 말합니다.
  * 한 번에 하나의 인자만 전달하는 것을 원칙으로 합니다.
  * 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기만 할 뿐으로, 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않습니다.
