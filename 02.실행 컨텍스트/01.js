// var a = 1;

// var outer = function() {
//     var inner = function () {
//         console.log(a);
//         var a = 3;
//     }

//     inner();
//     console.log();
// }

// outer();
// console.log(a);

var a = 1;

function outer() {
  function inner() {
    console.log(a);
    var a = 3;
  }

  inner();
  console.log();
}

outer();
console.log(a);
