import { getData } from "./storage.js";
import { attachBookmarkActions } from "./bookmark-actions.js";

export function renderBookmarks(userId) {
  const container = document.getElementById("bookmarkSection");
  container.innerHTML = "";

  const bookmarks = getData(userId) || [];

  if (!bookmarks.length) {
    container.innerHTML = "<p>This user has no bookmarks yet</p>";
    return;
  }

   // Reverse chronological
  const sorted = [...bookmarks].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  sorted.forEach((bookmark) => {
    const div = document.createElement("div");
    div.className = "bookmark";

    const date = new Date(bookmark.createdAt);
    const formattedDate = date.toLocaleString();

    div.innerHTML = `
        <a href="${bookmark.url}" target="_blank">
          ${bookmark.title}
        </a>
      <p>${bookmark.description}</p>
      <small>Added: ${formattedDate}</small>
      <div>
        <button data-copy="${bookmark.id}">Copy URL</button>
        <button data-like="${bookmark.id}">❤️ ${bookmark.likes}</button>
        </div>
    `;

    container.appendChild(div);
  });

  attachBookmarkActions(userId, renderBookmarks);
}