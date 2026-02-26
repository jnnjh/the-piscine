import { getUserIds, getData, setData } from "./storage.js";

let currentUser = "1"; //default user
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

