console.log("i change");
const containerOne = document.getElementsByClassName("containerOne")[0];

const STUDENTS_URL =
  "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";

// There is a JSON file with students. Make a call to the file and get the following data from it:

// function fetchStudents() {
//   fetch(STUDENTS_URL)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderStudentsList(containerOne, data);
//     });
// }

function fetchStudents() {
  fetch(STUDENTS_URL)
    .then(function (res) {
      return res.json();
    }) //All students with an average grade higher than 3
    .then((students) => {
      const averageGradeHigherThanThree = students.filter(
        (student) => student.averageGrade > 3
      ); // All female student names with an average grade of 5
      const femaleAverageGradeFive = students
        .filter(
          (student) => student.gender === "Female" && student.averageGrade >= 5
        )
        .map((student) => `${student.firstName} ${student.lastName}`);

      // All male student full names who live in Skopje and are over 18 years old
      const maleFullNames = students
        .filter(
          (student) =>
            student.gender === "Male" &&
            student.city === "Skopje" &&
            student.age > 18
        )
        .map((student) => `${student.firstName} ${student.lastName}`);

      // The average grades of all female students over the age of 24
      const femalesOverTwentyFour = students
        .filter((student) => student.gender === "Female" && student.age > 24)
        .map((student) => `${student.averageGrade}`);

      // All male students with a name starting with B and average grade over 2
      const allMaleStudents = students.filter(
        (student) =>
          student.firstName.startsWith("B") &&
          student.averageGrade > 2 &&
          student.gender === "Male"
      );
      console.log(
        averageGradeHigherThanThree,
        femaleAverageGradeFive,
        maleFullNames,
        femalesOverTwentyFour,
        allMaleStudents
      );
      renderStudentsList(
        containerOne,
        averageGradeHigherThanThree,
        femaleAverageGradeFive,
        maleFullNames,
        femalesOverTwentyFour,
        allMaleStudents
      );
    });
}

function renderStudentsList(containerEl, studentsData) {
  let studentsHTML = "";

  for (let student of studentsData) {
    studentsHTML += `<div>
      <ol class="firstList">
          <li> <b>FIRST AND LAST NAME:</b> ${student.firstName} ${student.lastName}</li>
          <li> <b>ID:</b> ${student.id}</li>
          <li> <b>AGE:</b> ${student.age}</li>
          <li> <b>GENDER</b>: ${student.gender}</li>
          <li> <b>AVERAGE GRADE:</b>${student.averageGrade}</li>
          <li> <b>CITY: </b> ${student.city}</li>
          <li> <b>EMAIL:</b> ${student.email}</li>
      </ol>
      </div>
      `;
  }
  containerEl.innerHTML = studentsHTML;
}

fetchStudents();
