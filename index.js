function updateLinearChart(a, t, g, c) {
  document.getElementById("bar-a").style.width = a + "%";
  document.getElementById("bar-t").style.width = t + "%";
  document.getElementById("bar-g").style.width = g + "%";
  document.getElementById("bar-c").style.width = c + "%";
  document.querySelector(".a-label").innerText = `A: ${a}%`;
  document.querySelector(".t-label").innerText = `T: ${t}%`;
  document.querySelector(".c-label").innerText = `C: ${c}%`;
  document.querySelector(".g-label").innerText = `G: ${g}%`;
}
updateLinearChart(35, 25, 20, 20);

const activetab = document.querySelector(".comparison__ctbwitemslc");
console.log(activetab);

activetab.scrollIntoView({
  behavior: 'smooth', // Yumshoq surilish
  block: 'nearest',   // Eng yaqin joyga
  inline: 'center'
})

