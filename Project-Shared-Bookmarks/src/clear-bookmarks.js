// TEMPORARY DEMO SCRIPT
// Do not merge into dev-main


// src/clear-bookmarks.js
import * as storage from "./storage.js";

// receive all users
const users = storage.getUserIds();

// clear bookmark for each user
users.forEach(userId => storage.setData(userId, []));

console.log("All bookmarks cleared for demo!");
