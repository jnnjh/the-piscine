import { getCurrentUser } from "./user-selection.js";
import { getData, setData } from "./storage.js";

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
