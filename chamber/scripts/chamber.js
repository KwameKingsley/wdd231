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
            const response = await fetch('data/members.json'); // Replace with the path to your JSON file
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
                return 'Member';
            case 2:
                return 'Silver';
            case 3:
                return 'Gold';
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