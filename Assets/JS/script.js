// openWeather Variables
const oneCallURL = 'https://api.openweathermap.org/data/3.0/onecall';
const geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct'
const openWeatherAPIKey = `&appid=61eaae33c7b186d0a805e57d11aff3bb`;
// const openWeatherAPIKey = `&appid=f606e9f4074125fb3ea381f91319ce19`;
const latTag = `?lat=`;
const lonTag = `&lon=`;
const excludeTag = `&exclude=`;
const unitTag = `&units=imperial`;

const qTag = `?q=`;

let exclude = `minutely,hourly,alerts`;

// Html element variables
const navBarEl = $("nav");
const searchBtn = $("#searchBtn");
const resultEl = $("#resultContainer");
const searchInputEl = $("#searchInput");
const currentSearchEl = $("#currentSearch");
const currTempEl = $("#currTemp");
const currWindEl = $("#currWind");
const currHumidityEl = $("#currHumidity");
const currUVIndexEl = $("#currUVIndex");
const uvValEl = $("#uvVal")
const forecastContainerEl = $("#forecastContainer")
// navBar.append("<ul>Previous Searches</ul");

function search() {
    let city = searchInputEl.val();
    searchInputEl.val("");
    if (city !== "") {
        navBarEl.addClass("col-3").removeClass("col-12");
        resultEl.removeClass("d-none");
        getLatLon(city);
    };
};
function getLatLon(city) {
    let lat;
    let lon;
    fetch(geocodingURL + qTag + city + openWeatherAPIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        city = data[0].name;
        state = data[0].state;
        getCityWeather(lat, lon, city, state);
    });
};
function getCityWeather(lat, lon, city, state){
    fetch(oneCallURL + latTag + lat + lonTag + lon + openWeatherAPIKey + unitTag)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        fiveDay = data.daily.slice(1, 6)
        console.log(fiveDay);
        // console.log(forecastArray);
        currentTemp = data.current.temp;
        currentWind = data.current.wind_speed;
        currentHumidity = data.current.humidity;
        currentUVI = data.current.uvi;
        generateCurrentWeather(city, state, currentTemp, currentWind, currentHumidity, currentUVI);
        generateForecastCards(fiveDay)
    });
};
function generateCurrentWeather(city, state, currentTemp, currentWind, currentHumidity, currentUVI) {
    console.log(city, state, currentTemp, currentWind, currentHumidity, currentUVI);
    currentSearchEl.text(city + ", " + state);
    currTempEl.text("Temp: " + currentTemp);
    currWindEl.text("Wind: " + currentWind);
    currHumidityEl.text("Humidity: " + currentHumidity);
    uvValEl.before("UV Index: ")
    uvValEl.text(currentUVI)
    if (currentUVI <= 2) {
        uvValEl.addClass("bg-success")
    } else if (currentUVI > 2 && currentUVI <= 7){
        uvValEl.addClass("bg-warning")
    } else if (currentUVI > 7){
        uvValEl.addClass("bg-danger")
    }
}
function generateForecastCards(fiveDay){
    console.log(typeof fiveDay);
}
searchBtn.on("click", search) 