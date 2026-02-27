import { getCurrentUser } from "./user-selection.js";
import { getData, setData } from "./storage.js";

export function initAddBookmarkForm(onUpdate) {
  const form = document.getElementById("bookmarkForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const url = document.getElementById("urlInput").value;
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descInput").value;

    const userId = getCurrentUser();

    const existing = getData(userId) || [];

    const newBookmark = {
      url,
      title,
      description,
      createdAt: Date.now(),
      likes: 0
    };

    const updated = [...existing, newBookmark];

    setData(userId, updated);

    form.reset();
    onUpdate(userId);
  });
}