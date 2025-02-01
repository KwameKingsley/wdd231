// Function to get URL parameters and display form data
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    // Function to update field content safely
    function updateField(id, value) {
        const element = document.getElementById(id);
        if (element && value) {
            element.textContent = value;
        } else {
            element.textContent = "Not Provided"; // Fallback (only if no valid value)
        }
    }

    // Populate form fields
    updateField("firstName", params.get("firstName"));
    updateField("lastName", params.get("lastName"));
    updateField("email", params.get("email"));
    updateField("phone", params.get("phone"));
    updateField("orgTitle", params.get("orgTitle"));
    updateField("organization", params.get("organization"));
    updateField("membershipLevel", params.get("membershipLevel"));
    updateField("description", params.get("description"));
    updateField("timestamp", params.get("timestamp"));
}

// Call function when page loads
window.onload = getUrlParams;