document.addEventListener("DOMContentLoaded", () => {
    const activityGrid = document.getElementById("activity-grid");

    async function fetchActivities() {
        try {
            const response = await fetch("data/data.json");
            if (!response.ok) {
                throw new Error("Failed to load activities.");
            }
            const activities = await response.json();
            displayActivities(activities);
        } catch (error) {
            console.error("Error fetching activities:", error);
            activityGrid.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
        }
    }

    function displayActivities(activities) {
        activities.forEach(activity => {
            const card = document.createElement("div");
            card.classList.add("activity-card");

            card.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}" loading="lazy">
                <h3>${activity.name}</h3>
                <p>${activity.description}</p>
                <p><strong>Price:</strong> ${activity.price}</p>
                <button class="details-btn" data-name="${activity.name}" data-desc="${activity.description}" data-price="${activity.price}" data-image="${activity.image}">View Details</button>
            `;

            activityGrid.appendChild(card);
        });

        setupModal();
    }

    function setupModal() {
        const modal = document.createElement("div");
        modal.id = "activity-modal";
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img id="modal-image" src="" alt="">
                <h2 id="modal-title"></h2>
                <p id="modal-description"></p>
                <p id="modal-price"></p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModal = modal.querySelector(".close");
        closeModal.addEventListener("click", () => modal.style.display = "none");

        document.querySelectorAll(".details-btn").forEach(button => {
            button.addEventListener("click", event => {
                const { name, desc, price, image } = event.target.dataset;
                document.getElementById("modal-title").textContent = name;
                document.getElementById("modal-description").textContent = desc;
                document.getElementById("modal-price").textContent = `Price: ${price}`;
                document.getElementById("modal-image").src = image;
                document.getElementById("modal-image").alt = name;
                modal.style.display = "block";
            });
        });
    }

    fetchActivities();
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Toggle navigation menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when window resizes to larger screens
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});

// Set the current year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Update the last modified date in the footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;