const searchBtn = document.querySelector("#search-btn");
let mainDetailsSearch = [];
let weatherDetailsSearch = [];
let keyCountrieSearch;

// let mainDetailsSearchCodePostal = [];
// let weatherDetailsSearchCodePostal = [];
// let keyCountrieSearchCodePostal;

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
  //   else if (postalCode) {
  //     city = "";

  //     console.log(postalCode);
  //     try {
  //       await fetch(
  //         ` http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${postalCode}`
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           mainDetailsSearchCodePostal = data[0];
  //           keyCountrieSearchCodePostal = mainDetailsSearchCodePostal.Key;
  //           console.log(mainDetailsSearchCodePostal);
  //         });
  //     } catch (error) {
  //       console.error(error);
  //       errorMessage(city);
  //       inputSearch.value = "";
  //       return false;
  //     }

  //     if (mainDetailsSearchCodePostal) {
  //       try {
  //         await fetch(
  //           `http://dataservice.accuweather.com/currentconditions/v1/${keyCountrieSearchCodePostal}?apikey=${apiKey}`
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             weatherDetailsSearchCodePostal = data[0];
  //             console.log(weatherDetailsSearchCodePostal);
  //           });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //     // lorsqu'on a toutes les donnés on peut maintenant les afficher
  //     displayData(mainDetailsSearchCodePostal, weatherDetailsSearchCodePostal);
  //     //   reset le formulaire apres avoir l'avoir soumis
  //     inputSearch.value = "";
  //   }
});
