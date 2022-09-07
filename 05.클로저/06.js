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
