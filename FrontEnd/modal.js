// modal.js
import { apiUrl, apiEnd } from "./api.js";
import { deleteImage } from "./remove.js";
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

const closeModalButton = document.querySelector(".close-modal");
closeModalButton.addEventListener("click", toggleModal);

fetch(apiEnd("/works"))
  .then((response) => response.json())
  .then((data) => {
    const galerieModale = document.getElementById("portfolioModal");
    data.forEach((projet) => {
      // Crée une div pour chaque paire image/icône
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("imageContainer");
      imageContainer.setAttribute("id", projet.id);
      // Crée l'élément image
      const imageModale = document.createElement("img");
      imageModale.classList.add("imageModale");
      imageModale.src = projet.imageUrl;

      // Ajoute l'image à la div du conteneur
      imageContainer.appendChild(imageModale);

      // Crée l'icône poubelle
      const poubelle = document.createElement("i");
      poubelle.classList.add("fa-solid", "fa-trash-can", "trash-icon");
      poubelle.addEventListener("click", () => {
        const token = localStorage.getItem("token");
        const imageId = document.getElementById(`${projet.id}`).id;
        deleteImage(imageId, token, imageModale);
      });

      // Ajoute l'icône à la div du conteneur
      imageContainer.appendChild(poubelle);

      // Ajoute la div du conteneur à la galerie modale
      galerieModale.appendChild(imageContainer);
    });
  });
