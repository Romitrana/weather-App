// require("dotenv").config();
const cityE1 = document.getElementById("city");
const btnE1 = document.getElementById("btn");
const weather_conditionE1 = document.getElementById("cloudy");
const degreeE1 = document.getElementById("degree");
const maxE1 = document.getElementById("max");
const minE1 = document.getElementById("min");
const windE1 = document.getElementById("wind");
const humidityE1 = document.getElementById("humidity");
const img_weather = document.getElementById("image_weather");
const wrap_oneE1 = document.getElementById("wrap1");
const wrap_twoE2 = document.getElementById("wrap2");
const gobackE1 = document.getElementById("goback");
const cityNameE2 = document.getElementById("cityName");
const stateE1 = document.getElementById("state");
const countryE1 = document.getElementById("country");
const dateE1 = document.getElementById("date");
const monthE1 = document.getElementById("month");
const yearE1 = document.getElementById("year");
const warnE1 = document.getElementById("warn");
const errE1 = document.getElementById("err");
let longitude;
let latitude;
let country;
let state;
let temperature;
let max_temp;
let min_temp;
let humidity;
let icon;
let weather_condition;
let winds;
btnE1.addEventListener("click", () => {
  let cityName = cityE1.value;
  if (cityName !== "") {
    //fetching by city name for longitude/latitude
    wrap_oneE1.style.display = "none";
    const fetchAPI = fetch(`
    https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=EnterAPIkeyHere`);
    fetchAPI
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        longitude = response[0].lon;
        latitude = response[0].lat;
        country = response[0].country;
        state = response[0].state;

        //fetching by longitude/latitude
        const fetchAPI2 = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f27bd183229166b6ca493524773e0dc9`
        );
        fetchAPI2
          .then((response2) => {
            return response2.json();
          })
          .then((response2) => {
            temperature = response2.main.temp;
            max_temp = response2.main.temp_max;
            min_temp = response2.main.temp_min;
            humidity = response2.main.humidity;
            winds = response2.wind.speed;
            weather_condition = response2.weather[0].main;
            icon = response2.weather[0].icon;
            degreeE1.innerText = temperature;
            //calling data displaying function
            data_display(
              temperature,
              max_temp,
              min_temp,
              humidity,
              winds,
              weather_condition,
              icon,
              state,
              country
            );
          })
          .catch((error2) => {
            console.log("error2", error2);
          });
      })
      .catch((error) => {
        errE1.style.display = "block";
        errE1.style.zIndex = "6";
        wrap_twoE2.style.display = "none";
        console.log("error", error);
      });
    wrap_twoE2.style.display = "block";
  } else {
    warnE1.style.display = "block";
  }
  //---alert feature----
  cityE1.addEventListener("click", () => {
    warnE1.style.display = "none";
  });
});
gobackE1.addEventListener("click", () => {
  wrap_twoE2.style.display = "none";
  wrap_oneE1.style.display = "block";
});

function data_display(
  temperature,
  max_temp,
  min_temp,
  humidity,
  winds,
  weather_condition,
  icon,
  state,
  country
) {
  degreeE1.innerText = Math.trunc(temperature - 273.15);
  weather_conditionE1.innerText = weather_condition;
  maxE1.innerText = Math.round(max_temp - 273.15);
  minE1.innerText = Math.round(min_temp - 273.15);
  humidityE1.innerText = humidity;
  windE1.innerText = Math.round(winds * 3.6);
  img_weather.src = `https://openweathermap.org/img/w/${icon}.png`;
  cityNameE2.innerText = cityE1.value;
  stateE1.innerText = state;
  countryE1.innerText = country;
  var d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month;
  switch (d.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "Febuary";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "";
      break;
  }
  dateE1.innerText = date;
  yearE1.innerText = year;
  monthE1.innerText = month;
}

console.log("it's running");
