// Responsive Navigation (Hamburger Menu)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
});



// Validate Booking Form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    if (form) {
        form.addEventListener("submit", event => {
            const name = document.getElementById("name").value.trim();
            const date = document.getElementById("date").value;
            const activity = document.getElementById("activity").value;

            if (!name || !date || !activity) {
                event.preventDefault();
                alert("Please fill out all required fields.");
            }
        });
    }
});

