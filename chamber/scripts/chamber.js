document.addEventListener('DOMContentLoaded', () => {
    const memberContainer = document.getElementById('memberContainer');
    const toggleViewButton = document.getElementById('toggleView');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    })

    // Function to fetch member data
    async function fetchMemberData() {
        try {
            const response = await fetch('data/members.json');
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            memberContainer.innerHTML = '<p>Error loading member data.</p>';
        }
    }

    // Function to display members in the container
    function displayMembers(members) {
        memberContainer.innerHTML = ''; // Clear the container
        members.forEach((member) => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <img src="${member.logo}" alt="${member.name} Logo" class="member-logo">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
                <p><strong>Industry:</strong> ${member.industry}</p>
            `;
            memberContainer.appendChild(memberCard);
        });
    }

    // Helper function to get membership level description
    function getMembershipLevel(level) {
        switch (level) {
            case 1:
                return 'Diamond';
            case 2:
                return 'Gold';
            case 3:
                return 'Silver';
            default:
                return 'Unknown';
        }
    }

    // Toggle view functionality
    toggleViewButton.addEventListener('click', () => {
        if (memberContainer.classList.contains('grid-view')) {
            memberContainer.classList.remove('grid-view');
            memberContainer.classList.add('list-view');
            toggleViewButton.textContent = 'Switch to Grid View';
        } else {
            memberContainer.classList.remove('list-view');
            memberContainer.classList.add('grid-view');
            toggleViewButton.textContent = 'Switch to List View';
        }
    });

    // Fetch and display members on page load
    fetchMemberData();
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
  
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
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

    // Get 3 days of forecast data (every 8th item is approximately 24 hours apart in a 5-day forecast)
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

async function fetchSpotlightData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        // Filter silver and gold members
        const spotlightMembers = data.filter(member => member.membershipLevel >= 2);

        // Shuffle and select up to 3 members
        const selectedMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        // Inside your fetchSpotlightData() function
        const spotlightContainer = document.getElementById('spotlightContainer');
        spotlightContainer.innerHTML = '';
        selectedMembers.forEach(member => {
             const card = document.createElement('div');
             card.classList.add('featured-business'); // Add the featured-business class
             card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
            <p>Membership Level: ${member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>`;
            spotlightContainer.appendChild(card);
});
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }
}

fetchSpotlightData();