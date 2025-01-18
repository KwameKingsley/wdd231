document.addEventListener("DOMContentLoaded", () => {
  const coursesData = [
      { name: "CSE 110", credits: 2, completed: true },
      { name: "WDD 130", credits: 2, completed: true },
      { name: "CSE 111", credits: 2, completed: true },
      { name: "CSE 210", credits: 2, completed: false },
      { name: "WDD 131", credits: 2, completed: true },
      { name: "WDD 231", credits: 3, completed: false },
  ];

  const coursesContainer = document.querySelector(".courses");
  const filterButtons = document.querySelectorAll(".filter button");
  const footer = document.querySelector("footer");

  const renderCourses = (filter) => {
      let totalCredits = 0;
      coursesContainer.innerHTML = "";
      coursesData.forEach((course) => {
          if (filter === "All" || course.name.startsWith(filter)) {
              const button = document.createElement("button");
              button.textContent = course.name;
              button.style.backgroundColor = course.completed ? "green" : "black";
              coursesContainer.appendChild(button);
              if (course.completed) totalCredits += course.credits;
          }
      });

      const creditsInfo = footer.querySelector(".credits-info");
      if (creditsInfo) creditsInfo.remove();
      const newCreditsInfo = document.createElement("p");
      newCreditsInfo.textContent = `Total Credits: ${totalCredits}`;
      newCreditsInfo.classList.add("credits-info");
      footer.insertBefore(newCreditsInfo, footer.firstChild);
  };

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