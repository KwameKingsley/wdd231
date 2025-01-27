document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

});

// Select HTML elements for weather display
const myTemperature = document.querySelector('#temperature');
const myDescription = document.querySelector('#description');
const forecastContainer = document.querySelector('#forecast');

// OpenWeatherMap API details
const myKey = "2b4807d4d14405fff74a30a0fa6a8848";
const myLat = "5.55";
const myLon = "-0.19";

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

// Fetch and display current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

function displayCurrentWeather(data) {
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;
    myDescription.innerHTML = data.weather[0].description;
}

// Fetch and display 3-day weather forecast
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

function displayWeatherForecast(data) {
    // Clear existing forecast data
    forecastContainer.innerHTML = '';

    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
        });
        const temp = forecast.main.temp.toFixed(1);
        const description = forecast.weather[0].description;

        // Add forecast to the container
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${date}</strong>: ${temp}&deg;F - ${description}
        `;
        forecastContainer.appendChild(listItem);
    });
}

// Call both functions to fetch weather data
fetchCurrentWeather();
fetchWeatherForecast();

// Function to fetch spotlight data and display up to 3 members
async function fetchSpotlightData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error("Failed to fetch members data");

        const data = await response.json();

        // Filter for silver and gold members
        const spotlightMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

        if (spotlightMembers.length === 0) {
            console.error("No silver or gold members found");
            return;
        }

        // Shuffle the array using Fisher-Yates algorithm
        for (let i = spotlightMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [spotlightMembers[i], spotlightMembers[j]] = [spotlightMembers[j], spotlightMembers[i]];
        }

        // Select up to 3 members
        const selectedMembers = spotlightMembers.slice(0, 3);

        const spotlightContainer = document.getElementById('spotlightContainer');
        spotlightContainer.innerHTML = '';

        // Display the selected members
        selectedMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('featured-business');
            card.innerHTML = `
                <img src="${member.logo}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
                <p>Membership Level: ${member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }
}

// Call the function to fetch and display spotlight data
fetchSpotlightData();

fetchSpotlightData();

fetchSpotlightData();

 const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
  
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;