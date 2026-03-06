import "../assets/style.css";
import { initUserSelection } from "./user-selection.js";
import { initAddBookmarkForm } from "./add-bookmark.js";
import { renderBookmarks } from "./display.js";

document.getElementById("app").innerHTML = "";

initUserSelection(renderBookmarks);
initAddBookmarkForm(renderBookmarks);


//modal logic here
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (!e.target.closest(".modal-content")) {
    modal.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
  }
});