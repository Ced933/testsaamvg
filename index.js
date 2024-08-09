// api key = bQUiDye9ApfNGmVKSKzBut2EaW6McX9W
//api key 2 = 1o3DRFog5CuRyEnDG50ASTRftDk39pAT

import { dataIcon } from "./dataIcon.js";
import { moodWeather } from "./mood.js";

let apiKey = "1o3DRFog5CuRyEnDG50ASTRftDk39pAT";

console.log(dataIcon);
// mainDetails = la fiche du pays sans les icon et la date
let mainDetails = [];
// weatherDetails = données du pays plus détaillé avec icon date
let weatherDetails = [];
// la clef du pays pour avoir accès aux weatherdetails
// conclusion : On a besoin de faire 2 appels une pour le pays et une autre pour avoir le details de la temperature
let keyCountrie;
// Fonction fetchData est la donnée qui s'affichera par default
async function fetchData() {
  try {
    await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=london`
    )
      .then((res) => res.json())
      .then((data) => {
        //   displayData(data[0]);
        mainDetails = data[0];
        keyCountrie = mainDetails.Key;
        //   keyCountrie = key;
        console.log(mainDetails);
      });
  } catch (error) {
    console.error(error);
  }

  if (mainDetails) {
    try {
      await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrie}?apikey=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          weatherDetails = data[0];
          console.log(weatherDetails);
        });
    } catch (error) {
      console.error(error);
    }
  }

  displayData(mainDetails, weatherDetails);
}

fetchData();

let city = "";
let postalCode;

const inputSearch = document.querySelector("#search");
console.log(inputSearch);

// On recupère ce qu'on tape dans l'input
inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);

  let inputValue = e.target.value;
  // grace a checkStrinf on va vérifier si l'utilisateur entre des lettre ou des chiffre pour pouvoir orienter la recherche soit sur du string pour le nom de la ville soit sur du number donc code postal
  let checkString = /^[a-zA-Z ]+$/.test(inputValue);
  // si c'est vrai alors l'utilisateur tape le nom de la ville sinon il tape un code postal
  if (checkString == true) {
    city = e.target.value;
    console.log("c'est bien un string");
  } else if (checkString == false) {
    postalCode = e.target.value;
    console.log("c'est bien un number");
  } else {
    console.log("il y a une erreur");
    return false;
  }
});

// la fonction qui va nous afficher coté client toutes les données. array = les details de la ville, details = les données plus détaillé avec les icons
const detailsContent = document.querySelector("#details-content");
function displayData(array, details) {
  // pour avoir une températeur en nombre entier
  let temperatureWithoutComma = Math.ceil(details.Temperature.Metric.Value);

  let date = details.LocalObservationDateTime.slice(0, -15);
  console.log(date);

  // on recupère le iconWeather qui va correspondre a l'image de la température
  let icon = details.WeatherIcon;
  console.log(icon);
  // On va pouvoir récupérer icon qui est un number en le faisant matcher avec l'id de notre icon dans le tableau qui est dans dataIcon.js
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

  //   Le mood à appliquer en fonction de la temperature
  displayMood(temperatureWithoutComma);
  changeBackground(details.WeatherText);
  console.log(details.WeatherText);
}

// LORSQU'ON FAIT NOTRE RECHERCHE ET QUE L'ON CLIQUE SUR LA LOUPE

const searchBtn = document.querySelector("#search-btn");
let mainDetailsSearch = [];
let weatherDetailsSearch = [];
let keyCountrieSearch;

searchBtn.addEventListener("click", async () => {
  console.log(city);
  //   L'utilisateur à tapé une ville
  if (city) {
    try {
      await fetch(
        ` http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
      )
        .then((res) => res.json())
        .then((data) => {
          //   displayData(data[0]);
          mainDetailsSearch = data[0];
          keyCountrieSearch = mainDetailsSearch.Key;
          //   keyCountrie = key;
          console.log(mainDetailsSearch);
        });
    } catch (error) {
      // on envoie une erreur dans la console
      console.error(error);
      //   on récupère ce qu'a tapé l'utilisateur en affichant un message d'erreur accompagné de ce qu'il à tapé
      errorMessage(city);
      //   on vide l'input
      inputSearch.value = "";
      //   on bloque l'action de passer a l'etape suivante
      return false;
    }

    // si on reçoit mainDetailsSearch alors on peut à present lancer le deuxieme appel
    if (mainDetailsSearch) {
      try {
        await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearch}?apikey=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            weatherDetailsSearch = data[0];
            console.log(weatherDetailsSearch);
          });
      } catch (err) {
        console.error(err);
      }
    }
    // On a bien reçu les donnés, on les affiche maintenant
    displayData(mainDetailsSearch, weatherDetailsSearch);
  }
  //   L'utilisateur à tapé un code postal
  else if (postalCode) {
    try {
      await fetch(
        ` http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${postalCode}`
      )
        .then((res) => res.json())
        .then((data) => {
          mainDetailsSearch = data[0];
          keyCountrieSearch = mainDetailsSearch.Key;
          console.log(mainDetailsSearch);
        });
    } catch (error) {
      console.error(error);
      errorMessage(city);
      inputSearch.value = "";
      return false;
    }

    if (mainDetailsSearch) {
      try {
        await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearch}?apikey=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            weatherDetailsSearch = data[0];
            console.log(weatherDetailsSearch);
          });
      } catch (error) {
        console.error(error);
      }
    }
    // lorsqu'on a toutes les donnés on peut maintenant les afficher
    displayData(mainDetailsSearch, weatherDetailsSearch);
  }
  //   reset le formulaire apres avoir l'avoir soumis
  inputSearch.value = "";
});

const moodDiv = document.querySelector("#mood");
// Function Mood
function displayMood(weather) {
  let moodFilter;

  //   let degree = 15;
  // Si le mood est supérieur a 29 alors ça sera le mood 1 dans notre tableau d'objet
  if (weather > 29) {
    moodFilter = moodWeather.filter((mood) => mood.id === 1);
    console.log(moodFilter[0]);
  } else if (weather >= 21 && weather < 29) {
    moodFilter = moodWeather.filter((mood) => mood.id === 2);
    console.log(moodFilter[0]);
  } else if (weather < 21 && weather >= 10) {
    moodFilter = moodWeather.filter((mood) => mood.id === 3);
    console.log(moodFilter[0]);
  } else if (weather < 10) {
    moodFilter = moodWeather.filter((mood) => mood.id === 4);
    console.log(moodFilter[0]);
  } else {
    console.log("erreur");
  }

  moodDiv.innerHTML = `
      
                  <p>${moodFilter[0].phase}</p>
                  <a  target="_blank" href="${moodFilter[0].musique}" >Musique qui va avec 🎶</a>
      
          `;
}

// Message d'erreur lorsqu'on trouve pas la recherche de l'utilisateur
function errorMessage(search) {
  detailsContent.innerHTML = `
    <p class='error'>🙁 Désolé nous n'avons trouvé aucun résultat pour ${search} <p>
    `;

  moodDiv.innerHTML = "";
}

const bodyhtml = document.querySelector("#body");

function changeBackground(typeOfWeather) {
  const arraySun = [
    "Sunny",
    "Mostly sunny",
    "Partly Sunny",
    "Intermittent Clouds",
    "Hazy Sunshine",
    "Mostly Cloudy",
    "Hot",
  ];

  let arrayCloudy = ["Cloudy", "Dreary (Overcast)", "Fog", "Windy"];

  let arrayRain = [
    "Showers",
    "Mostly Cloudy w/ Showers",
    "Partly Sunny w/ Showers",
    "T-Storms",
    "Mostly Cloudy w/ T-Storms",
    "Partly Sunny w/ T-Storms",
    "Rain",
    "Sleet",
    "Freezing Rain",
    "Rain and Snow",
  ];

  let arraySnow = [
    "Flurries",
    "Mostly Cloudy w/ Flurries",
    "Partly Sunny w/ Flurries",
    "Snow ",
    "Mostly Cloudy w/ Snow",
    "Ice",
    "Cold ",
  ];
  let night = [
    "Clear",
    "Mostly Clear",
    "Partly Cloudy",
    "Intermittent Clouds",
    "Hazy Moonlight",
    "Mostly Cloudy",
    "Partly Cloudy w/ Showers",
    "Mostly Cloudy w/ Showers",
    "Partly Cloudy w/ T-Storms",
    "Mostly Cloudy w/ T-Storms",
    " Mostly Cloudy w/ Flurries",
    "Mostly Cloudy w/ Snow",
  ];

  console.log(arraySun.includes(typeOfWeather));

  if (arraySun.includes(typeOfWeather)) {
    bodyhtml.style.background =
      "url('./images/pexels-khanh-le-207985-666839.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arrayCloudy.includes(typeOfWeather)) {
    bodyhtml.style.background =
      "url('./images/pexels-pixabay-414659.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arrayRain.includes(typeOfWeather)) {
    bodyhtml.style.background =
      "url('./images/pexels-chriskane-166360.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arraySnow.includes(typeOfWeather)) {
    bodyhtml.style.background =
      "url('./images/pexels-adam-lukac-254247-773953.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (night.includes(typeOfWeather)) {
    bodyhtml.style.background =
      "url('./images/pexels-dan-hadley-360599-6017481.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  }
}
