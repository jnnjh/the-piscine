import { getData, setData } from "./storage.js";

export function attachBookmarkActions(userId, onUpdate) {

  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.copy;

      const bookmarks = getData(userId) || [];
      const bookmark = bookmarks.find(b => b.id === id);

      if (!bookmark) return;

      navigator.clipboard.writeText(bookmark.url);
    });
  });

  document.querySelectorAll("[data-like]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.like;

      const bookmarks = getData(userId) || [];
      const bookmark = bookmarks.find(b => b.id === id);

      if (!bookmark) return;

      bookmark.likes += 1;

      setData(userId, bookmarks);

      if (onUpdate) onUpdate(userId);
    });
  });
}
