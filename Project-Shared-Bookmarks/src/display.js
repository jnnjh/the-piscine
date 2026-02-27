/*const userSelect = document.getElementById("userSelect");

const users = getUserIds();

users.forEach(userId => {
  const option = document.createElement("option");
  option.value = userId;
  option.textContent = `User ${userId}`;
  userSelect.appendChild(option);
  
});
*/

import { getData } from "./storage.js";
import { attachBookmarkActions } from "./bookmark-actions.js";

export function renderBookmarks(userId) {
  const container = document.getElementById("bookmarkSection");
  container.innerHTML = "";

  const bookmarks = getData(userId);

  if (!bookmarks || bookmarks.length === 0) {
    container.innerHTML = "<p>This user has no bookmarks yet</p>";
    return;
  }

  const sorted = [...bookmarks].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  sorted.forEach((bookmark, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>
        <a href="${bookmark.url}" target="_blank">
          ${bookmark.title}
        </a>
      </h3>
      <p>${bookmark.description}</p>
      <small>${new Date(bookmark.createdAt).toLocaleString()}</small>
      <div>
        <button data-copy="${index}">Copy URL</button>
        <button data-like="${index}">❤️ ${bookmark.likes}</button>
      </div>
      <hr />
    `;

    container.appendChild(div);
  });

  attachBookmarkActions(userId, sorted);
}