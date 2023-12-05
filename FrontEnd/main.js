// Importation des fonctionnalités depuis d'autres fichiers
import { apiUrl, apiEnd } from "./api.js";
import { userLog } from "./userLog.js";
import { fetchAndDisplayProjects } from "./projects.js";
import { setupFilterButtons } from "./filter.js";
import { setupLogin } from "./login.js";

// Code principal exécuté lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", function () {
  // Initialisation de l'affichage des projets
  fetchAndDisplayProjects();
  // Initialisation des boutons de filtre
  setupFilterButtons();
});

// Gestion du lien de connexion
const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});

// Gestion du formulaire de connexion
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  setupLogin();
});
