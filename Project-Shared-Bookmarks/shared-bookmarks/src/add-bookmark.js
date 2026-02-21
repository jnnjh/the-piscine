import { getUserIds } from "./storage.js";
import { setData } from "./storage.js";
const addBookmarkButton = document.getElementById("add-bookmark");

function add() {
    const addTitle = document.getElementById("bookmark-title");
    const addDescription = document.getElementById("bookmark-description");
    const addLink = document.getElementById("bookmark-link");  

    const title = addTitle.value;
    const description = addDescription.value;
    const link = addLink.value; 

    const user = "1"; //this one can be changed based on dropdown later on...
    user['user']
}
