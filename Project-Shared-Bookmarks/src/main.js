import { initUserSelection } from "./user-selection.js";
import { initAddBookmarkForm } from "./add-bookmark.js";
import { renderBookmarks } from "./display.js";

document.getElementById("app").innerHTML = `
  <h1>Shared Bookmarks</h1>

  <label for="userSelect">Select user:</label>
  <select id="userSelect"></select>

  <div id="bookmarkSection"></div>

  <h2>Add bookmark</h2>
  <form id="bookmarkForm">
    <label>
      URL
      <input type="url" id="urlInput" required />
    </label>

    <label>
      Title
      <input type="text" id="titleInput" required />
    </label>

    <label>
      Description
      <textarea id="descInput" required></textarea>
    </label>

    <button type="submit">Add</button>
  </form>
`;

initUserSelection(renderBookmarks);
initAddBookmarkForm(renderBookmarks);