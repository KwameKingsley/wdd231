document.addEventListener('DOMContentLoaded', () => {
    const memberContainer = document.getElementById('memberContainer');
    const toggleViewButton = document.getElementById('toggleView');
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
        memberContainer.innerHTML = '';
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
            toggleViewButton.textContent = 'Switch to List View';
        } else {
            memberContainer.classList.remove('list-view');
            memberContainer.classList.add('grid-view');
            toggleViewButton.textContent = 'Switch to List View';
        }
    });

    // Fetch and display members on page load
    fetchMemberData();
});

async function fetchSpotlightData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        // Filter silver and gold members
        const spotlightMembers = data.filter(member => member.membershipLevel >= 2);

        // Shuffle and select up to 3 members
        const selectedMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

      
        const spotlightContainer = document.getElementById('spotlightContainer');
        spotlightContainer.innerHTML = '';
        selectedMembers.forEach(member => {
             const card = document.createElement('div');
             card.classList.add('featured-business');
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

 const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
  
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;