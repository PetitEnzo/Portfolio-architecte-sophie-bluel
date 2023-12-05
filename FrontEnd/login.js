// login.js
import { apiEnd } from "./api.js";
import { userLog } from "./userLog.js";

export function setupLogin() {
  const loginLink = document.getElementById("loginLink");

  loginLink.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  const loginForm = document.getElementById("loginForm");
  // Ajout d'un écouteur d'événements à la soumission du formulaire
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Envoi de la requête API de connexion
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
          userLog();
        } else {
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Identifiants incorrects.";
          loginForm.appendChild(errorMessage);
        }
      });
  });
}
