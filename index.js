// api key = 0c8b8326153eec2588a0cb95677df6f2
function fetchData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=london&APPID=0c8b8326153eec2588a0cb95677df6f2"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

fetchData();
