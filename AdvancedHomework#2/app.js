//need to correct it

console.log("im working");

const container = document.querySelector(".container");

const STUDENTS_URL =
  "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";

const fetchStudentsList = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
    );
    const studentData = await response.json();
    // console.log(studentData);

    studentsInfo(studentData);
  } catch (error) {
    console.log(error);
    throw new Error("Smth went wrong");
  }
};

const studentsInfo = (studentData) => {
  //Show the average age and average grade of all students combined
  let brojacAge = 0;
  let brojacGrade = 0;
  studentData.map((student) => {
    brojacAge += student.age;
    brojacGrade += student.averageGrade;
  });
  brojacAge /= studentData.length;
  brojacGrade /= studentData.length;
  console.log("Prosek od godini:", brojacAge);
  console.log("Prosek od oceni:", brojacGrade);

  //Show the number of students that are over 60 and the number of students that are under 30 years old
  const overSixtyUnderThirty = studentData.filter(
    (students) => students.age > 60 || students.age < 30
  );
  // Create a list that will have the firstname lastname and city of the students that are over 30 and have an average grade of 4 and above
  const longList = studentData
    .filter((students) => {
      return students.age > 30 && students.averageGrade >= 4;
    })
    .map((students) => ({
      firstName: students.firstName,
      lastName: students.lastName,
      city: students.city,
    }));

  //Find the student named Arthur Cadore and display all of his information
  const findArthur = studentData.find(
    (students) =>
      students.firstName === "Arthur" && students.lastName === "Cadore"
  );
  //Find the oldest and youngest student and display their information on the screen
  const findYoungest = studentData.reduce((youngest, currentStudent) => {
    return currentStudent.age < youngest.age ? currentStudent : youngest;
  }, studentData[0]);

  //come back for this one

  //Show a list of the full names of students that have a last name longer than 8 characters
  const lastNameLongerThanEight = studentData.filter(
    (student) => student.lastName.length > 8
  );
  //Show a list of the top 10 best students by average grade
  const copyList = studentData
    .map((students) => students)
    .sort((a, b) => a.averageGrade - b.averageGrade);
  const topBest = copyList.slice(0, 10);
  //Show on the screen if some users have an average grade of 1 or if all users are adults ( above 18)

  const someUsers = studentData.some((students) => students.averageGrade === 1);
  const allUSers = studentData.every((students) => students.age >= 18);

  console.log(
    overSixtyUnderThirty,
    longList,
    findArthur,
    findYoungest,
    lastNameLongerThanEight,
    topBest,
    someUsers,
    allUSers
  );
};

const renderStudentsList = (containerEl, ...studentsInfo) => {
  console.log("render students called?");
  let studentsHTML = "";

  for (let studentsData of studentsInfo) {
    for (let student of studentsData) {
      studentsHTML += `<div>
      <ol>
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
  }

  containerEl.innerHTML = studentsHTML;

  renderStudentsList(container, ...studentsInfo);
};

const rendering = async () => {
  try {
    await fetchStudentsList();
  } catch (error) {
    console.log("u caught an error");
  }
};

rendering();
