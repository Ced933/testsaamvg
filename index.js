// api key = bQUiDye9ApfNGmVKSKzBut2EaW6McX9W
// let arrayCountryMain;
//  postal "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W&q=93300"

import { dataIcon } from "./dataIcon.js";

console.log(dataIcon);
let mainDetails = [];
let weatherDetails = [];
let keyCountrie;
async function fetchData() {
  try {
    await fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W&q=london"
    )
      .then((res) => res.json())
      .then((data) => {
        //   displayData(data[0]);
        mainDetails = data[0];
        keyCountrie = mainDetails.Key;
        //   keyCountrie = key;
        console.log(mainDetails);
      });
  } catch (err) {
    console.log(err);
  }

  if (mainDetails) {
    try {
      await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrie}?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W`
      )
        .then((res) => res.json())
        .then((data) => {
          weatherDetails = data[0];
          console.log(weatherDetails);
        });
    } catch (err) {
      console.log(err);
    }
  }
  //   fusionne les tableau
  //   let arrayCountryMain = [...mainDetails, ...weatherDetails];
  //   console.log(arrayCountryMain);
  displayData(mainDetails, weatherDetails);
}

fetchData();

let country = "";
let arrayCountry = [];
let postalCode;

const inputSearch = document.querySelector("#search");
console.log(inputSearch);

// On recupère ce qu'on tape dans l'input
inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);

  let inputValue = e.target.value;
  // on check si l'utilisateur entre des lettre
  let checkString = /^[a-zA-Z ]+$/.test(inputValue);
  // si c'est vrai alors ça sera une recherche avec le nom de la ville
  if (checkString == true) {
    country = e.target.value;
    console.log("c'est bien un string");
  } else if (checkString == false) {
    postalCode = e.target.value;
    console.log("c'est bien un number");
  } else {
    console.log("il y a une erreur");
    return false;
  }
});

function displayData(array, details) {
  const detailsContent = document.querySelector("#details-content");
  // pour avoir une températeur en nombre entier
  let temperatureWithoutComma = Math.ceil(details.Temperature.Metric.Value);
  let date = details.LocalObservationDateTime.slice(0, -15);
  console.log(date);

  // on recupère le iconWeather qui va correspondre a l'image de la température
  let icon = details.WeatherIcon;
  console.log(icon);
  // On va pouvoir récupérer le path de notre icon
  let patheImg = dataIcon.filter((picture) => picture.id == icon);
  console.log(patheImg);

  detailsContent.innerHTML = `
      
       <h1 class="weather">${temperatureWithoutComma}°</h1>
  
            <div>
              <h2 class="h2-city">${array.EnglishName}</h2>
              <p>${date}</p>
            </div>
  
            <div>
              <img src="./WeatherIcon/${patheImg[0].path}.png"   /> 
              <p>${details.WeatherText}</p>
            </div>
      `;
}

const searchBtn = document.querySelector("#search-btn");
let mainDetailsSearch = [];
let weatherDetailsSearch = [];
let keyCountrieSearch;

searchBtn.addEventListener("click", async () => {
  console.log(country);
  if (country) {
    await fetch(
      ` http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W&q=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        //   displayData(data[0]);
        mainDetailsSearch = data[0];
        keyCountrieSearch = mainDetailsSearch.Key;
        //   keyCountrie = key;
        console.log(mainDetailsSearch);
      });

    if (mainDetailsSearch) {
      await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearch}?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W`
      )
        .then((res) => res.json())
        .then((data) => {
          weatherDetailsSearch = data[0];
          console.log(weatherDetailsSearch);
        });
    }

    displayData(mainDetailsSearch, weatherDetailsSearch);
  } else if (postalCode) {
    await fetch(
      ` http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W&q=${postalCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        //   displayData(data[0]);
        mainDetailsSearch = data[0];
        keyCountrieSearch = mainDetailsSearch.Key;
        //   keyCountrie = key;
        console.log(mainDetailsSearch);
      });
  }
  if (mainDetailsSearch) {
    await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearch}?apikey=bQUiDye9ApfNGmVKSKzBut2EaW6McX9W`
    )
      .then((res) => res.json())
      .then((data) => {
        weatherDetailsSearch = data[0];
        console.log(weatherDetailsSearch);
      });
  }

  displayData(mainDetailsSearch, weatherDetailsSearch);
});
