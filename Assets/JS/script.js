// openWeather Variables
const oneCallURL = 'https://api.openweathermap.org/data/3.0/onecall';
const geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct'
const openWeatherAPIKey = `&appid=61eaae33c7b186d0a805e57d11aff3bb`;
const latTag = `&lat=`;
const lonTag = `&lon=`;
const excludeTag = `&exclude=`;
const unitTag = `&units=`;
const qTag = `?q=`;

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
        currentSearch.text(city)
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
        console.log(lat , lon);
    })
}

searchBtn.on("click", search) 