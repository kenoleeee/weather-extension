const apiKey = "de114ecb49f5a03e7e1dc2c615269766";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const card = document.querySelector(".card")

searchBtn.addEventListener('click', ()=>{
    const city = searchBox.value.trim();
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
        const { lat, lon } = data[0];
        getWeather(lat, lon);
        } else {
        console.log("Город не найден");
        }
    });
});

function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
        document.querySelector(".wind").innerHTML = data.wind.speed + " km\h";

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = "images/clouds.png"
        } 
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == 'Mist'){
             weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == 'Snow'){
            weatherIcon.src = "images/snow.png"
        }

        document.querySelector(".weather").style.display = 'block'
        card.classList.add("expanded");


    });
};