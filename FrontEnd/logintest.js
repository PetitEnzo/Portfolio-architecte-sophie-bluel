import { apiEnd } from "./api.js";

const form = document.getElementById("loginForm");

function submitform() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const Error = document.getElementById("Error");
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
        Error.classList.remove("hidden");
      }
    });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitform();
});
