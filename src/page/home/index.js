import { url } from "../../js/config";
import "./home.css";

const fetchStudents = async () => {
  const res = await fetch(`${url}/api/students`);
  const { data: students } = await res.json();

  const listStudents = students
    .map(
      (student) => `
      <div class="student">
        <div class="student__image">
          ${student.nama.substring(0, 2).toUpperCase()}
        </div>
        <div class="student__body">
          <h3 class="student__name">${student.nama}</h3>
          <h4 class="student__nim">${student.nim}</h4>
          <p class="student__description">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
          <a href="show.html?id=${
            student.id
          }" class="student__button">Get Me</a>
        </div>
      </div>
  `
    )
    .join("");

  return listStudents;
};

const Error = () => {
  return `
    <p class="error">Data is empty</p>
  `;
};

const Section = async () => {
  const listStudents = await fetchStudents();

  const section = document.createElement("section");
  section.setAttribute("id", "students");

  section.innerHTML = `
    <h2 class="students__title">Our Students</h2>
      <p class="students__description">
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
      <div class="students">${
        listStudents.length > 0 ? listStudents : Error()
      }</div>
  `;

  return section;
};

export const render = async () => {
  const app = document.querySelector("#app");
  app.appendChild(await Section());
};
