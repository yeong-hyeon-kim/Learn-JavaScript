var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

var alertFruit = () => {
  // 클로저 발생.
  alert("your choice is " + fruit);
};

fruits.forEach(() => {
  var $li = document.createElement("li");
  $li.innerHTML = fruit;
  $li.addEventListener("click", alertFruit);
  $ul.appendChild($li);
});

document.body.appendChild($ul);
alertFruit(fruits[1]);
