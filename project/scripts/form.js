document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("container");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        window.location.href = "form-action.html";
    });
});

