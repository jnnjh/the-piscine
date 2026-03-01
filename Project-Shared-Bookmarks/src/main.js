import { initUserSelection } from "./user-selection.js";

document.getElementById("app").innerHTML = "";

initUserSelection(() => {
    console.log("User selection initialized");
});
