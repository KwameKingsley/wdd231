document.addEventListener("DOMContentLoaded", () => {
    loadCards();
    displayVisitMessage();
    setupHamburgerMenu();
    updateFooterInfo();
});

async function loadCards() {
    try {
        const response = await fetch("data/places.json");
        const places = await response.json();
        
        const container = document.getElementById("placesContainer");
        container.innerHTML = ""; 

        places.forEach(place => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="images/${place.image}" alt="${place.name}" loading="lazy">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button onclick="window.open('${place.url}', '_blank')">Learn More</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading places:", error);
    }
}

function displayVisitMessage() {
    const msToDays = 86400000;
    const today = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((today - lastVisit) / msToDays);
        message = daysSinceLastVisit < 1 ? 
            "Back so soon! Awesome!" : 
            `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
    }

    document.querySelector("#visitMessage").textContent = message;
    localStorage.setItem("lastVisit", today);
}

function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("open");
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav.classList.remove("open");
            hamburger.classList.remove("active");
        }
    });

    // Close menu when a navigation link is clicked (for better UX)
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            hamburger.classList.remove("active");
        });
    });
}

function updateFooterInfo() {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
}