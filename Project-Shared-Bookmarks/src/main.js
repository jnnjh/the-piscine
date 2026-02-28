import { initUserSelection } from "./user-selection.js";
import { initAddBookmarkForm } from "./add-bookmark.js";
import { renderBookmarks } from "./display.js";

document.getElementById("app").innerHTML = "";

initUserSelection(renderBookmarks);
initAddBookmarkForm(renderBookmarks);