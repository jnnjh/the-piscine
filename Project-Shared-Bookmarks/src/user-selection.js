import { getUserIds } from "./storage.js";

let currentUser = null;

export function initUserSelection(onUserChange) {
  const select = document.getElementById("userSelect");

  const users = getUserIds();

  users.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.appendChild(option);
  });

  currentUser = users[0];
  onUserChange(currentUser);

  select.addEventListener("change", (e) => {
    currentUser = e.target.value;
    onUserChange(currentUser);
  });
}

export function getCurrentUser() {
  return currentUser;
}