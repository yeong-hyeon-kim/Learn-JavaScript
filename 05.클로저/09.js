var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

var alertFruitBuilder = () => {
  // 클로저 발생.
  return () => {
    alert("your choice is " + fruit);
  };
};

fruits.forEach((fruit) => {
  var $li = document.createElement("li");
  $li.innerHTML = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
