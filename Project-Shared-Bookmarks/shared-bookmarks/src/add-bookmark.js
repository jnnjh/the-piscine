import { getUserIds } from "./storage.js";
import { getData, setData } from "./storage.js";

const currentUser = "1"; //this one can be changed based on dropdown later on...
const addBookmarkButton = document.getElementById("add-bookmark");
let bookmarks = getData(currentUser) || [];

function add() {
    const addTitle = document.getElementById("bookmark-title");
    const addDescription = document.getElementById("bookmark-description");
    const addLink = document.getElementById("bookmark-link");  

    const titleVal = addTitle.value;
    const descriptionVal = addDescription.value;
    const linkVal = addLink.value; 

    const newBookmark = [
        {
            title: titleVal,
            description: descriptionVal,
            link: linkVal
        }
    ]

    bookmarks.push(newBookmark);
}

