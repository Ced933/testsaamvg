// api key = bQUiDye9ApfNGmVKSKzBut2EaW6McX9W
//api key 2 = 1o3DRFog5CuRyEnDG50ASTRftDk39pAT

import { dataIcon } from "./dataIcon.js";
import { moodWeather } from "./mood.js";

let apiKey = "bQUiDye9ApfNGmVKSKzBut2EaW6McX9W";
// ------------------------
// ************ AFFICHAGE DES DONNÉES DE BASE LORSQU'ON ARRIVE SUR L'APPLICATION ************
// ------------------------

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
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=london`
    )
      .then((res) => res.json())
      .then((data) => {
        // On récupère le premier résultat et on l'affecte à maindetails
        mainDetails = data[0];
        // On récupère la clef pour avoir accès aux autres données
        keyCountrie = mainDetails.Key;
      });
  } catch (error) {
    console.error(error);
  }
  // si on reçoit mainDetails alors on peut à present lancer le deuxieme appel

  if (mainDetails) {
    try {
      await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${keyCountrie}?apikey=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          // on recupère les autre details comme les icons etc
          weatherDetails = data[0];
          //   console.log(weatherDetails);
        });
    } catch (error) {
      console.error(error);
    }
  }
  //   Notre fonction affichage avec les données qu'on vient de récupérer
  displayData(mainDetails, weatherDetails);
}
// La fonction fetchData s'exécutera une fois la page chargé
window.addEventListener("load", fetchData());

// ------------------------
// ************ AFFICHAGE DES DONNÉES LORSQU'ON FAIT UNE RECHERCHE ************
// ------------------------
// --------
let inputValue;

const inputSearch = document.querySelector("#search");
console.log(inputSearch);

// On recupère ce qu'on tape dans l'input
inputSearch.addEventListener("input", (e) => {
  //   console.log(e.target.value);
  inputValue = e.target.value;
});

const detailsContent = document.querySelector("#details-content");
// La fonction display va nous afficher coté client toutes les données.
// Paramètre array = les details de la ville, details = les données plus détaillé avec les icons
function displayData(array, details) {
  // pour avoir une températeur en nombre entier
  let temperatureWithoutComma = Math.ceil(details.Temperature.Metric.Value);

  let date = details.LocalObservationDateTime.slice(0, -15);
  console.log(date);

  // on recupère le iconWeather qui va correspondre à l'image de la température
  let icon = details.WeatherIcon;
  // On va pouvoir récupérer icon qui est un number en le faisant matcher avec l'id de notre icon dans le tableau qui est dans dataIcon.js
  let patheImg = dataIcon.filter((picture) => picture.id == icon);

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

  //   L'humeur à appliquer en fonction de la temperature
  displayMood(temperatureWithoutComma);
  //   Changement d'arriere plan en fonction de la temperature
  changeBackground(details.WeatherText);
}

// LORSQU'ON FAIT NOTRE RECHERCHE ET QUE L'ON CLIQUE SUR LA LOUPE

const searchBtn = document.querySelector("#search-btn");
// Même procédé que pour les données qui sont affichés de base

// pour la version string
let mainDetailsSearch = [];
let weatherDetailsSearch = [];
let keyCountrieSearch;

// pour la version number
let mainDetailsSearchCodePostal = [];
let weatherDetailsSearchCodePostal = [];
let keyCountrieSearchCodePostal;

searchBtn.addEventListener("click", async () => {
  detailsContent.innerHTML = "";

  console.log(inputValue);
  //   L'utilisateur à tapé une ville
  if (typeof inputValue === "string") {
    try {
      await fetch(
        ` https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${inputValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          mainDetailsSearch = data[0];
          keyCountrieSearch = mainDetailsSearch.Key;
        });
    } catch (error) {
      // on envoie une erreur dans la console
      console.error(error);
      //   on récupère ce qu'a tapé l'utilisateur en affichant un message d'erreur accompagné de ce qu'il à tapé
      errorMessage(inputValue);
      //   on vide l'input
      inputSearch.value = "";
      //   on bloque l'action de passer à l'etape suivante
      return false;
    }

    if (mainDetailsSearch) {
      try {
        await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearch}?apikey=${apiKey}`
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
    //   reset le formulaire apres avoir l'avoir soumis
    inputSearch.value = "";
  }
  //   L'utilisateur à tapé un code postal
  else if (typeof inputValue === "number") {
    console.log(postalCode);
    try {
      await fetch(
        ` https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${postalCode}`
      )
        .then((res) => res.json())
        .then((data) => {
          mainDetailsSearchCodePostal = data[0];
          keyCountrieSearchCodePostal = mainDetailsSearchCodePostal.Key;
          console.log(mainDetailsSearchCodePostal);
        });
    } catch (error) {
      console.error(error);
      errorMessage(inputValue);
      inputSearch.value = "";
      return false;
    }

    if (mainDetailsSearchCodePostal) {
      try {
        await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearchCodePostal}?apikey=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            weatherDetailsSearchCodePostal = data[0];
            console.log(weatherDetailsSearchCodePostal);
          });
      } catch (error) {
        console.error(error);
      }
    }
    displayData(mainDetailsSearchCodePostal, weatherDetailsSearchCodePostal);
    //   reset le formulaire apres avoir l'avoir soumis
    inputSearch.value = "";
  }
});

const moodDiv = document.querySelector("#mood");
// Function displayMood = en fonction de la temperature une humeur apparaîtra avec un lien youtube d'une musique
function displayMood(weather) {
  let moodFilter;
  // Si le mood est supérieur a 29 alors ça sera le mood 1 dans notre tableau d'objet ainsi de suite
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
// Fonction changeBackground = Le background s'adaptera en fonction de la description du temps
function changeBackground(typeOfWeather) {
  const arraySun = [
    "sunny",
    "mostly sunny",
    "partly sunny",
    "intermittent clouds",
    "hazy sunshine",
    "hot",
  ];

  let arrayCloudy = [
    "cloudy",
    "mostly cloudy",
    "dreary (overcast)",
    "fog",
    "windy",
  ];

  let arrayRain = [
    "showers",
    "mostly cloudy w/ showers",
    "partly sunny w/ showers",
    "t-storms",
    "mostly cloudy w/ t-Storms",
    "partly sunny w/ t-Storms",
    "rain",
    "sleet",
    "freezing rain",
    "rain and snow",
  ];

  let arraySnow = [
    "flurries",
    "mostly cloudy w/ flurries",
    "partly sunny w/ flurries",
    "snow ",
    "mostly cloudy w/ snow",
    "ice",
    "cold ",
  ];
  let night = [
    "clear",
    "mostly Clear",
    "partly Cloudy",
    "intermittent Clouds",
    "hazy Moonlight",
    "mostly cloudy",
    "partly cloudy w/ showers",
    "mostly cloudy w/ showers",
    "partly cloudy w/ t-Storms",
    "mostly cloudy w/ t-Storms",
    "mostly cloudy w/ flurries",
    "mostly cloudy w/ snow",
  ];

  if (arraySun.includes(typeOfWeather.toLowerCase())) {
    bodyhtml.style.background =
      "url('./images/pexels-khanh-le-207985-666839.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arrayCloudy.includes(typeOfWeather.toLowerCase())) {
    bodyhtml.style.background =
      "url('./images/pexels-pixabay-414659.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arrayRain.includes(typeOfWeather.toLowerCase())) {
    bodyhtml.style.background =
      "url('./images/pexels-chriskane-166360.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (arraySnow.includes(typeOfWeather.toLowerCase())) {
    bodyhtml.style.background =
      "url('./images/pexels-adam-lukac-254247-773953.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  } else if (night.includes(typeOfWeather.toLowerCase())) {
    bodyhtml.style.background =
      "url('./images/pexels-dan-hadley-360599-6017481.jpg') no-repeat";
    bodyhtml.style.backgroundSize = "cover";
  }
}
