console.log("working overtime");

// prva klasa

class Academy {
  constructor(
    name, //ime
    students, //niza od studenti
    subjects, // niza od predmeti
    start, // data koa pocnuva
    end // data koa zavrsuva
  ) {
    this.name = name;
    this.students = students;
    this.subjects = subjects;
    this.start = start;
    this.end = end;
    this.numberOfClasses = this.subjects ? this.subjects.length * 10 : 0; // broj na chasovi pomnozeni so 10 , not settable*
  }

  printStudents() {
    console.log(this.students);
  }
  printSubjects() {
    console.log(this.subjects);
  }
}
const school = new Academy(
  "Alfea",
  ["Bloom", "Flora", "Stella", "Musa", "Layla", "Tecna"],
  [
    "Magic self-defense",
    "Winxology",
    "Cosmomagic",
    "History of Magic",
    "Biotransformation",
    "Potionology",
    "Magic Invocation",
    "Magiphysics",
    "Magiphilosophy",
    "Metamorphosimbiosis",
  ],
  "The starting date is: 01.09.1489",
  "The ending date is: 10.09.1450"
);
console.log(school);
school.printStudents();
school.printSubjects();

//vtora klasa
class Subject {
  constructor(title, isELective, academy, students) {
    this.title = title; // title
    this.isELective = isELective; // boolean
    this.academy = academy; // academy object
    this.students = students; // niza od studenti
    this.numberOfClasses = 10; // default 10, not settable
  }
  //overrideClasses - method that accepts a number
  //and rewrites the numberOfClasses
  //property with that number. The number can't be smaller than 3.

  overrideClasses(newNumberOfClasses) {
    if (newNumberOfClasses > 3) {
      return (this.numberOfClasses = newNumberOfClasses);
    } else {
      throw new Error("No less than 3 please!");
    }
  }
}
const predmet = new Subject("Potionology", true, {}, ["Flora", "Layla"]);
console.log(predmet);

predmet.overrideClasses(10);

// treta klasa

class Student {
  constructor(
    firstName, //ime
    lastName, //prezime
    age //godini
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = []; //prazna niza as defult, not settable*
    this.academy = null; // null as defult, not settable*
    this.currentSubject = null; //  null as defult, not settable*
  }
  // startAcademy - method that accepts Academy object that it sets to the Academy property of the student
  startAcademy(academy) {
    if (!academy instanceof Academy) {
      throw new Error("Enter the name of your academy:");
    } else {
      this.academy = academy;
      this.academy.students.push(`${this.firstName} ${this.lastName}`);
    }
  }
  // startSubject - method that accepts Subject object
  // and adds it to the currentSubject property
  // but only if the student has an Academy object
  // in the Academy property and that subject exists in the academy.
  // //If not, give error in console and do not set
  //  the CurrentSubject property

  startSubject(novSubject) {
    if (
      novSubject instanceof Subject &&
      this.academy instanceof Academy &&
      this.academy.subjects.some(
        (subjects) => subjects.title === novSubject.title
      ) // neshto mi kochi ovde
    ) {
      if (!this.completedSubjects.includes(novSubject.title)) {
        this.completedSubjects.push(novSubject.title);
      }
      this.currentSubject = novSubject;
      console.log(`Completed subject: ${novSubject.title}`);
    } else {
      console.error("Predmetot ne postoi");
    }
  }
}

// const potions = new Subject("Potionology", true, null, []);
// const akademija = new Academy("Alfea", [potions]);
// const stuDent = new Student("Tecna", "Fairy of Technology");
// stuDent.startAcademy(akademija);
// stuDent.startSubject(potions);
// console.log(stuDent.currentSubject);
