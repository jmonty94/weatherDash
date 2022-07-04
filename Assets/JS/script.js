// openWeather Variables
const oneCallURL = 'https://api.openweathermap.org/data/3.0/onecall';
const geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct';
const openWeatherAPIKey = `&appid=61eaae33c7b186d0a805e57d11aff3bb`;
const iconUrl = `https://openweathermap.org/img/wn/`;
const iconEnding = `@2x.png`;
const latTag = `?lat=`;
const lonTag = `&lon=`;
const excludeTag = `&exclude=`;
const unitTag = `&units=imperial`;
const qTag = `?q=`;

// Html element variables
const navBarEl = $("nav");
const searchBtn = $("#searchBtn");
const resultEl = $("#resultContainer");
const searchInputEl = $("#citySearch");
const currentSearchEl = $("#currentSearch");
const currTempEl = $("#currTemp");
const currWindEl = $("#currWind");
const currHumidityEl = $("#currHumidity");
const currUVIndexEl = $("#currUVIndex");
const uvValEl = $("#uvVal");
const forecastContainerEl = document.getElementById("forecastContainer");
const previousSearchesEl = document.getElementById("previousSearches") 

function search() {
    const city = searchInputEl.val();
    searchInputEl.val("");
    if (city !== "") {
        getLatLon(city);
        addToPreviousSearches(city);
    };
};
async function getLatLon(city) {
    const response = await fetch(geocodingURL + qTag + city + openWeatherAPIKey).catch(error => console.error(error));
    const geoCodingResult = await response.json().catch(error => console.error(error));
    const { lat, lon, state, name } = geoCodingResult?.[0];
    resultEl.removeClass("d-none");
    getCityWeather(lat, lon, name, state);
};
function getCityWeather(lat, lon, city, state) {
    fetch(oneCallURL + latTag + lat + lonTag + lon + openWeatherAPIKey + unitTag)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDay = data.daily.slice(1, 6);
            currentDay = moment.unix(data.current.dt).format("MM-DD-YYYY");
            currentTemp = data.current.temp;
            currentWind = data.current.wind_speed;
            currentHumidity = data.current.humidity;
            currentUVI = data.current.uvi;
            generateCurrentWeather(city, state, currentDay, currentTemp, currentWind, currentHumidity, currentUVI);
            removeChilds(forecastContainerEl)
            fiveDay.forEach(day => {
                generateForecastCard(day);
            });
        });
};
function generateCurrentWeather(city, state, currentDay, currentTemp, currentWind, currentHumidity, currentUVI) {
    currentSearchEl.text(city + ", " + state + " " + currentDay);
    currTempEl.text("Temp: " + currentTemp);
    currWindEl.text("Wind: " + currentWind);
    currHumidityEl.text("Humidity: " + currentHumidity);
    const uvVal = document.createElement("span")
    uvVal.textContent = currentUVI
    currUVIndexEl.empty()
    // uvValEl.before("UV Index: ");
    // uvValEl.text(currentUVI);
    if (currentUVI <= 2) {
        uvVal.setAttribute("class", "bg-success");
    } else if (currentUVI > 2 && currentUVI <= 7) {
        uvVal.setAttribute("class", "bg-warning");
    } else if (currentUVI > 7) {
        uvVal.setAttribute("class", "bg-danger");
    }
    uvVal.classList.add("px-5", "rounded-3")
    currUVIndexEl.text("UV Index: ")
    currUVIndexEl.append(uvVal)
}
function generateForecastCard(day) {
    const cardEL = document.createElement("div");
    const cardBodyEl = document.createElement("div");
    const cardTitleContainer = document.createElement("div")
    const cardTitleEl = document.createElement("h4");
    const cardTempEl = document.createElement("p");
    const cardWindEl = document.createElement("p");
    const cardHumidityEl = document.createElement("p");
    const cardIcon = document.createElement("img");
    const formattedDate = moment.unix(day.dt).format("MM-DD-YYYY");
    cardIcon.src = (iconUrl + day.weather[0].icon + iconEnding);
    cardEL.classList.add("bg-dark", "bg-gradient", "card", "col-xl-2", "col-md-3", "d-md-inline-block", "m-2");
    cardBodyEl.classList.add("card-body");
    cardTitleContainer.classList.add("d-flex", "align-items-center")
    cardTitleEl.classList.add("card-title");
    forecastContainerEl.appendChild(cardEL);
    cardEL.appendChild(cardBodyEl);
    cardBodyEl.appendChild(cardTitleContainer);
    cardTitleContainer.appendChild(cardTitleEl)
    cardTitleContainer.appendChild(cardIcon)
    cardBodyEl.appendChild(cardTempEl);
    cardBodyEl.appendChild(cardWindEl);
    cardBodyEl.appendChild(cardHumidityEl);
    cardTitleEl.textContent = formattedDate;
    cardTempEl.textContent = ("Temp: " + day.temp.day)
    cardWindEl.textContent = ("Wind: " + day.wind_speed)
    cardHumidityEl.textContent = ("Humidity: " + day.humidity)
};
function addToPreviousSearches(city) {
    const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    const newSearch = toTitleCase(city);
    if (previousSearches.indexOf(newSearch) === -1) {
        previousSearchesLimit(previousSearches)
        previousSearches.unshift(newSearch)
    }
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches))
    createButtons()
}
function toTitleCase(city) {
    const lowerCasedCity = city.trim().toLowerCase();
    return lowerCasedCity.split(' ').map(lowerCasedCity => lowerCasedCity.charAt(0).toUpperCase() + lowerCasedCity.slice(1)).join(' ')
}
function removeChilds (container) {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
};
function createButtons () {
    removeChilds(previousSearchesEl)
    const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    previousSearches.forEach(city => {
        buttonContents(city)
    });
}
function buttonContents(city) {
    const btn = document.createElement("button")
        btn.textContent = city
        btn.classList.add("btn", "btn-info", "btn-rounded", "m-1")
        btn.addEventListener("click", (event) => {getLatLon(event.target.textContent);} )
        previousSearchesEl.appendChild(btn)
}
function previousSearchesLimit(previousSearches) {
    if (previousSearches.length === 5) {
        previousSearches.pop()
    }
}
createButtons()
searchBtn.on("click", search) 