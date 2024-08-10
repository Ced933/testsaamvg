const mood = document.querySelector("#mood");

import { moodWeather } from "./mood.js";
console.log(moodWeather);
//  On va sauvegarder le mood qui correspond à la temperature
function displayMood() {
  let moodFilter;

  let degree = 15;
  //   Si le mood est supérieur a 29 alors ça sera le mood 1 dans notre tableau d'objet
  if (degree > 29) {
    moodFilter = moodWeather.filter((mood) => mood.id === 1);
    console.log(moodFilter[0]);
  } else if (degree >= 21 && degree < 29) {
    moodFilter = moodWeather.filter((mood) => mood.id === 2);
    console.log(moodFilter[0]);
  } else if (degree < 21 && degree >= 10) {
    moodFilter = moodWeather.filter((mood) => mood.id === 3);
    console.log(moodFilter[0]);
  } else if (degree < 10) {
    moodFilter = moodWeather.filter((mood) => mood.id === 4);
    console.log(moodFilter[0]);
  } else {
    console.log("erreur");
  }

  mood.innerHTML = `

                <p>${moodFilter[0].phase}</p>
                <a  target="_blank" href="${moodFilter[0].musique}" >Musique qui va avec 🎶</a>

        `;
}
displayMood();

// const bodyhtml = document.querySelector("#body");

// function changeBackground(typeOfWeather) {
//   const arraySun = [
//     "Sunny",
//     "Mostly Sunny",
//     "Partly Sunny",
//     "Intermittent Clouds",
//     "Hazy Sunshine",
//     "Mostly Cloudy",
//     "Hot",
//   ];

//   let arrayCloudy = ["Cloudy", "Dreary (Overcast)", "Fog", "Windy"];

//   let arrayRain = [
//     "Showers",
//     "Mostly Cloudy w/ Showers",
//     "Partly Sunny w/ Showers",
//     "T-Storms",
//     "Mostly Cloudy w/ T-Storms",
//     "Partly Sunny w/ T-Storms",
//     "Rain",
//     "Sleet",
//     "Freezing Rain",
//     "Rain and Snow",
//   ];

//   let arraySnow = [
//     "Flurries",
//     "Mostly Cloudy w/ Flurries",
//     "Partly Sunny w/ Flurries",
//     "Snow ",
//     "Mostly Cloudy w/ Snow",
//     "Ice",
//     "Cold ",
//   ];
//   let night = [
//     "Clear",
//     "Mostly Clear",
//     "Partly Cloudy",
//     "Intermittent Clouds",
//     "Hazy Moonlight",
//     "Mostly Cloudy",
//     "Partly Cloudy w/ Showers",
//     "Mostly Cloudy w/ Showers",
//     "Partly Cloudy w/ T-Storms",
//     "Mostly Cloudy w/ T-Storms",
//     " Mostly Cloudy w/ Flurries",
//     "Mostly Cloudy w/ Snow",
//   ];

//   console.log(arraySun.includes(typeOfWeather));

//   if (arraySun.includes(typeOfWeather)) {
//     bodyhtml.style.background =
//       "url('./images/pexels-khanh-le-207985-666839.jpg') no-repeat";
//     bodyhtml.style.backgroundSize = "cover";
//   } else if (arrayCloudy.includes(typeOfWeather)) {
//     bodyhtml.style.background =
//       "url('./images/pexels-pixabay-414659.jpg') no-repeat";
//     bodyhtml.style.backgroundSize = "cover";
//   } else if (arrayRain.includes(typeOfWeather)) {
//     bodyhtml.style.background =
//       "url('./images/pexels-chriskane-166360.jpg') no-repeat";
//     bodyhtml.style.backgroundSize = "cover";
//   } else if (arraySnow.includes(typeOfWeather)) {
//     bodyhtml.style.background =
//       "url('./images/pexels-adam-lukac-254247-773953.jpg') no-repeat";
//     bodyhtml.style.backgroundSize = "cover";
//   } else if (night.includes(typeOfWeather)) {
//     bodyhtml.style.background =
//       "url('./images/pexels-dan-hadley-360599-6017481.jpg') no-repeat";
//     bodyhtml.style.backgroundSize = "cover";
//   }
// }
// let word = "Rain";
// changeBackground(word);

const searchBtn = document.querySelector("#search-btn");
let mainDetailsSearch = [];
let weatherDetailsSearch = [];
let keyCountrieSearch;

let mainDetailsSearchCodePostal = [];
let weatherDetailsSearchCodePostal = [];
let keyCountrieSearchCodePostal;

searchBtn.addEventListener("click", async () => {
  detailsContent.innerHTML = "";

  console.log(city);
  //   L'utilisateur à tapé une ville
  if (city) {
    postalCode = "";

    try {
      await fetch(
        ` http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
      )
        .then((res) => res.json())
        .then((data) => {
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
    //   reset le formulaire apres avoir l'avoir soumis
    inputSearch.value = "";
  }
  //   L'utilisateur à tapé un code postal
  else if (postalCode) {
    city = "";

    console.log(postalCode);
    try {
      await fetch(
        ` http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${postalCode}`
      )
        .then((res) => res.json())
        .then((data) => {
          mainDetailsSearchCodePostal = data[0];
          keyCountrieSearchCodePostal = mainDetailsSearchCodePostal.Key;
          console.log(mainDetailsSearchCodePostal);
        });
    } catch (error) {
      console.error(error);
      errorMessage(city);
      inputSearch.value = "";
      return false;
    }

    if (mainDetailsSearchCodePostal) {
      try {
        await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearchCodePostal}?apikey=${apiKey}`
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
    // lorsqu'on a toutes les donnés on peut maintenant les afficher
    displayData(mainDetailsSearchCodePostal, weatherDetailsSearchCodePostal);
    //   reset le formulaire apres avoir l'avoir soumis
    inputSearch.value = "";
  }
});
