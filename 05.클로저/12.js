var createCar = () => {
  var fuel = Math.ceil(Math.random() * 10 + 10);
  var power = Math.ceil(Math.random() * 3 + 2);
  var moved = 0;
  var publicMembers = {
    get moved() {
      return moved;
    },

    run: () => {
      var Km = Math.ceil(Math.random() * 6);
      var wasteFuel = Km / power;

      if (this.fuel < wasteFuel) {
        console.log("이동 불가");
        return;
      }

      fuel -= wasteFuel;
      moved += Km;
      console.log(Km + "Km 이동 (총 " + moved + "Km), 남은 연료: " + fuel);
    },
  };
  Object.freeze(publicMembers);
  return publicMembers;
};
