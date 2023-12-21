// modal.js
import { apiUrl, apiEnd } from "./api.js";
import { newProject } from "./projects.js";
import { deleteImage } from "./remove.js";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const addPictureButton = document.querySelector(".AddPicture");
const modalAjout = document.querySelector(".modal-ajout");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".close-modal");
const ArrowBack = document.querySelector(".fa-arrow-left");

addPictureButton.addEventListener("click", () => {
  modalAjout.classList.toggle("active");
});

ArrowBack.addEventListener("click", () => {
  modalAjout.classList.remove("active");
  resetModal();
});

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
  modal.classList.toggle("active");
  modalAjout.classList.remove("active");
  resetModal();
}

function closeModal() {
  modal.classList.remove("active");
  resetModal();
}

closeModalButton.addEventListener("click", () => {
  closeModal();
});

function GalleryModal(projet) {
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
  return imageContainer;
}

fetch(apiEnd("/works"))
  .then((response) => response.json())
  .then((data) => {
    const galerieModale = document.getElementById("portfolioModal");
    data.forEach((projet) => {
      // Ajoute la div du conteneur à la galerie modale
      const imageContainer = GalleryModal(projet);
      galerieModale.appendChild(imageContainer);
    });
  });

let submitButton;
let btnPicture;
let titleInput;
let categoryInput;
let formUploadPicture;

document.addEventListener("DOMContentLoaded", () => {
  btnPicture = document.getElementById("btnPicture");
  titleInput = document.getElementById("title");
  categoryInput = document.getElementById("CategorieId");
  formUploadPicture = document.getElementById("form-upload-picture");
  submitButton = document.querySelector(".AddPictureValidation");
  // Appel initial pour désactiver le bouton
  updateSubmitButtonAppearance();

  btnPicture.addEventListener("change", (e) => {
    const previewContainer = document.querySelector(".previewImageContainer");
    const existingPreviewImage =
      previewContainer.querySelector(".preview-image");

    if (existingPreviewImage) {
      existingPreviewImage.remove();
    }
    document.querySelector(".inputPicture").classList.add("hidden");
    const file = e.target.files[0];

    if (file) {
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");

      previewImage.addEventListener("load", () => {
        previewContainer.appendChild(previewImage);
        updateSubmitButtonAppearance(); // Mise à jour après ajout de la photo
      });

      previewImage.src = URL.createObjectURL(file);
    }
  });

  // Ajout de l'écouteur d'événement pour les changements de titre et de catégorie
  titleInput.addEventListener("input", updateSubmitButtonAppearance);
  categoryInput.addEventListener("change", updateSubmitButtonAppearance);

  formUploadPicture.addEventListener("submit", (e) => {
    e.preventDefault(); // Annule la soumission du formulaire par défaut

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", btnPicture.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);

    if (isFormValid()) {
      fetch(apiEnd("/works"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          const ProjectUpload = newProject(response);
          document.getElementById("portfolio").appendChild(ProjectUpload);
          const RefreshModal = GalleryModal(response);
          document.getElementById("portfolioModal").appendChild(RefreshModal);

          updateSubmitButtonAppearance();
          closeModalAfterSubmit();
        })
        .catch((error) => {
          console.error("Error during POST request:", error);
        });
    } else {
      console.log("Formulaire invalide. Veuillez remplir tous les champs.");
    }
  });
});

// Fonction pour vérifier si le formulaire est valide
function isFormValid() {
  return (
    btnPicture.files[0] &&
    titleInput.value.trim() !== "" &&
    categoryInput.value.trim() !== ""
  );
}
// Fonction pour mettre à jour l'apparence du bouton en fonction de la validité du formulaire
function updateSubmitButtonAppearance() {
  if (isFormValid()) {
    submitButton.classList.add("active");
  } else {
    submitButton.classList.remove("active");
  }
}

function closeModalAfterSubmit() {
  modalContainer.classList.remove("active");
  modalAjout.classList.remove("active");
  modal.classList.remove("active");
}

function resetModal() {
  const previewImage = document.querySelector(".preview-image");
  document.querySelector(".inputPicture").classList.remove("hidden");
  if (previewImage) {
    previewImage.remove();
  }
  document.querySelector("#btnPicture").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#CategorieId").value = "";
  updateSubmitButtonAppearance();
}
