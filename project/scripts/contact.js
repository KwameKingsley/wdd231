document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        window.location.href = "contact-action.html";
    });
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

