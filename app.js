let currentCity = "Manchester";
let units = "metric";

//Selectors
let city = document.querySelector(".weather-city");

let datetime = document.querySelector(".weather-datetime");

let weatherForecast = document.querySelector(".weather-forecast");

let weatherTemp = document.querySelector(".weather-temperature");

let weatherIcon = document.querySelector(".weather-icon");

let weatherMinMax = document.querySelector(".weather-minmax");

let weatherRealFeel = document.querySelector(".weather-realfeel");

let weatherHumidity = document.querySelector(".weather-humidity");

let weatherWind = document.querySelector(".weather-wind");

let weatherPressure = document.querySelector(".weather-pressure");

//Search function
document.querySelector(".weather-search").addEventListener("submit", e => {
    let search = document.querySelector(".weather-searchform");
    //Prevent default action from happening
    e.preventDefault();

    //Change current city
    currentCity = search.value;

    //Get the weather forecast
    getWeather();

    //Clearing the search form
    search.value = " ";
})

//Changing the units to celcius
document.querySelector(".weather-unit-celcius").addEventListener("click", () => {
    if(units !== "metric") { //If the unit is not metric(celcius), then change to metric
        units = "metric"
        getWeather();
    }
})

//Changing the units to farenheit
document.querySelector(".weather-unit-farenheit").addEventListener("click", () => {
    if (units !== "imperial") { //If the unit is not imperial(farenheit), then change to farenheit
        units = "imperial"
        getWeather();
    }
})

function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600; //Converting second to hours

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-":"+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
        return date.toLocaleString("en-US", options)
}

//Conver country code into full name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames //Creating obj which allows to retrieve names for countries and regions
    (["en"], {type:"region"}); //Setting the type we want to retrieve(In this case region)
    return regionNames.of(country) //Changes the region code to the full name and then returns it
}

function getWeather() {
    const API_KEY = '76e18f1fc78f3aea448d26f0d8dd9893'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
        city.innerHTML = `${data.name}, 
        ${convertCountryCode(data.sys.country)}` //Will return the country name(GB) and the city name(Manchester) in the html
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); //Performs the covertTimeStamp function taking in 2 parameters
        weatherForecast.innerHTML = `<p>${data.weather[0].main}` //Will match the description of the weather to the icon. eg: Clear, wind, rain etc
        weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176` //Recieves and shows the data for the weather temperature. toFixed() converts number to a string and rounds the string to a specific number of decimals.
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>` //Matches the icon to the appropiate weather
        weatherMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>` //Data will show the min temp and the max temp
        weatherRealFeel.innerHTML = `<p>${data.main.feels_like.toFixed()}&#176</p>` //Data for the Real Feel div
        weatherHumidity.innerHTML = `<p>${data.main.humidity}%</p>` //Data for the humidity
        weatherWind.innerHTML = `<p>${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}</p>` //Data for the wind. The second part changes the speed units according to the units
        weatherPressure.innerHTML = `<p>${data.main.pressure} hPa</p>` //Data for the pressure
    })
}

document.body.addEventListener("load", getWeather())