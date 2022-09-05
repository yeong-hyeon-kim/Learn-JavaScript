setTimeout(() => {
  console.log(this);
}, 300);

[1, 2, 3, 4, 5].forEach((x) => {
  console.log(this);
});

document.body.innerHTML += "<button id='a'>클릭</button>";
document.body.querySelector("a").addEventListener("click", (e) => {
  console.log(this, e);
});
