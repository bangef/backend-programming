import "../css/style.css";
import routes from "../routes";

const render = async () => {
  routes();
};

window.addEventListener("DOMContentLoaded", () => {
  render();
});
