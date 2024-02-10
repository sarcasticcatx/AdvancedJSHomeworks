//just an updated version od chas

console.log("are we there yet?");

const containerEl = document.querySelector(".containerz");

const STUDENTS_URL =
  "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";

const fetchStudents = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const makeStudentHtml = (student) => {
  return `
      <div class="student-info">
        <h4>${student.id}. ${student.firstName} ${student.lastName}</h4>
        <p>City: ${student.city}</p>
        <p>Gender: ${student.gender}</p>
        <p>Average Grade: ${student.averageGrade}</p>
        <p>Age: ${student.age}</p>
      </div>   

`;
};

const renderStudentInfo = (container, studentData) => {
  // console.log(studentData);
  // 1. Show the average age and average grade of all students combined

  const allAverageAge =
    studentData.reduce((acc, student) => acc + student.age, 0) /
    studentData.length;
  const allAverageGrade =
    studentData.reduce((acc, student) => acc + student.averageGrade, 0) /
    studentData.length;

  // console.log("Prosek od godini:", allAverageAge);
  // console.log("Prosek od oceni:", allAverageGrade);

  container.innerHTML += `
  <h3>Average age and grade</h3>
  <p> The average age of all students is: ${allAverageAge.toFixed(
    0
  )} years old, and the average grade of all students is ${allAverageGrade.toFixed(
    0
  )}.</p>
`;

  //Show the number of students that are over 60 and the number of students that are under 30 years old

  const overSixty = studentData.filter((student) => student.age > 60).length;
  const underThirty = studentData.filter((student) => student.age < 30).length;

  // console.log(underThirty);

  container.innerHTML += `
   <h3>Number of students over 60 and under 30</h3>
   <p> THe number of students over 60 is: ${overSixty}, but the number of students under 30 is: ${underThirty}.</p>
`;

  // 3. Create a list that will have the firstname lastname and city of the students that are over 30 and have an average grade of 4 and above
  const longList = studentData
    .filter((student) => {
      return student.age > 30 && student.averageGrade >= 4;
    })
    .map(
      (student) =>
        `<li>${student.firstName} ${student.lastName} from ${student.city}</li>`
    )
    .join("");

  console.log(longList);

  container.innerHTML += `
  <h3>Students with a grade above or equal to 4</h3>
  <ol>${longList}</ol>

  `;
  // 4. Find the student named Arthur Cadore and display all of his information

  const findArthur = studentData.find(
    (student) => student.firstName === "Arthur" && student.lastName === "Cadore"
  );
  console.log(findArthur);
  container.innerHTML += `<h3>Arthur Cadore</h3>`;
  if (findArthur) {
    container.innerHTML += makeStudentHtml(findArthur);
  } else {
    container.innerHTML += `<h4>Arthur Cadore was not found! TRY AGAIN</h4>`;
  }

  // 5. Find the oldest and youngest student and display their information on the screen
  const copyList = studentData.sort(
    (stuOne, stuTwo) => stuOne.age - stuTwo.age
  );
  const youngest = copyList[0];
  const oldest = copyList[studentData.length - 1];
  console.log(copyList);
  container.innerHTML += `
<h3>Youngest/Oldest</h3>
        <h5>The oldest is:</h5>
        ${makeStudentHtml(oldest)}
        <h5>The youngest is:</h5>
        ${makeStudentHtml(youngest)}
`;

  // 6. Show a list of the full names of students that have a last name longer than 8 characters

  container.innerHTML += `
    <h3>Students with long names</h3>
    <ul>
    ${studentData
      .filter((student) => student.lastName.length > 8)
      .map((student) => `<li>${student.firstName} ${student.lastName}</li>`)
      .join("")}
      </ul>
      `;

  // 7. Show a list of the top 10 best students by average grade
  const studentsCopyTwo = [...studentData].sort(
    (a, b) => b.averageGrade - a.averageGrade
  );

  container.innerHTML += `
        <h3>Top Ten Students</h3>
        ${studentsCopyTwo
          .slice(0, 10)
          .map((student) => makeStudentHtml(student))
          .join("")}
    `;

  // 8. Show on the screen if some users have an average grade of 1 or if all users are adults ( above 18)
  container.innerHTML += `
  <h5>Do some students have an average grade of 1?</h5>
  <p> ${
    studentData.some((student) => student.averageGrade === 1) ? "YES" : "NO"
  }
  </p>
  <h5>Are all students adults?</h5>
  <p>  ${studentData.every((student) => student.age > 18) ? "YES" : "NO"}
`;
};

const listaNaStudenti = async () => {
  try {
    const students = await fetchStudents(STUDENTS_URL);

    renderStudentInfo(containerEl, students);
  } catch (error) {}
};

listaNaStudenti();
