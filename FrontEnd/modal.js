// modal.js
import { apiUrl, apiEnd } from "./api.js";
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
      const imageModale = document.createElement("img");
      imageModale.classList.add("imageModal");
      imageModale.src = projet.imageUrl;
      galerieModale.appendChild(imageModale);
    });
  });
