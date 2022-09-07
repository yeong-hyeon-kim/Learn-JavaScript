// Public return O
// Private retrun X

var car = {
  fuel: Math.ceil(Math.random() * 10 + 10),
  power: Math.ceil(Math.random() * 3 + 2),
  moved: 0,
  run: () => {
    var Km = Math.ceil(Math.random() * 6);
    var wasteFuel = Km / this.power;

    if (this.fuel < wasteFuel) {
      console.log("이동불가");
      return;
    }

    this.fuel -= wasteFuel;
    this.moved += Km;
    console.log(Km + "Km 이동 (총 " + this.moved + "Km)");
  },
};
