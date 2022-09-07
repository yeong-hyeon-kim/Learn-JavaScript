var outer = () => {
  var a = 1;
  var inner = () => {
    console.log(++a);
  };
  inner();
};
outer;
