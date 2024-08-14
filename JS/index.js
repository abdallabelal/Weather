var search = document.querySelector('input');
var Name = document.querySelector(".today.forecast .day");
var Dateday = document.querySelector(".today.forecast .date");
var Month = document.querySelector(".today.forecast .dayAMonth");

var city = document.querySelector(
  ".today.forecast .forecast-body .city"
);
var degree = document.querySelector(
  ".today.forecast .forecast-body .degree"
);
var weatherCondition = document.querySelector(
  ".today.forecast .forecast-body .weatherCondition"
);
var humidity = document.querySelector(
  ".today.forecast .forecast-body .humidity span"
);
var winds = windsForecast = document.querySelector(
  ".today.forecast .forecast-body .winds span"
);
var weatherTrend = document.querySelector(
  ".today.forecast .forecast-body .weatherTrend span"
);
var TomorrowName = document.querySelector(".tomorrow.forecast .day");
var tommorowdegree = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .forecast-icon img")
var maxTemperature = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .maxTemperature"
);
var minTemperature = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .minTemperature"
);
var weatherConditionTomorrow = document.querySelector(
  ".tomorrow.forecast .forecast-body .weatherCondition"
);


var Days = [  "Sunday",  "Monday", "Tuesday", "Wednesday",  "Thursday",  "Friday", "Saturday",];

var months = [
  "January","February", "March","April", "May", "June","July","August",
  "September", "October", "November","December",];
  
 
var AfterTomorrowName = document.querySelector(".after-tomorrow.forecast .day");
var degreeAfterTomorrow = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .forecast-icon img");
var maxDegreeAfterTomorrow = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .maxTemperature");
var minDegreeAfterTomorrow = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .minTemperature");
var weatherConditionAfterTomorrow = document.querySelector('.after-tomorrow.forecast .forecast-body .weatherCondition');




async function getWeather(searchLocation) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e1baaf75a72f4cd8a4462359242703&q=${searchLocation}&days=7`
  );
  var data = await response.json();
  
  displayData(data);
  displayTomorrow(data);
  displayAfterTomorrow(data);
}
getWeather("london");

let history = new Date();

var getDay = history.getDay();
var printDay = Days[getDay];


var getDate = history.getDate();


var getMonth = history.getMonth();
var getMonth = months[getMonth];

function displayData(show) {
  Name.innerHTML = printDay;
  Dateday.innerHTML = getDate;
  Month.innerHTML = getMonth;
  city.innerHTML = show.location.name;

  degree.innerHTML = `<div class="fw-bolder text-white">${show.current.temp_c}<sup>o</sup>C</div> 
  <span class="forecast-icon d-block"> 
  <img src="https:${show.current.condition.icon}" alt="weatherapi"/> 
  </span>`;

  weatherCondition.innerHTML = show.current.condition.text;
  humidity.innerHTML = show.current.humidity;
  winds.innerHTML = `${show.current.wind_degree}km/h`;
  weatherTrend.innerHTML = show.current.wind_dir;
}

function displayTomorrow(tomorrow) {
  getDay++
  if(getDay==7){
    getDay=0
  }
  
  TomorrowName.innerHTML = Days[getDay];
  tommorowdegree.setAttribute(
    "src",
    `https:${tomorrow.forecast.forecastday[1].day.condition.icon}`
  );
  maxTemperature.innerHTML = `${tomorrow.forecast.forecastday[1].day.maxtemp_c}&#176;C`;
  minTemperature.innerHTML = `${tomorrow.forecast.forecastday[1].day.mintemp_c}&#176`;
  weatherConditionTomorrow.innerHTML =
    tomorrow.forecast.forecastday[1].day.condition.text;
}

function displayAfterTomorrow(afterTomorrow){
  getDay+=1
  if(getDay==7){
    getDay=0
  }
  if(getDay==8){
    getDay=1
  }
 AfterTomorrowName.innerHTML = Days[getDay];
 degreeAfterTomorrow.setAttribute('src', `https:${afterTomorrow.forecast.forecastday[2].day.condition.icon}` );
 maxDegreeAfterTomorrow.innerHTML = `${afterTomorrow.forecast.forecastday[2].day.maxtemp_c}&#176;C`;
 minDegreeAfterTomorrow.innerHTML = `${afterTomorrow.forecast.forecastday[2].day.mintemp_c}&#176`;
 weatherConditionAfterTomorrow.innerHTML = afterTomorrow.forecast.forecastday[2].day.condition.text;
}


search.addEventListener('input', function(e){
  getCity = e.target.value;
  getWeather(getCity);
})

function getLocation() {
  startTime()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,defaultCity)
  } else {
    getWeather('')
  }
}