# 02. 실행 컨텍스트

* 실행 컨텍스트는 __실행할 코드에 제공할 환경 정보들을 모아 놓은 객체__
  * 콜스텍에 쌓아올렸다가 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드를 실행 식으로 전체 코드의 환경과 순서를 보장합니다.

## 실행 컨텍스트 실행 방법?

* 함수를 실행하는 것뿐입니다.

```javaScript
var a = 1;

function outer() {
    function inner(){
        console.log(a);
        var a = 3;
    }

    inner();
    console.log();
}

outer();
console.log(a);
```

## 활성화된 실행 컨텍스트의 수집 정보

* VariableEnvironment
  * EnvironmentRecord(Snapshot)
  * (Outer) EnvironmentRefercence(Snapshot)

* LexicalEvnironment
  * EnvironmentRecord
  * (Outer) EnvironmentRefercence

* ThisBinding

## VariableEnivronment

* 현재 컨텍스트 내의 실별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 `LexicalEvnironment`의 스냅샷으로, 변경 사항은 반영되지 않음.

## LexicalEvnironment

* 처음에는 `VariableEnvironment`와 같지만 변경 사항이 실시간으로 반영됨.

## ThisBinding

* 식별자가 바라봐야 할 대상 객체.

## EnvironmentRecord

* 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됩니다.
  * 컨텍스트 내부 전체를 처음부터 끝까지 죽 훑어나가며 순서대로 수집힙니다.
  * 호이스팅(Hoisting)

> EnvironmentRecord는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장되는데 호이스팅 방식으로 수집한다.

### 호이스팅(Hoistring) 규칙

#### 매개변수와 변수에 대한 호이스팅

```JavaScript
//매계변수와 변수에 대한 호이스팅(1) - 원본코드

function a (x){
    console.log(x);

    var x;

    console.log(x);

    var x = 2;

    console.log(x);
}

a(1);

```

* 인자들과 함께 함수를 호출하는 경우 __코드 내부에서 변수를 선언한 것과 같습니다.__

```JavaScript
// 매계변수와 변수에 대한 호이스팅 (2) - 매개변수를 변수 선언/ 할당과 같다고 간주하여 변환한 상태

function a (x) {
    var x;
    var x;
    var x;

    x = 1;
    
    console.log(x);
    console.log(x);

    x = 2;

    console.log();
}

a();

```

* 호이스팅을 마친 상태

#### 함수 선언의 호이스팅

```javaScript
// 함수 선언의 호이스팅(1) - 원본 코드
function  a(){
    console.log(b);

    var b = 'bbb';

    console.log(b);

    function b() {}

    console.log(b);
}

a();

```

* 호이스팅을 마친 상태

```javaScript
//함수 선언의 호이스팅(2) - 호이스팅을 마친 상태

function a(){
    var b;
    function b(){}

    console.log(b);

    b = 'bbb';

    console.log(b);
    console.log(b);
}

a();
```

```javaScript
//함수 선언의 호이스팅(3) - 함수 선언문을 함수 표현식으로 바꾼 코드

function a(){
    var b;
    function b(){}

    console.log(b);

    b = 'bbb';

    console.log(b);
    console.log(b);
}

a();
```

### 함수 선언문과 함수 표현식

* 함수 선언문
  * `function` 정의부만 존재하고 __별도의 할당 명령이 없다.__
  * 반드시 함수명이 정의돼 있어야 한다.
* 함수 표현식
  * 정의한 `function`을  __별도의 변수에 할당하는 것이다.__
  * 함수명이 있어도 되고 없어도 된다.
  * 함수명을 정의한 함수 표현식은 __기명 함수 표현식__
  * 일반적은 함수 표현식은 __익명 함수 표현식__

### 2-3-2 스코프, 스코프 체인, OuterEnvironmentReference

* OuterEnvironmentReference는 현재 호출된 함수가 선언될 당시의 LexcalEnvironment를 참조합니다.
* 콜 스택 사에서 어떤 실행 컨텍스트가 활성화된 상태일 때뿐입니다.
* 어떤 함수를 선언(정의)하는 행위 자체도 하나의 코드에 지나지 않으며 **모든 코드는 실행 컨텍스가 활성화 상태일 때 실행되기 때문입니다.

A 함수 내부에 B 함수를 선언하고 다시 B 함수 내부에 C 함수를 선언한 경우, 함수 C의 OuterEnviromentReference는 함수 B의 LexicalEnvironmentfmf 참조합니다. 함수 B의 LexicalEnviroment에 있는 OuterEnviromentReference는 다시 함수 B가 선언되던 때 (A)의 LexicalEnvironment를 참조합니다.

* OuterEnvironment는 연결 리스트 형태를 보입니다.
* 계속 찾아 올라간다면 전역 컨텍스트의 LexicalEnvironment가 있을 것입니다.

* OuterEnvironmentReference는 오직 자신이 선언된 시점의 LexicalEnvironment만 참조하고 있으므로 가장 가까운 요소부터 차례대로만 접근할 수 있고 다른 순서로 접근하는 것은 불가능합니다.

* 여러 스코프에서 동일한 식별자를 선언한 경우에는 __무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에서만 접근 가능합니다.__

```JavaScript
// 스코프 체인

var a = 1;

var outer = function(){
    var inner = function(){
        console.log(a);
        var a = 3;
    };

    inner();
    console.log(a);    
};

outer();
console.log(a);
```

>전역 컨텍스트 - LexicalEnvironment
>>Outer 컨텍스트 - LexicalEnvironment
>>>Inner 컨텍스트 - LexicalEnvironment

* 전역 컨텍스트 > Outer 컨텍스트 > Inner 컨텍스트 순으로 점차 규모가 작아지는 반면 스코프 체인을 타고 접근 가능한 변수의 수는 늘어납니다.
* 전역 공간에서는 전역 스코프에서 생성된 변수에만 접근할 수 있습니다.
* Outer 함수 내부에서는 Outer 및 전역 스코프에서 생성된 변수에 접근 할 수 있습니다.
* 반면 Inner 스코프 내부에서는 Inner, Outer, 전역 스코프 모두에 접근할 수 있습니다.

### 예외

* 스코프 체인 상에 있는 변수라고 해서 무조건 접근 가능한 것은 아니다.

```JavaScript

var a = 1;

var Outer = function (){
    var Inner = function (){
        var a = 2;
        console.log(a);
    }

    Inner();
}

Outer();
```

* Inner 함수 내부에서 a에 접근하려고 하면 무조건 스코프 체인 상의 첫 번째 인자. 즉 Inner 스코프의 LexicalEnvironment 부터 검색할 수밖에 없다.

* Inner 스코프의 LexicalEnvironment에 a식별자가 존재하므로 스코프 체인 검색을 더 진행하지 않고 즉시 Inner LecicalEnvironment 상의 a를 반환하게 된다.

* 즉 Inner 함수 내부에서 a 변수를 선언했기 때문에 전역 공간에서 선언한 동일한 이름의 a 변수에는 접근할 수 없는 셈입니다. 이를 **변수 은닉화(Variable Shadowing)**라고 합니다.

### 지역변수와 전역변수

* 전역변수
  * 전역 스코프에서 선언한 변수
* 지역변수
  * 함수 내부에서 선언한 변수

#### 실행 컨텍스트

* 전역 컨텍스트
* 함수 실행에 의한 컨텍스트
  * Variable Environment
  * Lexical Environment
  * This Binding

* 실행 컨텍스트 실행 시 Variable Environment와 Lexcial Environment 동일한 내용으로 구성
* Variable Environment : 초기 상태 유지
* Lexcial Environment : 함수 실행 도중에 변경되는 사항이 즉시 반영
  * Enviroment Record : 매계변수명, 변수의 식별자, 선언한 함수의 함수명 등을 수집.
  * Enviroment Reference : 직전 컨텍스트(Outer 스코프)의 LexicalEnvironment 정보를 참조하는 OuterEnvironmentReference로 구성

* 호이스팅
  * 코드 해석을 좀 더 수월하게 하기 위해 EnvironmentRecord의 수집 과정을 추상화한 개념
* 스코프
  * 변수의 유효범위
  * OuterEnvromentReference는 해당 변수가 선언된 위치의 Lexcal Environment를 참조합니다. 코드 상에서 어떤 변수에 접근하려고 하면 현재 컨텍스트의 Lexical Environment를 탐색해서 발견되면 그 값을 반환하고 발견하지 못할 경우 다시 OuterEnvironmentRecord에 담긴 Lexical Environment를 탐색하는 과정을 거칩니다. 전역 컨텍스트의 Lexcal Environment까지 탐색해도 해당 변수를 찾지 못하면 undefined를 반환합니다.
