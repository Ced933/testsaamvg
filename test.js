// const mood = document.querySelector("#mood");

// import { moodWeather } from "./mood.js";
// // console.log(moodWeather);
// // On va sauvegarder le mood qui correspond à la temperature
// function displayMood() {
//   let moodFilter;

//   let degree = 15;
//   // Si le mood est supérieur a 29 alors ça sera le mood 1 dans notre tableau d'objet
//   if (degree > 29) {
//     moodFilter = moodWeather.filter((mood) => mood.id === 1);
//     console.log(moodFilter[0]);
//   } else if (degree >= 21 && degree < 29) {
//     moodFilter = moodWeather.filter((mood) => mood.id === 2);
//     console.log(moodFilter[0]);
//   } else if (degree < 21 && degree >= 10) {
//     moodFilter = moodWeather.filter((mood) => mood.id === 3);
//     console.log(moodFilter[0]);
//   } else if (degree < 10) {
//     moodFilter = moodWeather.filter((mood) => mood.id === 4);
//     console.log(moodFilter[0]);
//   } else {
//     console.log("erreur");
//   }

//   mood.innerHTML = `

//                 <p>${moodFilter[0].phase}</p>
//                 <a  target="_blank" href="${moodFilter[0].musique}" >Musique qui va avec 🎶</a>

//         `;
// }
// displayMood();
