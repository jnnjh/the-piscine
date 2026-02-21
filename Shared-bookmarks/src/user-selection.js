import { getData } from "./storage.js";

export function setupUserSelection () {
  const select = document.getElementById('user-select');
  const message = document.getElementById('message');
  const container = document.getElementById('bookmarks');

  select.addEventListener('change', () => {
    const userId = select.value;
  
    container.innerHTML = '';
    message.textContent = '';
 
    if (!userId) return;

    const bookmarks = getData(userId) || [];
    if (bookmarks.length === 0) {
      message.textContent = 'This user has no bookmarks yet.';
      return;
    }

    const sorted = [...bookmarks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sorted.forEach((bookmark) => {
      const div = document.createElement('div');

      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = bookmark.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";//Open in new tab safely, without giving control back to the original page.
      link.textContent = bookmark.title;

      h3.appendChild(link);

      const p = document.createElement('p');
      p.textContent = bookmark.description;

      const small = document.createElement('small');
      small.textContent = `Created at: ${bookmark.createdAt}`;

      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(small);

      container.appendChild(div);
    });
  });
}