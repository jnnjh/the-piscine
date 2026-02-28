/*import { getCurrentUser } from "./user-selection.js";
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
      id: crypto.randomUUID(),  
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
  */

import { getCurrentUser } from "./user-selection.js";
import { getData, setData } from "./storage.js";

// Source - https://stackoverflow.com/a/2117523
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-28, License - CC BY-SA 4.0

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export function initAddBookmarkForm(onUpdate) {
  const form = document.getElementById("bookmarkForm");

  form.addEventListener ("submit", (e) => {
    e.preventDefault();

    const url = document.getElementById("urlInput").value;
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descInput").value;

    const userId = getCurrentUser();

    const existing = getData(userId) || [];

    const newBookmark = {
      id: uuidv4(),
      url,
      title,
      description,
      createdAt: Date.now(),
      likes: 0
    };

    console.log("New bookmark:", newBookmark);
    const updated = [...existing, newBookmark];

    setData(userId, updated);

    form.reset();
    onUpdate(userId);
  });
}

    