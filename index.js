// api key = 0c8b8326153eec2588a0cb95677df6f2
async function fetchData() {
  await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=0c8b8326153eec2588a0cb95677df6f2"
  )
    .then((res) => res.json())
    .then((data) => {
      displayData(data);
      console.log(data);
    });
}

fetchData();

let country = "";
let arrayCountry = [];

const inputSearch = document.querySelector("#search");
console.log(inputSearch);

// On recupère ce qu'on tape dans l'input
inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  country = e.target.value;
});

function displayData(array) {
  const detailsContent = document.querySelector("#details-content");
  //   La température de base est en kelvin il suffit de faire - 273.15 pour trouver la temperature en celsium
  let kelvinTurnToCelsius = Math.ceil(array.main.temp - 273.15);
  //   Ce calcul nous permet de trouver le timestamp du pays pour lequel on a fait la recherche pour pouvoir trouver la date du pays en question

  let date = new Date(array.dt * 1000 + array.timezone); // Thu Aug 08 2024 01:28:28 GMT+0200 (heure d’été d’Europe centrale)

  let currentDate = date.toDateString().slice(0, -5); // pour obtenir Thu Aug 08

  console.log(date);

  detailsContent.innerHTML = `
      
       <h1 class="weather">${kelvinTurnToCelsius}°</h1>
  
            <div>
              <h2 class="h2-city">${array.name}</h2>
              <p>${currentDate}</p>
            </div>
  
            <div>
              <img src="http://openweathermap.org/img/w/${array.weather[0].icon}.png"   /> 
              <p>${array.weather[0].main}</p>
            </div>
      `;
}

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", async () => {
  console.log(country);
  await fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=0c8b8326153eec2588a0cb95677df6f2`
  )
    .then((res) => res.json())
    .then((data) => (arrayCountry = data));
  console.log(arrayCountry.name);
  displayData(arrayCountry);
});
