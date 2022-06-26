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

let exclude = `minutely,hourly,alerts`

// Html element variables
const navBar = $("nav")
const searchBtn = $("#searchBtn")
const result = $("#resultContainer")
const searchInputEl = $("#searchInput")
const currentSearch = $("#currentSearch")
// navBar.append("<ul>Previous Searches</ul");

function search() {
    let city = searchInputEl.val()
    searchInputEl.val("")
    if (city !== "") {
        navBar.addClass("col-3").removeClass("col-12")
        result.removeClass("d-none")
        console.log(city);
        getLatLon(city)
        
    }
}
function getLatLon(city) {
    let lat;
    let lon;
    console.log(city);
    fetch(geocodingURL + qTag + city + openWeatherAPIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat
        lon = data[0].lon
        city = data[0].name
        state = data[0].state
        console.log(lat , lon);
        getCityWeather(lat, lon, city, state)
    })
}
function getCityWeather(lat, lon, city, state){
    console.log(lat, lon);
    console.log(oneCallURL + latTag + lat + lonTag + lon + openWeatherAPIKey + unitTag);
    fetch(oneCallURL + latTag + lat + lonTag + lon + openWeatherAPIKey + unitTag)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(city);
        console.log(state);
        console.log(data);
        currentTemp = data.current.temp
        console.log(currentTemp);
        currentWind = data.current.wind_speed
        console.log(currentWind);
        currentHumidity = data.current.humidity
        console.log(currentHumidity);
        currentUVI = data.current.uvi
        console.log(currentUVI);
        generateCurrentWeather()
    })
}
function generateCurrentWeather(params) {
    
}
searchBtn.on("click", search) 