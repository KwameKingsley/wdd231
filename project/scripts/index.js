document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    async function fetchQuote() {
        try {
            const response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
            if (!response.ok) {
                throw new Error("Failed to fetch quote.");
            }
            const data = await response.json();

            if (!data || data.length === 0 || !data[0].q || !data[0].a) {
                throw new Error("Invalid quote data.");
            }

            // Display quote and author
            quoteText.textContent = `"${data[0].q}"`;
            quoteAuthor.textContent = `- ${data[0].a}`;
        } catch (error) {
            console.error("Error loading quote:", error);
            quoteText.textContent = "Failed to load quote.";
            quoteAuthor.textContent = "";
        }
    }

    fetchQuote(); // Fetch quote on page load

    // Optional: Add a button to fetch a new quote
    document.getElementById("new-quote").addEventListener("click", fetchQuote);
});

// Lazy load images for better performance
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    lazyImages.forEach(img => {
        img.addEventListener("load", () => {
            img.classList.add("loaded"); // Optional: Add a CSS class after loading
        });
    });

    fetchQuoteOfTheDay(); // Fetch the quote after DOM loads
});

// Set the current year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Update the last modified date in the footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

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