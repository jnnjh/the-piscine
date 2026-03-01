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

    const updated = [...existing, newBookmark];
    setData(userId, updated);

    form.reset();
    onUpdate(userId);
  }
)}
/*let currentUser = "1"; //default user
const form = document.getElementById("add-bookmark");
let bookmarks = getData(currentUser) || [];


const userSelect = document.getElementById("user-select");

if (userSelect) {
    userSelect.addEventListener("change", (e) => {
        currentUser = e.target.value;

        //reload bookmarks for that user
        bookmarks = getData(currentUser) || [];
    });
}

function add() {
    const addTitle = document.getElementById("bookmark-title");
    const addDescription = document.getElementById("bookmark-description");
    const addLink = document.getElementById("bookmark-link"); 
    const now = new Date().toLocaleString();

    let titleVal = addTitle.value;
    let descriptionVal = addDescription.value;
    let linkVal = addLink.value; 

    const newBookmark =
        {
            title: titleVal,
            description: descriptionVal,
            link: linkVal,
            date: now
        }
    
    bookmarks.push(newBookmark);
    setData(currentUser, bookmarks);

    addTitle.value = "";
    addDescription.value = "";
    addLink.value = "";

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    add();
});
*/
