# 06.프로토타입

* 자바스크립트는 프로토타입 기반 언어입니다.
* 프로토타입이란?
  * 객체를 원형(Prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻습니다.

## 01 프로토타입의 개념 이해

### 6-1-1 Constructor, Prototype, Instance

```javascript
var Person = (name) => {
  this._name = name;
};

Person.prototype.getName = () => {
  return this._name;
};

var suzi = new Person("Suzi");
suzi.__proto.getName();

```

### 6-1-2 Constructor 프로퍼티

* 생성자 함수의 프로퍼티인 prototype 객체 내부에서는 constructor라는 프로퍼티가 있습니다.
* 인스턴스 __proto__ 객체 내부에도 마찬가지 입니다.
* 단어 그대로 원래의 생성자 함수(자기 자신)를 참조합니다.
* 인스턴스로부터 그 원형이 무엇인지를 알 수 있는 수단 입니다.

## 02 프로토타입 체인

### 6-2-1 메서드 오버라이드

prototype 객체를 참조하는 __proto__를 생략하면 인스턴스는 prototype에 정의된 프로퍼티나 메서드는 마치 자신의 것처럼 사용할 수 있습니다.

* 만약 인스턴스가 동일한 이름의 프로퍼티 또는 메서드를 가지고 있는 상황이라면?

```javascript
var Person = (name) => {
  this.name = name;
};

Person.prototype.getName = () => {
  return this.name;
};

// console.log(getName)

var iu = new Person("지금");
iu.getName = () => {
  return "바로 " + this.name;
};

Person.prototype.name = "이지금";

// console.log(iu.getName());
console.log(iu.__proto__.getName());
console.log(iu.__proto__.getName.call(iu));

```

### 6-2-2 프로토타입 체인

#### 프로토타입 체인(Prototype Chain)

* 어떤 데이터의 __proto__프로퍼티 내부에서 다시 __proto__프로퍼티가 연쇄적으로 이어진 것을 프로토타입이라고 합니다.

#### 프로토타입 체이닝(Prototype Chaining)

* 이 체인을 따라가며 검색하는 것을 프로토타입 체이닝이라고 합니다.

어떤 메서드를 호출하면 V8엔진은 데이터 자신의 프로퍼티들을 검색해서 원하는 메서드가 있으면 그 메서드를 실행하고 없으면 __proto__를 검색해서 있으면 그 메서드를 실행하고, 없으면 다시 __proto__를 검색해서 실행하는 식으로 진행합니다.

### 6-2-3 객체 전용 메서드의 예외사항

* 어떤 생성자 함수든 prototype은 반드시 객체이기 때문에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재합니다.

> 객체에서만 사용할 메서드는 다른 여느 데이터 타입처럼 프로토타입 객체 안에 정의할 수가 없습니다.

* 객체에서만 사용할 메서드를 Object.prototype 내부에 정의한다면 다른 데이터 타입도 해당 메서드를 사용할 수 있게 되기 때문입니다.

```javascript

Object.prototype.getEntries = () => {
  var res = [];
  for (let prop in this) {
    if (this.hasOwnProperty(prop)) {
      res.push([prop, this[prop]]);
    }
  }
  return res;
};

var data = [
  ["object", { a: 1, b: 2, c: 3 }],
  ["number", 345],
  ["string", "abc"],
  ["boolean", false],
  ["func", () => {}],
  ["array", [1, 2, 3, 4, 5]],
];

data.forEach((datum) => {
  console.log(datum[1].getEntries());
});

```

### 6-2-4 다중 프로토타입 체인

* 자바스크립트 기본 내장 데이터 타입은 모두 프로토타입 체인이 1단계(객체)이거나 2단계(나머지)로 끝나는 경우만 있었지만 사용자가 새롭게 만드는 경우 그 이상도 얼마든지 가능합니다.

* 대각선의 __proto__를 연결해나가기만 하면 무한대로 체인 관계를 이어나갈 수 있습니다. 이를 활용하여 다른 언어의 클래스와 비슷하게 동작하는 구조를 만들 수 있습니다.

## 03 정리

### __proto__

* 어떤 생성자 함수를 new 연산자와 함께 호출하면 Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성되는데, 이 인스턴스에는 __proto__ 라는, Constructor의 prototype 프로퍼티를 참조하는 프로퍼티가 자동으로 부여됩니다.  __proto__는 생략 가능한 속성이라서, 인스턴스는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출할 수 있습니다.

* Constructor.prototype에는 constructor라는 프로퍼티가 있는데, 이는 다시 생성자 함수 자신을 가리킵니다. 이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자할 때 필요한 수단입니다.

### 프로토타입 체이닝

* 직각삼각형의 대각선 방향, 즉  __proto__ 방향으로 계속 찾아가면 최종적으로는 Object.prototype에 당도하게 됩니다. 이런 식으로  __proto__ 안에서 다시  __proto__ 를 찾아가는 과정입니다.

* 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있습니다.

* 자신으로부터 가장 가까운 대상부터 점차 먼 대상으로 나아가며, 원하는 값을 찾으면 검색을 중단합니다.

### Object.prototype

* 모든 데이터 타입에서 사용할 수 잇는 범용적인 메서드만이 존재하며, 객체 전용 메서드는 여는 데이터 타입과 달리 Object 생성자 함수에 스태틱하게 담겨있습니다.
