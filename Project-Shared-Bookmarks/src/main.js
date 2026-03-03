import { initUserSelection } from "./user-selection.js";
import { initAddBookmarkForm } from "./add-bookmark.js";
import { renderBookmarks } from "./display.js";

document.getElementById("app").innerHTML = "";

import * as storage from "./storage.js";

storage.getUserIds().forEach(userId => storage.setData(userId, []));

initUserSelection(renderBookmarks);
initAddBookmarkForm(renderBookmarks);