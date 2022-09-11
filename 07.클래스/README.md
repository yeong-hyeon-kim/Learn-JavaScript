# 07.클래스

프로토타입의 자바스크립트는 클래스 기반의 다른 언어에 익숙한 개발자들을 혼란스럽게 했고 클래스와 비슷하게 동작하게끔 하는는 여러 기법들이 생겨났습니다.

## 01 클래스와 인스턴스의 개념 이해

* 클래스(Class), 상위 : Super - 범주, 하위 : Sub
  * 음식 - 고기, 채소, 과일, 생선

* 인스턴스(Instance)
* 클래스의 속성을 지니는 실존하는 개체
  * 고기 클래스(Class)의 인스턴스(Instance)인 삼겹살, 항정살
  * 채소 클래스(Class)의 인스턴스(Instance)인 상추, 깻잎
  * 과일 클래스(Class)의 인스턴스(Instance)안 사과, 배, 포도
  * 생선 클래스(Class)의 인스턴스(Instance)인 광어, 우럭, 고등어

## 02 자바스크립트의 클래스

* 생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성됩니다.
* 프로토타입 체이닝에 의한 참조지만 결과적으로 동일하여 상속이라 합니다.

* 인스턴스에 상속되는지(인스턴스가 참조하는지) 여부에 따라 정적(스태틱) 멤버와 인스턴스 멤버로 나뉩니다.
* 다른 언어와 달리 자바스크립트에서는 인스턴스에서도 직접 메서드를 정의할 수 있습니다.
* 인스턴스 메서드 대신 프로토타입 메서드라고 합니다.

* 스태틱 메서드
  * 인스턴스에서 직접 접근할 수 없는 메서드

* 프로토타입(인스턴스) 메서드
  * 인스턴스에서 직접 접근할 수 있는 메서드

## 03 클래스 상속

### 7-3-1 기본 구현

```javascript
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = () => {
  return this.width * this.height;
};

var rect = new Rectangle(3, 4);
console.log(rect.getArea());

var Square = function (width) {
  Rectangle.call(this, width, width);
};

Square.prototype = new Rectangle();

var sq = new Square(5);
console.log(sq.getArea());

console.dir(sq);
console.dir(sq);
```

### 7-3-2 클래스가 구체적인 데이터를 지니지 않게 하는 방법

새로운 프로퍼티를 생성하지 못하게 하는 방법 입니다

  ```javascript
  delete Square.prototype.width
  delete Square.prototype.height
  Object.freeze(Square.prototype)
  ```

  ```javascript

  var extendClass = function () {
      var Bridge = function () {};
    
      return function (SuperClass, SubClass, subMethod) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
    
        if (subMethod) {
          for (var method in subMethods) {
            SubClass.prototype[method] = subMethod[method];
          }
        }
        Square.prototype = Object.create(Rectangle.prototype);
        Object.freeze(SubClass.prototype);
        return SubClass;
      };
    };
    
  ```

### 7-3-3 Constructor 복구하기

* 방법 1

  ```javascript
  var extendClass1 = (SuperClass, SubClass, subMethod) => {
    SubClass.prototype = new SuperClass();

    for (const prop in SubClass.prototype) {
      if (SubClass.hasOwnProperty.call(object, prop)) {
        delete SubClass.prototype[prop];
      }
    }
  };

  var ExtendsClass = (SuperClass, SubClass, SubMethod) => {
    SubClass.prototype = new SuperClass();
    for (var prop in SubClass.prototype) {
      if (SubClass.prototype.hasOwnProperty(prop)) {
        delete SubClass.prototype[prop];
      }
    }

    SubClass.prototype.Constructor = SubClass;

    if (subMethod) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method];
      }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
  };

  ```

* 방법 2

  ```javascript
  var extendClass2 = (function () {
    var Bridge = function () {
      return function (SuperClass, SubMethod, SubMethod) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
        SubClass.prototype.constructor = SuperClass;
        Bridge.prototype.constructor = SuperClass;

        if (SubMethod) {
          for (var method in SubMethod) {
            SubClass.prototype[method] = SubMethods[method];
          }
        }
      };

      Object.freeze(SubClass.prototype);
      return SubClass;
    };
  })();
  ```

* 방법 3

  ```javascript
  var extendClass3 = (SuperClass, SubClass, SubMethod) => {
    SubClass.prototype = Object.create(SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;

    if (SubMethod) {
      for (var method in SubClass) {
        SubClass.prototype[method] = SubClass[method];
      }
    }

    Object.freeze(SubClass.prototype);
    return SubClass;
  };


  ```

### 7-3-4 상위 클래스에의 접근 수단 제공

```javascript

var extendClass = (SuperClass, SubClass, SubMethod) => {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;
  SubClass.prototype.super = (propName) => {
    var self = this;
    if (!propName) {
      return () => {
        SuperClass.apply(self, arguments);
      };
      var prop = SuperClass.prototype[propName];
      if (typeof prop !== "function") {
        return prop;
      }

      return prop.apply(self, arguments);
    }
  };
  if (SubMethod) {
    for (var method in SubMethod) {
      SubClass.prototype[method] = SubMethod[method];
    }
  }

  Object.freeze(SubClass);
  return SubClass;
};

var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var Square = extendClass(
  Rectangle,
  function (width) {
    this.super()(width, width);
  },
  {
    getArea: function () {
      console.log("Size is : ", this.super("getArea")());
    },
  }
);

var sq = new Square(10);
sq.getArea();
console.log(sq.super("getArea")());

```

## ES6의 클래스 및 클래스 상속

```javascript

var ES5 = function (name) {
  this.name = name;
};

ES5.staticMethod = function () {
  return this.name + " Static Method";
};

ES5.prototype.method = function () {
  return this.name + " Method";
};

var es5Instance = new ES5("es5");

console.log(ES5.staticMethod());
console.log(es5Instance.method());

var ES6 = class {
  constructor(name) {
    this.name = name;
  }

  static staticMethod() {
    return this.name + " static Method";
  }

  Method() {
    return this.name + " Instance Method";
  }
};

var es6Instance = new ES6("es6");
console.log(ES6.staticMethod());
console.log(es6Instance.Method());

```

## 05 정리

* 자바스크립는 프로토타입 기반 언어라서 클래스 및 상속 개념은 존재하지 않지만 프로토타입을 기반으로 클래스와 비슷하게 동작하게끔 하는 다양한 기법들이 도입돼 왔습니다.

* 클래스는 어떤 사물의 공통 속성을 모아 정의한 추상적인 개념이고, 인스턴스는 클래스의 속성을 지니는 구체적인 사례입니다. 상위 클래스의 조건을 충족하면서 더욱 구체적인인 조건이 추가된 것을 하위 클래스라고합니다.

* 클래스의 프로토타입 내부에 정의된 메서드를 프로토타입 메서드라고 하며 이들은 인스턴스가 마치 자신의 것처럼 호출할 수 있습니다. 한편 클래스에 직접 정의한 메섣를 스태틱 메서드라고 하며, 이들은 인스턴스가 직접 호출할 수 없고 클래스에 의해서만 호출할 수 있습니다.

* 클래스의 상속을 흉내내기 위해 세가지 방법을 소개했습니다.
  * SubClass.prototype에 SuperClass의 인스턴스를 할당한 다음 프로퍼티를 모두 삭제하는 방법.
  * 빈 함수를 활요하는 방법.
  * Object.create를 이용하는 방법입니다.
* 이 방법 모두 constructor 프로퍼티가 원래의 생성자 함수를 바라보도록 조정해야합니다.
