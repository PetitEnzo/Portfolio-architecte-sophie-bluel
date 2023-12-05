import { apiEnd } from "./api.js";

const form = document.getElementById("loginForm");

function submitform() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  fetch(apiEnd("/users/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token); // Stockage local du token
        window.location.href = "index.html";
        console.log(localStorage);
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Identifiants incorrects.";
        loginForm.appendChild(errorMessage);
      }
    });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitform();
});
