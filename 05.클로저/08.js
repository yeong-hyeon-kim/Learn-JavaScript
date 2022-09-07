var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

var alertFruit = () => {
  // 클로저 발생.
  alert("your choice is " + fruit);
};

fruits.forEach((fruit) => {
  var $li = document.createElement("li");
  $li.innerHTML = fruit;
  $li.addEventListener("click", alertFruit.bind(null, fruit));
  $ul.appendChild($li);
});
