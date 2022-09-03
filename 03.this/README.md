# 03.this

자바스크립트에서 가장 혼란스러운 개념

일반적인 this는 클래스로 생성한 인스턴스 객체를 의미. **클래스에서만 사용 가능**

자바스크립트에서 this는 어디서든 사용이 가능하고 상황에 따라 this가 바라보는 대상이 달라진다.

## 상황에 따라 달라지는 this

실행 컨텍스가 생성될 때 함께 결정 실행 컨텍스트는 함수를 호출할 때 생성되므로 **함수를 호출할 때 결정된다.**

## 전역 공간에서의 this

전역 객체는 자바스크립트 런타임 환경에 따라 다른 이름과 정보를 가지고 있다.

```JavaScript
// 전역 공간에서의 this
console.log(this);
// Node.js 환경
console.log(global);
// 브라우저 환경
console.log(window);

console.log(this === global);
console.log(this === window);
```

```JavaScript
// 전역변수와 전역객체(1)
var a = 1;

console.log(a);
console.log(window.a);
console.log(this.a);
```

전역공간에서 선언한 변수 a에 할당하면 windows와 this 모두 1이 출력됩니다.전역공간에서의 this는 전역객체를 의미하므로 두 값이 같은 값을 출력하는 것은 당연하지만 그 값이 1인 것이 의아합니다.

**자바스크립의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작**

* 사용자가 var 연산자를 이용해 변수를 선언하더라도 실제 자바스크립트 엔진은 **어떤 특정 객체**의 **프로퍼티로** 인식
* 특정객체?
  * 실행 컨텍스트의 LexicalEnvironment
  * 실행 컨텍스트는 변수를 수집해서 L.E의 프로퍼티로 저장. 이후 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 그대로 참조.

**전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.**

window.a, this.a 나오는 이유는 위 내용으로 설명 가능.
a를 직접 호출 할 경우에도 1이 나오는 이유.

변수 a에 접근하고자 하면 스코프 체인에서 a를 검색하다가 가장 마지막에 도달하는 전역 스코프의 L.E 즉 전역객체에서 해당 프로퍼티 a를 발견해서 그 값을 반환합니다.

* 단순하게 window.가 생략된 것이라고 여겨도 무방합니다.

var로 변수를 선언하는 대신 window의 프로퍼티에 직접 할당하더라도 결과적으로 var로 선언한 것과 똑같이 동작할 것이라는 예상할 수 있습니다.

```JavaScript
// 전역변수와 전역객체(2)
var a = 1;

window.b = 2;
console.log(a, window.a, this.a)
console.log(b, window.b, this.b)

window.a = 3;
b = 4;

console.log(a, window.a, this.a)
console.log(b, window.b, this.b)
```

삭제 명령에 대해서는 차이가 있습니다.

```JavaScript
// 전역변수와 전역객체(3)
var a = 1;

delete window. a;
console.log(a, window.a, this.a);

var b = 2;
console.log(b, window.b, this.b);

window.c = 3;
delete window.c;
console.log(c, window.c, this.c);

window.d = 4;
delete d;
console.log(d, window.d, this.d);

```

* 전역 객체의 프로퍼티로 할당한 경우 삭제가 되는 반면 전역 변수로 선언한 경우 삭제가 되지 않습니다.
* 사용자가 의도치 않게 삭제하는 것을 방지하는 차원에서 마련한 방어 전략.
* 전역 변수를 선언하면 자바스크립트 엔진이 이를 자동으로 전역 객체의 프로퍼티로 할당하면서 추가적으로 해당 프로퍼티의 `configurable` 속성(변경 및 삭제 가능성) `false`로 정의하는 것입니다.

### 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this

#### 함수?

* 그 자체로 독립적인 기능을 수행

#### 메서드?

* 자신을 호출한 대상 객체에 대한 동작 수행

```javascript
// 함수로서 호출, 메서드로서 호출

var func = function (x){
    console.log(this, x);
};

func(1);    // Window{}

var obj = {
    method: func
};

obj.method(2);  // {method: f}


```

* 함수로서 호출과 메서드로서 호출 구분

``` javascript
// 메서드로서 호출 - 점 표기법, 대괄호 표기법

var obj = {
    method: function (x){
        console.log(this,x);
    }
};

obj.method(1); //{method: f} 1
obj['method'](2); //{method: f} 2
```

* 점 표기법이든 대괄호 표기법이든, 어떤 함수를 호출할 때 그 함수 이름(프로퍼티 명) 앞에 객체가 명시돼 있는 경우에는 메서드로 호출한 것이고, 그렇지 않은 모든 경우에는 함수로 호출한 것입니다.

#### 메서드 내부에서의 this

this에슨 호출한 주체에 대한 정보가 담깁니다. 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체입니다. 점 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 this가 되는 것 입니다.

``` javascript
// 메서드 내부에서의 this

var obj = {
    methodA: function () {
        console.log(this);
    },

    inner:{
        methodB: function (){
            console.log(this);
        }
    }
};

obj.methodA(); // === obj
obj["methodA"](); // === obj

obj.inner.methodB(); // === obj.inner
obj.inner["methodB"](); // === obj.inner

obj["inner"].methodB(); // === obj.inner
obj["inner"]["methodB"](); // === obj.inner
```

## 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this

어떤 함수를 함소로서 호출할 경우 `this`가 지정되지 않습니다. this에는 호출한 주체에 대한 정보가 담긴다고 했습니다. 그런데 함수로서 호출하는 것은 호출 주체(객체지향 언어에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없는 것입니다.

실행 컨텍스트를 활성화할 당시에 `this`가 지정되지 않은 경우 `this`는 전역 객체를 바라 본다고 했습니다. 따라서 함수에서의 this는 전역 객체를 가리킵니다.

### 메서드이 내부함수에서의 this

메서드 내부에서 정의하고 실행한 함수에서의  this는 자바스크립트 초심자 들이 this에 관해 가장 자주 혼락을 느끼는 지점 중 하나 입니다. 앞서 소개한 '설계상의 오류'로 인해 실제 동작과 다르게 예측하곤 합니다.

내부함수 역시 이를 함소로서 호출했는지 메서드로서 호출했는지만 파악하면 `this`의 값을 정확히 맞출 수 있습니다.

### 메서드의 내부 함수에서의 this를 우회하는 방법

호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 사용할 수 있을까?

```javascript
var obj ={
    outer: function (){
        console.log(this); // outer
        var innerFunc1 = function(){
            console.log(this); // window
        };

        innerFunc1();

        var self = this;
        var innerFunc2 = function(){
            console.log(self); // outer
        };

        innerFunc2();

    }
};

obj.outer();
```

### this를 바인딩하지 않는 함수

함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자 this를 바인딩하지 않는 화살표(arrow function)를 새로 도입했습니다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있습니다.

```javascript
var obj = {
    outer: function(){
        console.log(this);
        var innerFunc = () => {
            console.log(this);
        };

        innerFunc();
    }
};

obj.outer();
```

## 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수 : 함수 A의 제어권을 다른 함수, 메서드 B에게 넘겨주는 경우 함수 A를 콜백 함수

## 3-1-5 생성자 함수 내부에서의 this

생성자 함수 : 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수.
객체지향에서 생성자를 클래스, 클래스를 통해 만든 객체를 인스턴스

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했습니다. new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작. 어떤 함수가 생성자 함소로서 호출된 경우 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신이 됩니다.
생성자 함수를 호출(new 명령어와 함께 함수를 호출)하면 우선 생성자의 prototype 프로퍼티를 참조하는 __proto__라는 프로퍼티가 있는 객체(인스턴스)를 만들고 미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여합니다.

## 명시적으로 this를 바인딩하는 방법

### 3-2-1 call 메서드

Call 메서드는 메서드의 호출 주체인 함수를 즉시 실행핟록 하는 명령. 이때 Call 메서드의 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 한다. 함수를 그냥 실행하면 this는 전역객체를 참조하지만 call 메서드를 이용하면 임의 객체르르 this로 지정할 수 있습니다.

```javascript

var func = function (a, b, c){
    console.log(this, a, b, c)
};

func(1 , 2 ,3 );
func.call({x:1}, 4, 5, 6);

```

메서드에 대해서도 마찬가지로 객체의 메서드를 그냥 호출하면  this 는 객체를 참조하지만 call 메서드를 이용하면 임의의 객체를 this로 지정할 수 있습니다.

```javascript

var obj ={
    a:1,
    method: (x, y) =>{
        console.log(this, a, x, y);
    }
};

obj.method(2,3);
obj.method.call({a:4},5,6)

```

### 3-2-2 apply 메서드

apply 메서드는 call 기능적으로 완전히 동일하다. call 메서드는 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하는 반면, apply 메서드는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 차이가 있습니다.

```javascript
var func = (a, b, c) => {
  console.log(this, a, b, c);
};

func.apply({ x: 1 }, [4, 5, 6]);

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method.apply({ a: 4 }, [5, 6]);

```

### 3-2-3 call / apply 메서드의 활용

```javascript
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

Array.prototype.push.call(obj, "d");
console.log(obj);

var arr = Array.prototype.slice.call(obj);
console.log(arr);

```

객체에는 배열 메서드를 직접 적용할 수 없습니다. 그러나 키가 `0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티의 값이 0 또는 양의 정수인 객체 즉 별열의 구조와 유사한 객체(유사배열객체)`의 경우 call, apply 메서드를 이용해 배열 메서드를 차용할 수 있습니다.

7번째 줄에서는 배열 메서드인 push를 객체 obj에 적용해 프로퍼티 3에 'd'를 추가했습니다. 9번째 줄에서는 slice 메서드를 적용해 객체를 배열로 전환했습니다. slice 메서드는 원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞 부분까지의 배열 요소를 추출하는 메서드인데, 매개변수를 아무것도 넘기지 않을 경에는 그냥 원본 배열의 얕은 복사본을 반환합니다. 그러니까 call 메서드를 이용해 원본인 유사배열객체의  얕은 복사를 수행한 것인데, slice 메서드가 배열 메서드이기 때문에  복사본은 배열로 반환.

함수 내부에서 접근할 수 있는 arguments  객체도 유사배열객체이므로 위의 방법으로 배열로 전환해서 활용할 수 있습니다. querySelectorAll, getElementsByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지 입니다.

```javascript
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.array.forEach((arg) => {
    console.log(arg);
  });
}

a(1, 2, 3);

document.body.innerHTML = "<div>a</div><div>b</div><div>c</div>";

var nodeList = document.querySelectorAll("div");
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.array.forEach((node) => {
  console.log(node);
});
```

그 밖에도 유사배열객체에는 call/apply 메서드를 이용해 모든 배열 메서드르르 적용할 수 있습니다. 배열처럼 인덱스와 length 프로퍼티를 지니는 문자열에 대해서도 마찬가지입니다. 단 문자열의 경우 length 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드는 에러를 던지며, concat 처럼  대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로 된 결과를 얻을 수 없습니다.

```javascript
var str = "abc";

// Uncaught TypeError TypeError: Cannot assign to read only property 'length' of object '[object String]'
Array.prototype.push.call(str, "pushed string");

Array.prototype.concat.call(str, "string");
Array.prototype.every.call(str, function (c) {
  return char !== " ";
});
Array.prototype.some.call(str, function (c) {
  return char === " ";
});

var newArr = Array.prototype.map.call(str, function (c) {
  return char + "!";
});

var newStr = Array.prototype.map.call(
  str,    
  function (c) {
    return char + char + i;
  },
  ""
);
console.log(newArr);

var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
]);

console.log(newStr);


```

Call, Apply를 이용해 형변환하는 것은  'this'를 원하는 값으로 지정해서 호출한다 라는 본래의 메서드의 의도와는 다소 동떨어진 활용법 입니다.
slice 메서드는 오직 배열의  형태록 복사하기 위해 차용됐을 뿐 경험을 통해 숨은 뜻을 알고 있는 사람이 아닌 한 코드만 봐서는 어떤 의도인지 파악하기 쉽지 않습니다.
이에 ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from 메서드를 새로 도입했습니다.

```javascript
// 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

var arr = Array.from(obj);

console.log(arr);

```

### 생성자 내부에서 다른 생성자 호출

생성자 내부에 다른 생성자의 공통된 내용이 있을 경우 call 도는 apply를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있습니다.
다음 예제에서는 Student, Employee 생성자 함수 내부에서 Person 생성자 함수를 호출해서 인스턴스의 속성을 정의하도록 구현했다.

```javascript

function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}

var by = new Student("보윤", "F", "한양대");
var jy = new Employee("재윤", "M", "삼성");

console.log(by, jy, Person);

```

### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용

여러 개의 인수를 받는 메서드에게 하나의 배열로 인수들을 전달하고 싶을 때 apply 메소드를 사용하면 좋습니다. 예를 들어, 배열에서 최대, 최솟값을 구해야 할 경우 apply를 사용하지 않는다면 부득이하게 다음과 같은 방식으로 직접 구현할 수 밖에 없을 것입니다.

```javascript
var numbers = [10, 20, 3, 16, 45];
var max = (min = numbers[0]);

numbers.forEach((number) => {
  if (number > max) {
    max = number;
  }

  if (number < min) {
    min = number;
  }
});

console.log(max, min);
```

apply를 적용하면 훨씬 간단해집니다.

```javascript
var numbers = [10, 20, 3, 16, 45];

var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

console.log(max, min);

```

펼치기 연산자를 이용하면 더욱 간편하게 작성할 수 있습니다.

```javascript

const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log(max, min);

```

### 3-2-4 bind 메서드

``` javascript

Function.property.bind(thisArg[,arg1[,arg2]])

```

bind 메서드는 ES5에서 추가된 기능으로 call과 빗슷하지만 즉시 호출하지는 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드 입니다. 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록됩니다. 즉 bind 메서드는 함수에 this를 미리 적용하는 거소가 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닙니다.

### name 프로퍼티

bind 메서드를 적용해서 새로 만든 함수는 한 가지 독특한 성질이 있습니다. 바로 name 프로퍼티에 bind의 수동태dls bound라는 접두어가 붙는다는 점입니다. 어떤 함수의 name 프로퍼티가 bound xxx라면 이는 곧 함수명이 xxx인 원본 함수에 bind 메서드를 적용한 새로운 함수라는 의미가 되므로 기존 call이나 apply보다 코드를 추적학에 더 수월해진 면이 있습니다.

```javascript
var func = function(a,b,c,d){
    console.log(this, a,b,c,d);
}

var bindFunc = func.bind({x:1}, 4, 5);

console.log(func.name)
console.log(bindFunc.name)
```

### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

메서드의 내부함수에서 메서드의 this를 그대로 바라보게 하기 위한 방법으로 self 등의 변수를 활용한 우회법을 소개했는데, call, apply, bind 메서드를 이용하면 더 깔끔하게 처리할 수 있습니다.

```javascript
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };

    innerFunc.call(this);
    innerFunc();
  },
};

obj.outer();

```

콜백 함수를 인자로 받는 함수나 메서드 중에서 기본적으로 콜백 함수 내에서의 this에 관여하는 함수 또는 메서드에 대해서도 bind 메서드를 이용하면 this 값을 사용자의 입맛에 맞게 바꿀 수 있습니다.

### 3-2-5 화살표 함수의 예외사항

화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외됐습니다.
즉 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근하게 됩니다.

```javascript
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };

    innerFunc();
  },
};

obj.outer();

```

별도의 변수로 this를 우회하거나 call, apply, bind를 적용할 필요가 없어 더욱 간결하고 편리 합니다.

### 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체(thisArg)를 인자로 지정할 수 있는 경우가 있습니다. 이러한 메서드의 thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있습니다.
이런 형태는 여러 내부 요소에 대해 같은 동작을 반복 수행해야 하는 배열 메서드에 많이 포진돼 있으며, 같은 이유로 ES6에서 새로 등장한 Set, Map 등의 메서드에도 일부 존재합니다. 그중 대표적인 배열 메서드인 ForEach의 예를 살펴보겠습니다.

## 03.this

자바스크립트에서 가장 혼란스러운 개념

일반적인 this는 클래스로 생성한 인스턴스 객체를 의미. **클래스에서만 사용 가능**

자바스크립트에서 this는 어디서든 사용이 가능하고 상황에 따라 this가 바라보는 대상이 달라진다.

## 상황에 따라 달라지는 this

실행 컨텍스가 생성될 때 함께 결정 실행 컨텍스트는 함수를 호출할 때 생성되므로 **함수를 호출할 때 결정된다.**

## 전역 공간에서의 this

전역 객체는 자바스크립트 런타임 환경에 따라 다른 이름과 정보를 가지고 있다.

```JavaScript
// 전역 공간에서의 this
console.log(this);
// Node.js 환경
console.log(global);
// 브라우저 환경
console.log(window);

console.log(this === global);
console.log(this === window);
```

```JavaScript
// 전역변수와 전역객체(1)
var a = 1;

console.log(a);
console.log(window.a);
console.log(this.a);
```

전역공간에서 선언한 변수 a에 할당하면 windows와 this 모두 1이 출력됩니다.전역공간에서의 this는 전역객체를 의미하므로 두 값이 같은 값을 출력하는 것은 당연하지만 그 값이 1인 것이 의아합니다.

**자바스크립의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작**

* 사용자가 var 연산자를 이용해 변수를 선언하더라도 실제 자바스크립트 엔진은 **어떤 특정 객체**의 **프로퍼티로** 인식
* 특정객체?
  * 실행 컨텍스트의 LexicalEnvironment
  * 실행 컨텍스트는 변수를 수집해서 L.E의 프로퍼티로 저장. 이후 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 그대로 참조.

**전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.**

window.a, this.a 나오는 이유는 위 내용으로 설명 가능.
a를 직접 호출 할 경우에도 1이 나오는 이유.

변수 a에 접근하고자 하면 스코프 체인에서 a를 검색하다가 가장 마지막에 도달하는 전역 스코프의 L.E 즉 전역객체에서 해당 프로퍼티 a를 발견해서 그 값을 반환합니다.

* 단순하게 window.가 생략된 것이라고 여겨도 무방합니다.

var로 변수를 선언하는 대신 window의 프로퍼티에 직접 할당하더라도 결과적으로 var로 선언한 것과 똑같이 동작할 것이라는 예상할 수 있습니다.

```JavaScript
// 전역변수와 전역객체(2)
var a = 1;

window.b = 2;
console.log(a, window.a, this.a)
console.log(b, window.b, this.b)

window.a = 3;
b = 4;

console.log(a, window.a, this.a)
console.log(b, window.b, this.b)
```

삭제 명령에 대해서는 차이가 있습니다.

```JavaScript
// 전역변수와 전역객체(3)
var a = 1;

delete window. a;
console.log(a, window.a, this.a);

var b = 2;
console.log(b, window.b, this.b);

window.c = 3;
delete window.c;
console.log(c, window.c, this.c);

window.d = 4;
delete d;
console.log(d, window.d, this.d);

```

* 전역 객체의 프로퍼티로 할당한 경우 삭제가 되는 반면 전역 변수로 선언한 경우 삭제가 되지 않습니다.
* 사용자가 의도치 않게 삭제하는 것을 방지하는 차원에서 마련한 방어 전략.
* 전역 변수를 선언하면 자바스크립트 엔진이 이를 자동으로 전역 객체의 프로퍼티로 할당하면서 추가적으로 해당 프로퍼티의 `configurable` 속성(변경 및 삭제 가능성) `false`로 정의하는 것입니다.

### 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this

#### 함수?

* 그 자체로 독립적인 기능을 수행

#### 메서드?

* 자신을 호출한 대상 객체에 대한 동작 수행

```javascript
// 함수로서 호출, 메서드로서 호출

var func = function (x){
    console.log(this, x);
};

func(1);    // Window{}

var obj = {
    method: func
};

obj.method(2);  // {method: f}


```

* 함수로서 호출과 메서드로서 호출 구분

``` javascript
// 메서드로서 호출 - 점 표기법, 대괄호 표기법

var obj = {
    method: function (x){
        console.log(this,x);
    }
};

obj.method(1); //{method: f} 1
obj['method'](2); //{method: f} 2
```

* 점 표기법이든 대괄호 표기법이든, 어떤 함수를 호출할 때 그 함수 이름(프로퍼티 명) 앞에 객체가 명시돼 있는 경우에는 메서드로 호출한 것이고, 그렇지 않은 모든 경우에는 함수로 호출한 것입니다.

#### 메서드 내부에서의 this

this에슨 호출한 주체에 대한 정보가 담깁니다. 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체입니다. 점 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 this가 되는 것 입니다.

``` javascript
// 메서드 내부에서의 this

var obj = {
    methodA: function () {
        console.log(this);
    },

    inner:{
        methodB: function (){
            console.log(this);
        }
    }
};

obj.methodA(); // === obj
obj["methodA"](); // === obj

obj.inner.methodB(); // === obj.inner
obj.inner["methodB"](); // === obj.inner

obj["inner"].methodB(); // === obj.inner
obj["inner"]["methodB"](); // === obj.inner
```

## 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this

어떤 함수를 함소로서 호출할 경우 `this`가 지정되지 않습니다. this에는 호출한 주체에 대한 정보가 담긴다고 했습니다. 그런데 함수로서 호출하는 것은 호출 주체(객체지향 언어에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없는 것입니다.

실행 컨텍스트를 활성화할 당시에 `this`가 지정되지 않은 경우 `this`는 전역 객체를 바라 본다고 했습니다. 따라서 함수에서의 this는 전역 객체를 가리킵니다.

### 메서드이 내부함수에서의 this

메서드 내부에서 정의하고 실행한 함수에서의  this는 자바스크립트 초심자 들이 this에 관해 가장 자주 혼락을 느끼는 지점 중 하나 입니다. 앞서 소개한 '설계상의 오류'로 인해 실제 동작과 다르게 예측하곤 합니다.

내부함수 역시 이를 함소로서 호출했는지 메서드로서 호출했는지만 파악하면 `this`의 값을 정확히 맞출 수 있습니다.

### 메서드의 내부 함수에서의 this를 우회하는 방법

호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 사용할 수 있을까?

```javascript
var obj ={
    outer: function (){
        console.log(this); // outer
        var innerFunc1 = function(){
            console.log(this); // window
        };

        innerFunc1();

        var self = this;
        var innerFunc2 = function(){
            console.log(self); // outer
        };

        innerFunc2();

    }
};

obj.outer();
```

### this를 바인딩하지 않는 함수

함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자 this를 바인딩하지 않는 화살표(arrow function)를 새로 도입했습니다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있습니다.

```javascript
var obj = {
    outer: function(){
        console.log(this);
        var innerFunc = () => {
            console.log(this);
        };

        innerFunc();
    }
};

obj.outer();
```

## 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수 : 함수 A의 제어권을 다른 함수, 메서드 B에게 넘겨주는 경우 함수 A를 콜백 함수

## 3-1-5 생성자 함수 내부에서의 this

생성자 함수 : 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수.
객체지향에서 생성자를 클래스, 클래스를 통해 만든 객체를 인스턴스

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했습니다. new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작. 어떤 함수가 생성자 함소로서 호출된 경우 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신이 됩니다.
생성자 함수를 호출(new 명령어와 함께 함수를 호출)하면 우선 생성자의 prototype 프로퍼티를 참조하는 __proto__라는 프로퍼티가 있는 객체(인스턴스)를 만들고 미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여합니다.

## 명시적으로 this를 바인딩하는 방법

### 3-2-1 call 메서드

Call 메서드는 메서드의 호출 주체인 함수를 즉시 실행핟록 하는 명령. 이때 Call 메서드의 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 한다. 함수를 그냥 실행하면 this는 전역객체를 참조하지만 call 메서드를 이용하면 임의 객체르르 this로 지정할 수 있습니다.

```javascript

var func = function (a, b, c){
    console.log(this, a, b, c)
};

func(1 , 2 ,3 );
func.call({x:1}, 4, 5, 6);

```

메서드에 대해서도 마찬가지로 객체의 메서드를 그냥 호출하면  this 는 객체를 참조하지만 call 메서드를 이용하면 임의의 객체를 this로 지정할 수 있습니다.

```javascript

var obj ={
    a:1,
    method: (x, y) =>{
        console.log(this, a, x, y);
    }
};

obj.method(2,3);
obj.method.call({a:4},5,6)

```

### 3-2-2 apply 메서드

apply 메서드는 call 기능적으로 완전히 동일하다. call 메서드는 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하는 반면, apply 메서드는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 차이가 있습니다.

```javascript
var func = (a, b, c) => {
  console.log(this, a, b, c);
};

func.apply({ x: 1 }, [4, 5, 6]);

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method.apply({ a: 4 }, [5, 6]);

```

### 3-2-3 call / apply 메서드의 활용

```javascript
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

Array.prototype.push.call(obj, "d");
console.log(obj);

var arr = Array.prototype.slice.call(obj);
console.log(arr);

```

객체에는 배열 메서드를 직접 적용할 수 없습니다. 그러나 키가 `0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티의 값이 0 또는 양의 정수인 객체 즉 별열의 구조와 유사한 객체(유사배열객체)`의 경우 call, apply 메서드를 이용해 배열 메서드를 차용할 수 있습니다.

7번째 줄에서는 배열 메서드인 push를 객체 obj에 적용해 프로퍼티 3에 'd'를 추가했습니다. 9번째 줄에서는 slice 메서드를 적용해 객체를 배열로 전환했습니다. slice 메서드는 원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞 부분까지의 배열 요소를 추출하는 메서드인데, 매개변수를 아무것도 넘기지 않을 경에는 그냥 원본 배열의 얕은 복사본을 반환합니다. 그러니까 call 메서드를 이용해 원본인 유사배열객체의  얕은 복사를 수행한 것인데, slice 메서드가 배열 메서드이기 때문에  복사본은 배열로 반환.

함수 내부에서 접근할 수 있는 arguments  객체도 유사배열객체이므로 위의 방법으로 배열로 전환해서 활용할 수 있습니다. querySelectorAll, getElementsByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지 입니다.

```javascript
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.array.forEach((arg) => {
    console.log(arg);
  });
}

a(1, 2, 3);

document.body.innerHTML = "<div>a</div><div>b</div><div>c</div>";

var nodeList = document.querySelectorAll("div");
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.array.forEach((node) => {
  console.log(node);
});
```

그 밖에도 유사배열객체에는 call/apply 메서드를 이용해 모든 배열 메서드르르 적용할 수 있습니다. 배열처럼 인덱스와 length 프로퍼티를 지니는 문자열에 대해서도 마찬가지입니다. 단 문자열의 경우 length 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드는 에러를 던지며, concat 처럼  대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로 된 결과를 얻을 수 없습니다.

```javascript
var str = "abc";

// Uncaught TypeError TypeError: Cannot assign to read only property 'length' of object '[object String]'
Array.prototype.push.call(str, "pushed string");

Array.prototype.concat.call(str, "string");
Array.prototype.every.call(str, function (c) {
  return char !== " ";
});
Array.prototype.some.call(str, function (c) {
  return char === " ";
});

var newArr = Array.prototype.map.call(str, function (c) {
  return char + "!";
});

var newStr = Array.prototype.map.call(
  str,    
  function (c) {
    return char + char + i;
  },
  ""
);
console.log(newArr);

var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
]);

console.log(newStr);


```

Call, Apply를 이용해 형변환하는 것은  'this'를 원하는 값으로 지정해서 호출한다 라는 본래의 메서드의 의도와는 다소 동떨어진 활용법 입니다.
slice 메서드는 오직 배열의  형태록 복사하기 위해 차용됐을 뿐 경험을 통해 숨은 뜻을 알고 있는 사람이 아닌 한 코드만 봐서는 어떤 의도인지 파악하기 쉽지 않습니다.
이에 ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from 메서드를 새로 도입했습니다.

```javascript
// 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

var arr = Array.from(obj);

console.log(arr);

```

### 생성자 내부에서 다른 생성자 호출

생성자 내부에 다른 생성자의 공통된 내용이 있을 경우 call 도는 apply를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있습니다.
다음 예제에서는 Student, Employee 생성자 함수 내부에서 Person 생성자 함수를 호출해서 인스턴스의 속성을 정의하도록 구현했다.

```javascript

function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}

var by = new Student("보윤", "F", "한양대");
var jy = new Employee("재윤", "M", "삼성");

console.log(by, jy, Person);

```

### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용

여러 개의 인수를 받는 메서드에게 하나의 배열로 인수들을 전달하고 싶을 때 apply 메소드를 사용하면 좋습니다. 예를 들어, 배열에서 최대, 최솟값을 구해야 할 경우 apply를 사용하지 않는다면 부득이하게 다음과 같은 방식으로 직접 구현할 수 밖에 없을 것입니다.

```javascript
var numbers = [10, 20, 3, 16, 45];
var max = (min = numbers[0]);

numbers.forEach((number) => {
  if (number > max) {
    max = number;
  }

  if (number < min) {
    min = number;
  }
});

console.log(max, min);
```

apply를 적용하면 훨씬 간단해집니다.

```javascript
var numbers = [10, 20, 3, 16, 45];

var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

console.log(max, min);

```

펼치기 연산자를 이용하면 더욱 간편하게 작성할 수 있습니다.

```javascript

const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log(max, min);

```

### 3-2-4 bind 메서드

``` javascript

Function.property.bind(thisArg[,arg1[,arg2]])

```

bind 메서드는 ES5에서 추가된 기능으로 call과 빗슷하지만 즉시 호출하지는 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드 입니다. 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록됩니다. 즉 bind 메서드는 함수에 this를 미리 적용하는 거소가 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닙니다.

### name 프로퍼티

bind 메서드를 적용해서 새로 만든 함수는 한 가지 독특한 성질이 있습니다. 바로 name 프로퍼티에 bind의 수동태dls bound라는 접두어가 붙는다는 점입니다. 어떤 함수의 name 프로퍼티가 bound xxx라면 이는 곧 함수명이 xxx인 원본 함수에 bind 메서드를 적용한 새로운 함수라는 의미가 되므로 기존 call이나 apply보다 코드를 추적학에 더 수월해진 면이 있습니다.

```javascript
var func = function(a,b,c,d){
    console.log(this, a,b,c,d);
}

var bindFunc = func.bind({x:1}, 4, 5);

console.log(func.name)
console.log(bindFunc.name)
```

## 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

메서드의 내부함수에서 메서드의 this를 그대로 바라보게 하기 위한 방법으로 self 등의 변수를 활용한 우회법을 소개했는데, call, apply, bind 메서드를 이용하면 더 깔끔하게 처리할 수 있습니다.

```javascript
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };

    innerFunc.call(this);
    innerFunc();
  },
};

obj.outer();

```

콜백 함수를 인자로 받는 함수나 메서드 중에서 기본적으로 콜백 함수 내에서의 this에 관여하는 함수 또는 메서드에 대해서도 bind 메서드를 이용하면 this 값을 사용자의 입맛에 맞게 바꿀 수 있습니다.

## 3-2-5 화살표 함수의 예외사항

화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외됐습니다.
즉 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근하게 됩니다.

```javascript
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };

    innerFunc();
  },
};

obj.outer();

```

별도의 변수로 this를 우회하거나 call, apply, bind를 적용할 필요가 없어 더욱 간결하고 편리 합니다.

### 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체(thisArg)를 인자로 지정할 수 있는 경우가 있습니다. 이러한 메서드의 thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있습니다.
이런 형태는 여러 내부 요소에 대해 같은 동작을 반복 수행해야 하는 배열 메서드에 많이 포진돼 있으며, 같은 이유로 ES6에서 새로 등장한 Set, Map 등의 메서드에도 일부 존재합니다. 그중 대표적인 배열 메서드인 ForEach의 예를 살펴보겠습니다.

```javascript
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function () {
    return this.sum / this.count;
  },
};

report.add(60, 85, 95);
console.log(report.sum, report.count, report.average());

```

## 정리

* 전역공간에서의 this는 전역객체(브라우저 : window, Node : global)를 참조합니다.
* 어던 함수를 메서드로서 호출한 경우 this는 메서드 호출 주체(메서드명 앞의 객체)를 참조합니다.
* 어떤 함수를 함수로서 호출한 경우 this는 전역격체를 참조합니다. 메서드 내부함수에서도 같습니다.
* 콜백 함수 내부에서의 this는 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며 정의 하지 않은 경우에는 전역객체를 참조합니다.
* 생성자 함수에서의 this는 생성될 인스턴스를 참조합니다.

### 명시적 this 바인딩

* call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출합니다.
* bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만듭니다.
* 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 합니다.
