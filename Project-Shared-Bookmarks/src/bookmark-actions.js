import { getData, setData } from "./storage.js";

export function attachBookmarkActions(userId, bookmarks) {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.copy;
      navigator.clipboard.writeText(bookmarks[index].url);
    });
  });

  document.querySelectorAll("[data-like]").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.like;
      const all = getData(userId);

      all[index].likes += 1;

      setData(userId, all);

      location.reload(); //quick reload. should change later;
    });
  });
}