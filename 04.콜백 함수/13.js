var CoffeeList = "";

let addEspresso = (name) => {
  CoffeeList = name;
  console.log(CoffeeList);

  setTimeout(addAmericano, 500, "아메리카노");
};

let addAmericano = (name) => {
  CoffeeList += +", " + name;
  console.log(CoffeeList);

  setTimeout(addMocha, 500, "카페모카");
};

let addMocha = (name) => {
  CoffeeList += +", " + name;
  console.log(CoffeeList);

  setTimeout(addLatte, 500, "카페라떼");
};

let addLatte = (name) => {
  CoffeeList += +", " + name;
  console.log(CoffeeList);
};

setTimeout(addEspresso, 500, "에스프레소");
