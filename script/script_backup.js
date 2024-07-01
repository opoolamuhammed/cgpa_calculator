let semesterCounter = 1;

function initializeCalculator() {
    // Add an initial semester when the page loads
    addSemester();
}

function addSemester() {
    const semesterWrapper = document.getElementById("semester-wrapper");

    const semesterDiv = document.createElement("div");
    semesterDiv.classList.add("semester");
    semesterDiv.id = `semester-${semesterCounter}`;

    const semesterTitle = document.createElement("h2");
    semesterTitle.textContent = `Semester ${semesterCounter}`;
    semesterDiv.appendChild(semesterTitle);

    const coursesDiv = document.createElement("div");
    coursesDiv.classList.add("courses-container");
    semesterDiv.appendChild(coursesDiv);

    // Add one course to the new semester
    addCourse(coursesDiv);

    const addCourseBtn = document.createElement("button");
    addCourseBtn.textContent = "+ Add Course";
    addCourseBtn.addEventListener("click", () => addCourse(coursesDiv));
    semesterDiv.appendChild(addCourseBtn);

    semesterWrapper.appendChild(semesterDiv);
    semesterCounter++;
}

function removeSemester() {
    if (semesterCounter > 1) {
        const semesterWrapper = document.getElementById("semester-wrapper");
        const lastSemester = document.getElementById(`semester-${semesterCounter - 1}`);
        if (lastSemester) {
            semesterWrapper.removeChild(lastSemester);
            semesterCounter--;
        }
    }
}

function addCourse(coursesContainer) {
    const courseForm = document.createElement("form");
    courseForm.classList.add("course");
    courseForm.innerHTML = `
    <input type="text" placeholder="Course Code" class="course-code" required>
    <input type="number" placeholder="Credit Units" class="credit-units" required>
    <select class="grade" required>
      <option value="select">Select</option>
      <option value="5">A</option>
      <option value="4">B</option>
      <option value="3">C</option>
      <option value="2">D</option>
      <option value="1">E</option>
      <option value="0">F</option>
    </select>
  `;
    coursesContainer.appendChild(courseForm);
}

function calcCgpa() {
    const semesterDivs = document.querySelectorAll(".semester");
    const resultsDiv = document.getElementById("cgpa-results");
    resultsDiv.innerHTML = "";

    let overallTotalPoints = 0;
    let overallTotalCredits = 0;

    semesterDivs.forEach((semesterDiv, index) => {
        const courses = semesterDiv.querySelectorAll(".course");
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(courseForm => {
            const grade = courseForm.querySelector(".grade").value;
            const creditUnits = parseInt(courseForm.querySelector(".credit-units").value);
            if (!isNaN(creditUnits) && grade !== "select") {
                totalPoints += parseInt(grade) * creditUnits;
                totalCredits += creditUnits;
            }
        });

        const semesterCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
        const semesterResult = document.createElement("p");
        semesterResult.textContent = `Semester ${index + 1} CGPA: ${semesterCGPA.toFixed(2)}`;
        resultsDiv.appendChild(semesterResult);

        overallTotalPoints += totalPoints;
        overallTotalCredits += totalCredits;
    });

    const overallCGPA = overallTotalCredits > 0 ? overallTotalPoints / overallTotalCredits : 0;
    const overallResult = document.createElement("p");
    overallResult.textContent = `Overall CGPA: ${overallCGPA.toFixed(2)}`;
    resultsDiv.appendChild(overallResult);
}

// Initialize the calculator when the page loads
document.addEventListener("DOMContentLoaded", initializeCalculator);
