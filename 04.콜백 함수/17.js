var addCoffee = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 500);
  });
};

var coffeeMaker = async () => {
  var coffeeList = "";
  var _addCoffee = async (name) => {
    coffeeList += (coffeeList ? "," : "") + (await addCoffee(name));
  };

  await _addCoffee("에스프레소");
  console.log(coffeeList);

  await _addCoffee("아메리카노");
  console.log(coffeeList);

  await _addCoffee("카페모카");
  console.log(coffeeList);

  await _addCoffee("카페라떼");
  console.log(coffeeList);
};

coffeeMaker();
