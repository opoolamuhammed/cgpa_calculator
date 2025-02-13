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
    semesterTitle.innerHTML = `<h4 class='c-color mb-2 mb-md-3 mt-2 mt-md-3'>Semester ${semesterCounter}</h4>`;
    semesterDiv.appendChild(semesterTitle);

    const coursesDiv = document.createElement("div");
    coursesDiv.classList.add("courses-container");
    semesterDiv.appendChild(coursesDiv);

    // Add one course to the new semester
    addCourse(coursesDiv);

    const addCourseBtn = document.createElement("button");
    addCourseBtn.classList.add("btn", "bg-primary-subtle", "btn-sm", "m-1", "m-sm-2", "mt-md-3");
    addCourseBtn.innerHTML = `<i class="bi bi-folder-plus me-1"></i> Add Course`;
    addCourseBtn.addEventListener("click", () => addCourse(coursesDiv));
    semesterDiv.appendChild(addCourseBtn);

    const removeCourseBtn = document.createElement("button");
    removeCourseBtn.classList.add("btn", "bg-danger-subtle", "btn-sm", "m-1", "m-sm-2", "mt-md-3");
    removeCourseBtn.innerHTML = `<i class="bi bi-folder-x me-1"></i> Remove Course`;
    removeCourseBtn.addEventListener("click", () => removeCourse(coursesDiv));
    semesterDiv.appendChild(removeCourseBtn);

    semesterWrapper.appendChild(semesterDiv);
    semesterCounter++;
}

function removeSemester() {
    const semesterWrapper = document.getElementById("semester-wrapper");
    const semesters = semesterWrapper.querySelectorAll(".semester");

    if (semesters.length > 1) {
        const lastSemester = document.getElementById(`semester-${semesterCounter - 1}`);
        if (lastSemester) {
            semesterWrapper.removeChild(lastSemester);
            semesterCounter--;
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Action not allowed',
            text: 'At least one semester must remain.'
        });
    }
}

function addCourse(coursesContainer) {
    // Check if the courses container already has courses
    const isFirstCourse = coursesContainer.querySelectorAll(".course").length === 0;

    const courseForm = document.createElement("form");
    courseForm.classList.add("course");
    courseForm.innerHTML = `
        <div class='table-responsive'>
            <table class='table table-responsive table-borderless mb-0'>
                <!-- Table Header (display only for the first course) -->
                ${isFirstCourse ? `
                <thead>
                    <tr>
                        <th class='ps-3'>Course</th>
                        <th class='ps-2'>Unit</th>
                        <th class='ps-1'>Grade</th>
                    </tr>
                </thead>
                ` : ''}
                <!-- Table Body -->
                <tbody>
                    <tr>
                        <td>
                            <input class='form-control course-code' type="text" placeholder="Course Code" required>
                        </td>
                        <td>
                            <input class='form-control credit-units' type="number" placeholder="Credit Units" required>
                        </td>
                        <td>
                            <select class="grade form-select" required>
                                <option value="select">Select</option>
                                <option value="5">A</option>
                                <option value="4">B</option>
                                <option value="3">C</option>
                                <option value="2">D</option>
                                <option value="1">E</option>
                                <option value="0">F</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    coursesContainer.appendChild(courseForm);
}

function removeCourse(coursesContainer) {
    const courses = coursesContainer.querySelectorAll(".course");
    if (courses.length > 1) {
        coursesContainer.removeChild(courses[courses.length - 1]);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Action not allowed',
            text: 'At least one course is required in a semester.'
        });
    }
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
