// openWeather Variables
const oneCallURL = 'https://api.openweathermap.org/data/3.0/onecall';
const geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct'
const openWeatherAPIKey = `61eaae33c7b186d0a805e57d11aff3bb`;
const latTag = `&lat=`;
const lonTag = `&lon=`;
const excludeTag = `&exclude=`;
const unitTag = `&units=`;
const qTag = `&q=`;

// Html element variables
const navBar = $("nav")
const searchBtn = $("#searchBtn")
const result= $("#result")
const searchInputEl = $("#searchInput")


searchBtn.on("click", function () {
    navBar.addClass("col-3").removeClass("col-12")
    result.removeClass("d-none")
    navBar.append("<ul>Previous Searches</ul");
    console.log(searchInputEl.val());
})