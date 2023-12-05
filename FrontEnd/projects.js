import { apiEnd } from "./api.js";
import { userLog } from "./userLog.js";

export function fetchAndDisplayProjects() {
  document.addEventListener("DOMContentLoaded", function () {
    fetch(apiEnd("/works"))
      .then((response) => response.json())
      .then((data) => {
        userLog();
        const galerie = document.getElementById("portfolio");

        if (galerie) {
          galerie.innerHTML = "";

          data.forEach((projet) => {
            const nouvelElement = document.createElement("div");

            nouvelElement.classList.add("modal-div");
            nouvelElement.setAttribute("data-category", projet.category.name);
            nouvelElement.innerHTML = `
              <img src="${projet.imageUrl}" alt="${projet.title}" class="modal-image">
              <h3>${projet.title}</h3>
            `;
            galerie.appendChild(nouvelElement);
          });
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  });
}
