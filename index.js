// api key = 0c8b8326153eec2588a0cb95677df6f2
function fetchData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=0c8b8326153eec2588a0cb95677df6f2"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

fetchData();

let country = "";

const inputSearch = document.querySelector("#search");
console.log(inputSearch);

// On recupère ce qu'on tape dans l'input
inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  country = e.target.value;
  console.log(country);
});

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  alert("ok");
});
