const userSelect = document.getElementById("userSelect");

const users = getUserIds();

users.forEach(userId => {
  const option = document.createElement("option");
  option.value = userId;
  option.textContent = `User ${userId}`;
  userSelect.appendChild(option);
  
});


