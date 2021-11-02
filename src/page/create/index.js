import { url, baseUrl } from "../../js/config";
import "./create.css";

const handleSubmit = async () => {
  const form = document.querySelector("form");

  const data = {
    nama: form.elements["nama"].value,
    nim: form.elements["nim"].value,
    email: form.elements["email"].value,
    jurusan: form.elements["jurusan"].value,
  };

  await fetch(`${url}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  window.location.href = baseUrl;
};

const Form = () => {
  const form = document.createElement("form");

  form.innerHTML = `
    <div class="form__group">
      <label for="nama" class="form__label">Nama</label>
      <input type="text" class="form__control" id="nama" name="nama" required />
    </div>
    <div class="form__group">
      <label for="nim" class="form__label">Nim</label>
      <input type="text" class="form__control" id="nim" name="nim" required />
    </div>
    <div class="form__group">
      <label for="email" class="form__label">Email</label>
      <input type="text" class="form__control" id="email" name="email" required />
    </div>
    <div class="form__group">
      <label for="jurusan" class="form__label">Jurusan</label>
      <input type="text" class="form__control" id="jurusan" name="jurusan" required />
    </div>
    <button type="submit">Submit</button>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });

  return form;
};

const Section = () => {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2 class="form__title">Add New Student</h2>
    <p class="form__description">
      Some quick example text to build on the card title and make up the
      bulk of the card's content.
    </p>
  `;

  section.appendChild(Form());

  return section;
};

export const render = () => {
  const app = document.querySelector("#app");
  app.appendChild(Section());
};
