import { getUserIds, getData, setData } from "./storage.js";

const currentUser = "1"; //this one can be changed based on dropdown later on...
const form = document.getElementById("add-bookmark");
let bookmarks = getData(currentUser) || [];

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
    console.log(bookmarks);

    titleVal = "";
    descriptionVal = "";
    linkVal = "";

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    add();
});

