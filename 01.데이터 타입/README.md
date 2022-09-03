# 01. 데이터 타입의 종류

## 기본형

- 숫자`(Number)`
- 문자열`(String)`
- 불리언`(Boolean)`
- `null`
- `undefined`

## 참조형

- 객체`(Object)`
- 배열`(Array)`
- 함수`(Function)`
- 날짜`(Date)`
- 정규표현식`(RegExp)`

## 데이터 타입에 관한 배경지식

### 1-2-1메모리 할당

- 숫자의 경우 정수형인지 부동소수형인지를 구분하지 않고 `64Bit` `8Byte` 확보 합니다.

- 개발자가 형변환을 걱정해야 하는 상황이 적어집니다.

### 1-2-2식별자와 변수

- 변수 : 변할 수 있는 수 > 변할 수 있는 무언가 > 데이터 > 변수의 데이터
- 식별자 : 어떤 데이터를 식별하는 데 사용하는 이름 변수명

## 변수 선언과 데이터 할당

### 1-3-2 데이터 할당

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>...</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>1005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td></td>
        <td>이름 : a <br> 값 : @5004</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>...</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td></td>
        <td>'abc'</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

1. 변수 영역에 빈공간을 확보합니다.

2. 확보한 공간의 식별자(변수 명)를 지정합니다.

3. 데이터 영역의 빈 공간에 문자열(데이터)을 저장합니다.

4. 변수 영역에서 식별자를 검색합니다.

5. 앞서 저장한 문자열의 주소를 값으로 대입합니다.

데이터 영역과 변수 영역을 나누는 이유__

- 변수에 실제 값이 아니라 주소 값을 대입하여 중복된 데이터에 대한 처리 효율이 높아집니다.

## 기본형 데이터와 참조형 데이터

### 1-4-1 불변값

- 변수와 상수를 구분하는 성실은 변경 가능성 바꿀 수 있으면 변수 바꿀 수 없으면 상수

- 불변값 <> 상수
- 변수와 상수를 구분 짓는 변경 가능성의 대상은 __변수 영역(식별자, 주소값)__ 메모리
- 불변성 여부를 구분할 때의 변경 가능성의 대상은 __데이터 영역(주소, 값)__ 메모리
  - 메모리 데이터 영역의 데이터가 변하지 않는 것을 의미합니다.
- 기본형 데이터 타입인 숫자, 문자열, `boolean, null, undefined, Symbol`

```javascript
var a = 'abc';
a = a + 'def'; 
// 'abc'가 'abcdef'로 바뀌는 것이 아니라 새로운 문자열 'abcdef'를 만들어 그 주소를 변수 a에 저장 'abc'와 'abcdef'는 완전히 별개의 데이터
var b = 5;
var c = 5;
b = 7;
```

- 할당 시 데이터 영역에서 일치하는 값을 찾고 없으면 데이터 공간을 만들어 생성
- 데이터 영역(주소, 값)의 값은 변경되지 않고 새로 만들어지기만 합니다.

### 1-4-2 가변값

```javascript
var obj = {
a:1,
b:'bbb'
};
```

- 변수 영역에 빈 공간을 생성하고 그 주소의 이름을 obj 지정
- __프로퍼티들을 저장하기 위해 별도의 변수 영역을 마련__합니다.
- 프로퍼티 별도의 변수

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>1000</td>
        <td>1001</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td>이름 : obj1<br> 값 : @5001</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>5001</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>@7001 ~ ?</td>
        <td>1</td>
        <td>'bbb'</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
<table>
    <tr>
        <td rowspan="2" >객체 @5001 변수 영역</td>
     <td>주소</td>
        <td>7001</td>
        <td>7002</td>
        <td>7003</td>
        <td>7004</td>
        <td>7005</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : a <br> 값 : @5002</td>
        <td>이름 : b <br> 값 : @5003</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

- 참조형 데이터는 객체의 변수(프로퍼티) 영역이 별도로 존재한다.

- 기본형 데이터와 달리 참조형 데이터의 객체 변수 영역(값)은 얼마든지  다른 값으로 대입할 수 있다.

  - 참조형 데이터는 불변하지 않다.
  - 가변값이다.

##### 중첩된 참조형 데이터(객체)의 프로퍼티 할당

```javascript
var obj ={
 x: 3,
 arr: [3,4,5]
}
```

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>1000</td>
        <td>1001</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td>이름 : obj1<br> 값 : @5001</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>5001</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>@7003 ~ ?</td>
        <td>3</td>
        <td>@8003 ~ ?</td>
        <td>4</td>
        <td>5</td>
        <td></td>
    </tr>
</table>
<table>
    <tr>
        <td rowspan="2" >객체 @5001 변수 영역</td>
     <td>주소</td>
        <td>7003</td>
        <td>7004</td>
        <td>7005</td>
        <td>7006</td>
        <td>7007</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : x <br> 값 : @5002</td>
        <td>이름 : arr <br> 값 : @5003</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

<table>
    <tr>
        <td rowspan="2" >객체 @5003 변수 영역</td>
     <td>주소</td>
        <td>8003</td>
        <td>8004</td>
        <td>8005</td>
        <td>8006</td>
        <td>8007</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : 0 <br> 값 : @5002</td>
        <td>이름 : 1 <br> 값 : @5004</td>
        <td>이름 : 2 <br> 값 : @5005</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

1. 빈 공간 `1001`을 확보하고 이름을 `obj1`으로 지정합니다.
2. 임의의 데이터 저장공간(`@5001`)에 데이터를 저장하려는데, `obj1`은 여러 개의 변수와 값들을 모아놓은 그룹(객체)입니다. 이 그룹의 각 변수(프로퍼티) 들을 저장하기 위해 별도의 변수 영역을 마련하고(`@7003~?`) 그 영역의 주소를 `@5001`에 저장합니다.
3. `@7003`에 이름을`x`를, `@7004`에 이름을 `arr`를 지정합니다.
4. 데이터 영역에서 숫자 3을 검색합니다. 없으므로 `@5002`에 저장하고 이 주소를 `@7003`에 저장합니다.
5. `@7004`에 저장할 값은 배열로서 역시 데이터 그룹 입니다. 이 그룹 내부의 프로퍼티들을 저장하기 위해 별도의 변수 영역을 마련하고(`@8003~?`) 그 영역의 주소를 `7004`에 저장합니다.
6. 배열의 요소가 총 3개 이므로 3개의 변수 공간을 확보하고 각각 인덱스를 부여합니다. (0,1,2)
7. 데이터 영역에서 숫자 3을 검색해서(`@5003`) 그 주소를 `@8003`에 저장합니다.
8. 데이터 영역에서 숫자 4가 없으므로 `@5004`에 저장하고 이 주소를 `@8004`에 저장합니다.
9. 데이터 영역에서 숫자 5가 없으므로 `@5005`에 저장하고 이 주소를 `@8005`에 저장합니다.

##### 재할당

```javascript
obj.arr = 'str';
```

- 데이터 영역에 문자열 `'str'`이 없으므로 `@5006`에 `'str'`를 저장합니다.
- `@5003`값을 `@5006`으로 저장합니다.
- 객체 `@5003`변수 영역은 참조 카운트가 0으로 변하여 가비지 컬렉터의 수거 대상이 됩니다.

### 1-4-3 변수 복사 비교

```javascript
var a = 10;
var b = a;

var obj1 ={ c: 10, d: 'ddd'};
var obj2 = obj1;
```

##### 변수 복사 비교

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>1000</td>
        <td>1001</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td>이름 : a<br> 값 : @5001</td>
        <td>이름 : b<br> 값 : @5001</td>
        <td>이름 : obj1<br> 값 : @5002</td>
        <td>이름 : obj2<br> 값 : @5002</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>5001</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>10</td>
        <td>@7001~?</td>
        <td>'ddd'</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
<table>
    <tr>
        <td rowspan="2" >객체 @5002 변수 영역</td>
     <td>주소</td>
        <td>7001</td>
        <td>7002</td>
        <td>7003</td>
        <td>7004</td>
        <td>7005</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : c <br> 값 : @5001</td>
        <td>이름 : d <br> 값 : @5003</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

```javascript
var a = 10;
var b = a;
var obj1 = { c: 10, d:'ddd'};
var obj2 = obj2;

b =15;
obj2.c = 20;
```

##### 변수 복사 이후 값 변경 결과 비교 - 객체의 프로퍼티 변경 시

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>1000</td>
        <td>1001</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td>이름 : a<br> 값 : @5001</td>
        <td>이름 : b<br> 값 : @5004</td>
        <td>이름 : obj1<br> 값 : @5002</td>
        <td>이름 : obj2<br> 값 : @5002</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>5001</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>10</td>
        <td>@7001~?</td>
        <td>'ddd'</td>
        <td>15</td>
        <td>20</td>
        <td></td>
    </tr>
</table>
<table>
    <tr>
        <td rowspan="2" >객체 @5002 변수 영역</td>
     <td>주소</td>
        <td>7001</td>
        <td>7002</td>
        <td>7003</td>
        <td>7004</td>
        <td>7005</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : c <br> 값 : @5001</td>
        <td>이름 : d <br> 값 : @5005</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

- 기본형 데이터를 복사한 변수 `b`의 값을 바꿨더니 `@1001`의 값이 달라진 반면__(불변)__,

- 참조형 데이터를 복사한 변수 `obj2`의 프로퍼티의 값을 바꾸었더니 `@1004`의 값은 달라지지__(가변)__ 않았습니다.

##### 변수 복사 이후 값 변경 결과 비교 - 객체 자체를 변경했을 때

<table>
    <tr>
        <td rowspan="2" >변수 영역</td>
     <td>주소</td>
        <td>1000</td>
        <td>1001</td>
        <td>1002</td>
        <td>1003</td>
        <td>1004</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>...</td>
        <td>이름 : a<br> 값 : @5001</td>
        <td>이름 : b<br> 값 : @5001</td>
        <td>이름 : obj1<br> 값 : @5002</td>
        <td>이름 : obj2<br> 값 : @5004</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" >데이터 영역</td>
     <td>주소</td>
        <td>5001</td>
        <td>5002</td>
        <td>5003</td>
        <td>5004</td>
        <td>5005</td>
        <td>...</td>
    </tr>
    <tr>
     <td>데이터</td>
        <td>10</td>
        <td>@7001~?</td>
        <td>'ddd'</td>
        <td>@8001~?</td>
        <td></td>
        <td></td>
    </tr>
</table>
<table>
    <tr>
        <td rowspan="2" >객체 @5002 변수 영역</td>
     <td>주소</td>
        <td>7001</td>
        <td>7002</td>
        <td>7003</td>
        <td>7004</td>
        <td>7005</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : c <br> 값 : @5001</td>
        <td>이름 : d <br> 값 : @5003</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
<table/>

<table>
    <tr>
        <td rowspan="2" >객체 @5004 변수 영역</td>
     <td>주소</td>
        <td>8001</td>
        <td>8002</td>
        <td>8003</td>
        <td>8004</td>
        <td>8005</td>
        <td>...</td>
    </tr>
    <tr>
        <td>데이터</td>
     <td>이름 : c <br> 값 : @5001</td>
        <td>이름 : d <br> 값 : @5003</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
<table/>

- 새로운 객체를 할당함으로서 값을 직접 변경했습니다. 메모리의 데이터 영역의 새로운 공간에 새 객체가 저장되고 그 주소를 변수 영역의 `obj2` 위치에 저장됩니다. 객체에 대한 변경임에도 값이 달라졌습니다.

- 참조형 데이터가 가변값이라고 설명할 때의 가변은 참조형 데이터 자체를 변경할 경우가 아니라 그 내부의 프로퍼티를 변경할 때만 성립합니다.

### 불변 객체

### 1-5-1 불변 객체를 만드는 간단한 방법

- 객체의 가변성에 따른 문제점
  - 참조형 데이터 프로퍼티를 복사하면 같은 주소를 참조하므로 복사된 객체의 프로퍼티 값을 수정하면 원본 객체의 프로퍼티 값도 수정됩니다.

```javascript
// 예제 1-10 객체의 가변성에 따른 문제점
var user ={
    name: "Jeenam",
    gender : "male"
};

var changeName = function name(user, newName) {
    var newUser = user;
    newUser.name = newName;

    return newUser;
}

var user2 = changeName(user, 'jung');

if(user !== user2){
    console.log('유저 정보가 변경되었습니다.');
}

console.log(user.name, user2.name);
console.log(user === user2);
```

```javascript
// 예제 1-11 객체의 가변성에 따른 문제점의 해결 방법
var user ={
    name: "Jeenam",
    gender : "male"
};

var changeName = function name(user, newName) {
    return {
        name: newName,
        gender : user
    }
}

var user2 = changeName(user, 'jung');

if(user !== user2){
    console.log('유저 정보가 변경되었습니다.');
}

console.log(user.name, user2.name);
console.log(user === user2);
```

- 함수가 새로운 객체를 반환하도록 수정
  - 새로운 객체를 반환하지만 기존 객체의 프로퍼티를 하드코딩으로 입력된 한계

```javascript
// 예제 1 - 12 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)
var user ={
    name: "Jeenam",
    gender : "male"
};

var copyObject = function name(target) {
    var result = {};
    for (var prop in target) {
        result[prop] = target[prop];
    }

    return result;
}

var user2 = copyObject(user);
user2.name = 'jung';

if(user !== user2){
    console.log('유저 정보가 변경되었습니다.');
}

console.log(user.name, user2.name);
console.log(user === user2);
```

### 1-5-2 얕은 복사와 깊은 복사

- 얕은 복사
  - 중첩된 객체에서 참조형 데이터가 저장된 프로퍼티를 복사할때 그 주솟값만  복사하는 방법
  - 사본을 바꾸면 원본도 바뀌고, 원본을 바꾸면 사본도 바뀝니다.

```javascript
// 예제 1 - 14 중첩된 객체에 대한 얕은 복사
var user ={
    name : 'jaenam',
    urls : {
        portfolio: 'https://portfolio.co.kr',
        blog: 'htps://blog.log',
        facebook: 'https://facebook.co.kr'
    }
};

var copyObject = function name(target) {
    var result = {};
    for (var prop in target) {
        result[prop] = target[prop];
    }

    return result;
};

var user2 = copyObject(user);

user.name = 'jung';
console.log(user.name === user2.name);

user.urls.portfolio = 'https:proli.com';
console.log(user.urls.portfolio === user.urls.portfolio);

user.urls.blog = 'https:blog.com';
console.log(user.urls.blog === user.urls.blog);
```

- 깊은 복사

```javascript
// 예제 1 - 15 중첩된 객체에 대한 깊은 복사
var user ={
    name : 'jaenam',
    urls : {
        portfolio: 'https://portfolio.co.kr',
        blog: 'htps://blog.log',
        facebook: 'https://facebook.co.kr'
    }
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

user.urls.portfolio = 'https:proli.com';
console.log(user.urls.portfolio === user2.urls.portfolio);

user.urls.blog = 'https:blog.com';
console.log(user.urls.blog === user2.urls.blog);
```

   ```javascript
   // 예제 1 - 17 깊은 복사 결과 확인
   var obj = {
       a: 1,
       b: {
           c: null,
           d: [1,2]
       }
   }
   
   var copyObjectDeep = function (target) {
       var result = {};
   
       if (typeof target === 'object' && target !== null) {
           for(var prop in target){
               result[prop] = copyObjectDeep(target[prop])
           }
       }else{
           result = target;
       }
   
       return result;
   }
   
   var obj2 = copyObjectDeep(obj);
   
   obj2.a = 2;
   obj2.b.c = 4;
   obj.b.d[1] = 3;
   
   console.log(obj);
   console.log(obj2);
   ```

```javascript
var obj = {
    a: 1,
    b: {
        c: null,
        d: {
            func1 : function () {
                console.log(3);
            }
        }
    },
    func2 : function(){
        console.log(4)
    }
};

var copyObjectViaJSON = function (target) {
    return JSON.parse(JSON.stringify(target));
};


var obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1];

console.log(obj);
console.log(obj2);
```

### undefined 와 null

`undefined`

- 자바스크립트 엔진은 사용자가 당연히 어떤 값을 지정할 것이라고 예상되는 상황임에도 실제로는 그렇게 하지 않을 때 반환하는 값 입니다.

`null`

- 사용자가 명시적으로 없음을 표현

`undefined`반환하는 경우

1. 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주로를 지정하지 않은 식별자에 접근할 때
2. 객체 내부의 존재하지 않는 프로퍼티에 접근하려고 할 때
3. `return` 문이 없거나 호출되지 않는 함수의 실행 결과

### 동등 연산자 와 일치 연산자

- 동등 연산자

  - `a == b`

  - 비교하려는 대상이 원본 데이터 형식과 일치하지 않으면 암묵적인 형변환을 하여 비교합니다.

    ```javascript
    var a = 10;
    var b = '10';
    console.log(a == b) //true
    ```

- 일치 연산자

  - `a === b`

  - 원본 데이터 형식과 비교하려는 대상이 같은 타입이어야 비교합니다.

    ```javascript
    var a = 10;
    var b = '10';
    console.log(a === b) //false
