// // const mood = document.querySelector("#mood");

// // import { moodWeather } from "./mood.js";
// // // console.log(moodWeather);
// // // On va sauvegarder le mood qui correspond à la temperature
// // function displayMood() {
// //   let moodFilter;

// //   let degree = 15;
// //   // Si le mood est supérieur a 29 alors ça sera le mood 1 dans notre tableau d'objet
// //   if (degree > 29) {
// //     moodFilter = moodWeather.filter((mood) => mood.id === 1);
// //     console.log(moodFilter[0]);
// //   } else if (degree >= 21 && degree < 29) {
// //     moodFilter = moodWeather.filter((mood) => mood.id === 2);
// //     console.log(moodFilter[0]);
// //   } else if (degree < 21 && degree >= 10) {
// //     moodFilter = moodWeather.filter((mood) => mood.id === 3);
// //     console.log(moodFilter[0]);
// //   } else if (degree < 10) {
// //     moodFilter = moodWeather.filter((mood) => mood.id === 4);
// //     console.log(moodFilter[0]);
// //   } else {
// //     console.log("erreur");
// //   }

// //   mood.innerHTML = `

// //                 <p>${moodFilter[0].phase}</p>
// //                 <a  target="_blank" href="${moodFilter[0].musique}" >Musique qui va avec 🎶</a>

// //         `;
// // }
// // displayMood();
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
