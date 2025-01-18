const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector('#cards');

const getProphetData = async (filter = "all") => {
    const response = await fetch(url);
    const data = await response.json();
    let prophets = data.prophets;

    switch (filter) {
        case "idaho":
            prophets = prophets.filter(prophet => prophet.birthplace === "Idaho");
            break;
        case "nonus":
            prophets = prophets.filter(prophet => prophet.birthplace !== "United States");
            break;
        case "ten":
            prophets = prophets.filter(prophet => prophet.length >= 15);
            break;
        case "childs":
            prophets = prophets.filter(prophet => prophet.numofchildren < 5);
            break;
        case "childl":
            prophets = prophets.filter(prophet => prophet.numofchildren >= 10);
            break;
        case "old":
            prophets = prophets.filter(prophet => getAge(prophet.birthdate, prophet.death) >= 95);
            break;
    }
    displayProphets(prophets);
};
const displayProphets = (prophets) => {
    cards.innerHTML = "";

    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");

        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        img.src = prophet.imageurl;
        img.alt = `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day Prophet`;
        img.loading = "lazy";

        const stats = document.createElement("div");
        stats.innerHTML = `
            <p><strong>Birthdate:</strong> ${prophet.birthdate}</p>
            <p><strong>Birthplace:</strong> ${prophet.birthplace}</p>
            <p><strong>Number of Children:</strong> ${prophet.numofchildren}</p>
        `;

        card.appendChild(h2);
        card.appendChild(stats);
        card.appendChild(img);
        cards.appendChild(card);
    });
};

function getAge(birthdate, deathdate) {
    const birth = new Date(birthdate);
    const death = deathdate ? new Date(deathdate) : new Date();
    return Math.floor((death - birth) / (365.25 * 24 * 60 * 60 * 1000));
}

getProphetData();

document.querySelectorAll("nav button").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelector("nav button.active").classList.remove("active");
        e.target.classList.add("active");
        getProphetData(e.target.id);
    });
});
