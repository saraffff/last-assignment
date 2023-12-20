let detailsContainer;

function searchCountry() {
    const searchInput = document.getElementById('countryInput').value;

    fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            fetchWeatherData(country);
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            alert('Error fetching country data. Please try again.');
        });
}

function fetchWeatherData(country) {
    const apiKey = 'e8179d115e8d6ac0785d3d1599df9765';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
            displayCountryInfo(country, weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayCountryInfo(country, weatherData) {
    const countryList = document.getElementById('countryList');
    countryList.innerHTML = '';

    const countryCard = document.createElement('div');
    countryCard.className = 'col-md-4 country-card';

    const temperature = Math.round(weatherData.main.temp - 273.15);
    const description = weatherData.weather[0].description;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

    countryCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Temperature: ${temperature}°C</p>
                <p class="card-text">Weather: ${description}</p>
                <img src="${iconUrl}" alt="${description} icon" class="img-fluid mb-3">
                <button class="btn btn-primary" onclick="showDetails('${country.name.common}', '${country.capital[0]}', '${country.population}', '${country.flags.png}')">More Details</button>
            </div>
        </div>
    `;

    countryList.appendChild(countryCard);

    detailsContainer = null;
}

function showDetails(countryName, countryCapital, countryPopulation, countryFlag) {
    if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.className = 'col-md-4 details-card';

        detailsContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">More Details</h5>
                    <p class="card-text">Country: ${countryName}</p>
                    <p class="card-text">Capital: ${countryCapital}</p>
                    <p class="card-text">Population: ${countryPopulation}</p>
                    <img src="${countryFlag}" alt="${countryName} Flag" class="img-fluid mb-3">
                </div>
            </div>
        `;

        const countryList = document.getElementById('countryList');
        countryList.appendChild(detailsContainer);
    }
}


