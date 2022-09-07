# 04.콜백 함수

* 콜백 함수란?
  * 다른 코드의 인자로 넘겨주는 함수입니다.
  * 다른 코드(함수, 메서드)에게 넘겨줌으로써 그 제어권도 함께 위임한 함수입니다.
  * 특정 조건 시 실행하여 나한테 알려주는 역할 입니다.

## 4-2-1 호출 시점

* 콜백 함수의 제어권을 넘겨받은 코드는 인자로 넘겨진 값들을 어떤 순서로 넘길 것인지 제어할 수 있습니다.

```javascript
var count = 0;
var cbFunc = () => {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};

var timer = setInterval(cbFunc, 300);
```

## 4-2-2 인자

```javascript
var newArr = [10, 20, 30].map((currentValue, index) => {
  console.log(currentValue, index);
  return currentValue + 5;
});

console.log(newArr);

```

```javascript
var newArr = [10, 20, 30].map((index, currentValue) => {
    console.log(index, currentValue);
    return currentValue + 5;
  });
  
  console.log(newArr);
```

## 4-2-3 this

* 콜백 함수 this는 기본적으로 전역 객체를 참조하지만 this가 될 대상을 지정한 경우에는 그 대상을 참조합니다.

```javascript
setTimeout(() => {
  console.log(this);
}, 300);

[1, 2, 3, 4, 5].forEach((x) => {
  console.log(this);
});

document.body.innerHTML += "<button id='a'>클릭</button>";
document.body.querySelector("a").addEventListener("click", (e) => {
  console.log(this, e);
});

```

## 콜백 함수는 함수다

콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출됩니다.

```javascript
var obj = {
  values: [1, 2, 3],
  logValues: (v, i) => {
    console.log(this, v, i);
  },
};

// 메서드로 전달하므로 this를 출력하면 obj로 표시됩니다.
obj.logValues(1, 2);

// 콜백 함수로 객체의 메서드를 전달해도 함수로서 호출됩니다.
[4, 5, 6].forEach(obj.logValues);
```

## 콜백 지옥과 비동기 제어

* 콜백 지옥이란?
  * 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상입니다.

  ```javascript
  setTimeout(
    (name) => {
      var coffeeList = name;
      console.log(coffeeList);
      setTimeout(
        (name) => {
          coffeeList += ", " + name;
          console.log(coffeeList);
          setTimeout(
            (name) => {
              coffeeList += ", " + name;
              console.log(coffeeList);
              setTimeout(
                (name) => {
                  coffeeList += ", " + name;
                  console.log(coffeeList);
                },
                500,
                "카페라떼"
              );
            },
            500,
            "카페모카"
          );
        },
        500,
        "아메리카노"
      );
    },
    500,
    "에스프레소"
  );

  ```

* 동기
  * 동기적인 코드는 현재 실행 중인 코드가 완료된 후 다음 코드를 실행하는 방식입니다.
  * CPU의 계산에 의해 즉시 처리가 가능한 대부분의 코드는 동기적인 코드입니다.
  * 계산식이 복잡해서 CPU가 계산하는 데 시간이 많이 필요한 경우라 하더라도 이는 동기적인 코드입니다.

* 비동기
  * 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어던 함수의 실행을 보류한다거나, 사용자의 직접적인 개입이 있을 때  어떤 함수를 실행도록 대기하거나 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그 에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기하는 등 __별도의 요청, 실행 대기 , 보류등__ 관련 코드 비동기적 코드입니다.

```javascript
var addCoffee = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 500);
  });
};

var coffeeMaker = async () => {
  var coffeeList = "";
  var _addCoffee = async (name) => {
    coffeeList += (coffeeList ? "," : "") + (await addCoffee(name));
  };

  await _addCoffee("에스프레소");
  console.log(coffeeList);

  await _addCoffee("아메리카노");
  console.log(coffeeList);

  await _addCoffee("카페모카");
  console.log(coffeeList);

  await _addCoffee("카페라떼");
  console.log(coffeeList);
};

coffeeMaker();

```

## 정리

* 콜백 함수는 다른 코드에 인자로 넘겨줌으로써 그 제어구너도 함께 위임한 함수입니다.
* 제어권을 넘겨받은 코드는 다음과 같은 제어권을 가집니다.
  * 콜백 함수를 호출하는 시점을 스스로 판단해서 실행합니다.
  * 콜백 함수를 호출할때 인자로 넘겨줄 값들 및 그 순서가 정해져 있습니다. 이 순서를 따르지 않고 코드를 작성하면 엉둥한 결과를 얻게 됩니다.
  * 콜백 함수의 this가 무엇을 바라보도록 할지 정해져 있는 경우도 있습니다. 정하지 않는 경우에는 전역객체를 바라봅니다. 사용자 임의로 this를 바꾸고 싶은 경우 bind 메소드를 활용하면 됩니다.

