document.addEventListener("DOMContentLoaded", () => {
    // Courses data with credit values and completion status
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
  
    // Function to render courses
    const renderCourses = (filter) => {
      coursesContainer.innerHTML = ""; // Clear existing courses
      coursesData.forEach((course) => {
        if (filter === "All" || course.name.startsWith(filter)) {
          const button = document.createElement("button");
          button.textContent = course.name;
  
          // Mark completed courses
          if (course.completed) {
            button.style.backgroundColor = "green"; 
          } else {
            button.style.backgroundColor = "black"; 
          }
  
          coursesContainer.appendChild(button);
        }
      });
    };
  
    // Filter button functionality
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        renderCourses(button.textContent);
      });
    });
  
    // Calculate total credits completed using reduce
    const totalCredits = coursesData.reduce((sum, course) => {
      return course.completed ? sum + course.credits : sum;
    }, 0);
  
    // Display total credits completed
    const footer = document.querySelector("footer");
    const creditsInfo = document.createElement("p");
    creditsInfo.textContent = `Total Credits Completed: ${totalCredits}`;
    footer.insertBefore(creditsInfo, footer.firstChild);
  
    // Initial render with "All" filter
    renderCourses("All");
  
    // Dynamically set the current year in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
  
    // Dynamically set the last modified date in the footer
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
  });