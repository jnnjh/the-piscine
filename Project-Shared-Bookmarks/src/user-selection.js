import { getUserIds, getData } from "./storage.js";

export function setupUserSelection () {
  const app = document.getElementById('app');

  // create label
  const label = document.createElement('label');
  label.setAttribute('for', 'user-select');
  label.textContent = 'Select User: ';

  // create dropdown
  const select = document.createElement('select');
  select.id = 'user-select';
  select.name = 'user';
  select.innerHTML = `<option value="">-- Choose a user --</option>`;

  // create message container
  const message = document.createElement('div');
  message.id = 'message';
  message.setAttribute('aria-live', 'polite');

  // create bookmarks container
  const bookmarksContainer = document.createElement('div');
  bookmarksContainer.id = 'bookmarks';

  // append everything to #app
  app.appendChild(label);
  app.appendChild(select);
  app.appendChild(message);
  app.appendChild(bookmarksContainer);

  // populate dropdown dynamically from storage
  const users = getUserIds();
  users.forEach((id) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = id; // optionally map to nicer display names
    select.appendChild(option);
  });

   //handle user selection
  select.addEventListener('change', () => {
    const userId = select.value;
  
    //clear previous content
    message.textContent = '';
    bookmarksContainer.innerHTML = '';
 
    if (!userId) return;

    const bookmarks = getData(userId) || [];

    if (bookmarks.length === 0) {
      message.textContent = 'This user has no bookmarks yet.';
      return;
    }

    //sort reverse chronological
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

      bookmarksContainer.appendChild(div);
    });
  });
}