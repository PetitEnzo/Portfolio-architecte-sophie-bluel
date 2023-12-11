import { apiEnd } from "./api.js";

export function fetchAndDisplayProjects() {
  fetch(apiEnd("/works"))
    .then((response) => response.json())
    .then((data) => {
      const galerie = document.getElementById("portfolio");

      if (galerie) {
        galerie.innerHTML = "";

        data.forEach((projet) => {
          const nouvelElement = newProject(projet);
          galerie.appendChild(nouvelElement);
        });
      }
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des données :", error)
    );
}

export function newProject(projet) {
  const nouvelElement = document.createElement("div");
  nouvelElement.classList.add("gallery");
  nouvelElement.setAttribute("data-category", projet.categoryId);
  nouvelElement.setAttribute("id", `img-${projet.id}`);
  nouvelElement.innerHTML = `
      <img src="${projet.imageUrl}" alt="${projet.title}" class="modal-image">
      <h3>${projet.title}</h3>
    `;
  return nouvelElement;
}
