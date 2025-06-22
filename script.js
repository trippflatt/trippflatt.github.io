document.getElementById("submitButton").addEventListener("click", function () {
  const container = document.getElementById("mainContainer");
  const selectedParam = document.getElementById("parameterSelect").value;
  const inputValue = document.getElementById("inputField").value.trim();
  const resultsDiv = document.getElementById("results");

  if (inputValue === "") {
    alert("Пожалуйста, введите значение.");
    return;
  }

  if (!container.classList.contains("expanded")) {
    container.classList.add("expanded");
  }

  let uuid = null;
  let username = null;

  if (selectedParam === "uuid") {
    uuid = inputValue;
    username = "Unknown";

    displayResults(username, uuid);
  } else {
    fetch(`https://api.mojang.com/users/profiles/minecraft/${inputValue}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Player not found!");
      }
      return response.json();
    })
    .then(data => {
      username = data.name;
      uuid = data.id;
      displayResults(username, uuid)
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    })
  }

  function displayResults(username, uuid) {
    resultsDiv.innerHTML = `
      <p><strong>Выбранный параметр:</strong> ${selectedParam}</p>
      <p><strong>Имя игрока:</strong> ${username}</p>
      <p><strong>UUID:</strong> ${uuid}</p>
    `;
  }
});