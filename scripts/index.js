document.addEventListener("DOMContentLoaded", () => {
    const coursesData = [
        { 
            name: "CSE 110", credits: 2, completed: true, 
            subject: "CSE", number: 110, title: "Introduction to Programming", 
            description: "Basic programming concepts and problem-solving skills.", 
            certificate: "Web and Computer Programming", 
            technology: ["Python"]
        },
        { 
            name: "WDD 130", credits: 2, completed: true, 
            subject: "WDD", number: 130, title: "Web Fundamentals", 
            description: "HTML, CSS, and basic web design principles.", 
            certificate: "Web and Computer Programming", 
            technology: ["HTML", "CSS", "GitHub"]
        },
        { 
            name: "CSE 111", credits: 2, completed: true, 
            subject: "CSE", number: 111, title: "Programming with Functions", 
            description: "Introduction to functions and modular programming.", 
            certificate: "Web and Computer Programming", 
            technology: ["Python"]
        },
        { 
            name: "CSE 210", credits: 2, completed: false, 
            subject: "CSE", number: 210, title: "Software Design", 
            description: "Principles of object-oriented programming and software engineering.", 
            certificate: "Web and Computer Programming", 
            technology: ["C#", "GitHub"]
        },
        { 
            name: "WDD 131", credits: 2, completed: true, 
            subject: "WDD", number: 131, title: "Responsive Web Design", 
            description: "Advanced CSS techniques including Flexbox and Grid.", 
            certificate: "Web and Computer Programming", 
            technology: ["CSS", "JavaScript", "HTML", "GitHub"]
        },
        { 
            name: "WDD 231", credits: 2, completed: false, 
            subject: "WDD", number: 231, title: "Web Frontend Development", 
            description: "Advanced JavaScript, APIs, and frontend frameworks.", 
            certificate: "Web and Computer Programming", 
            technology: ["JavaScript", "HTML", "CSS", "GitHub"]
        }
    ];

    const coursesContainer = document.querySelector(".courses");
    const filterButtons = document.querySelectorAll(".filter button");
    const footer = document.querySelector("footer");
    const courseDetails = document.getElementById("course-details");

    const renderCourses = (filter) => {
        let totalCredits = 0;
        coursesContainer.innerHTML = "";
        coursesData.forEach((course) => {
            if (filter === "All" || course.name.startsWith(filter)) {
                const button = document.createElement("button");
                button.textContent = course.name;
                button.style.backgroundColor = course.completed ? "green" : "black";
                button.addEventListener("click", () => displayCourseDetails(course));
                coursesContainer.appendChild(button);
                if (course) totalCredits += course.credits;
            }
        });

        const creditsInfo = footer.querySelector(".credits-info");
        if (creditsInfo) creditsInfo.remove();
        const newCreditsInfo = document.createElement("p");
        newCreditsInfo.textContent = `Total Credits: ${totalCredits}`;
        newCreditsInfo.classList.add("credits-info");
        footer.insertBefore(newCreditsInfo, footer.firstChild);
    };

    function displayCourseDetails(course) {
        courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${course.technology.join(", ")}</p>
        `;

        courseDetails.showModal();

        document.getElementById("closeModal").addEventListener("click", () => {
            courseDetails.close();
        });

        courseDetails.addEventListener("click", (event) => {
            if (event.target === courseDetails) {
                courseDetails.close();
            }
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            renderCourses(button.textContent);
        });
    });

    renderCourses("All");

    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector("header");

    hamburger.addEventListener("click", () => {
        header.classList.toggle("nav-active");
        hamburger.classList.toggle("active");
    });

    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
});