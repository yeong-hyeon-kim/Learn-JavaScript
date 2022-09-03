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
