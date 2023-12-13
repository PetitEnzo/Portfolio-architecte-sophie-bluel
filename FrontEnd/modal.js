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
  resetModalAjout();
});

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
  modalAjout.classList.remove("active");
  modal.classList.remove("active");
  resetModalAjout();
}
closeModalButton.addEventListener("click", () => {
  toggleModal();
  resetModalAjout(); // Ajout de cette ligne si nécessaire
});

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

// Ajout de photo
document.addEventListener("DOMContentLoaded", () => {
  const btnPicture = document.getElementById("btnPicture");
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("CategorieId");
  const formUploadPicture = document.getElementById("form-upload-picture");
  const submitButton = document.querySelector(".AddPictureValidation");

  btnPicture.addEventListener("change", (e) => {
    const previewContainer = document.querySelector(".inputPicture");
    const existingPreviewImage =
      previewContainer.querySelector(".preview-image");

    if (existingPreviewImage) {
      existingPreviewImage.remove();
    }

    const file = e.target.files[0];

    if (file) {
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");

      previewImage.addEventListener("load", () => {
        previewContainer.innerHTML = "";
        previewContainer.appendChild(previewImage);
        updateSubmitButtonAppearance(); // Mise à jour après ajout de la photo
      });

      previewImage.src = URL.createObjectURL(file);
    }
  });

  // Fonction pour vérifier si le formulaire est valide
  function isFormValid() {
    return (
      btnPicture.files[0] &&
      titleInput.value.trim() !== "" &&
      categoryInput.value.trim() !== ""
    );
  }

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
          refreshGallery();

          // Mise à jour de la modal après l'envoi de la photo (bouton, fermeture, vide de la div "inputPicture")
          const previewContainer = document.querySelector(".inputPicture");

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

  // Fonction pour mettre à jour l'apparence du bouton en fonction de la validité du formulaire
  function updateSubmitButtonAppearance() {
    if (isFormValid()) {
      submitButton.classList.add("active");
    } else {
      submitButton.classList.remove("active");
    }
  }

  // Appel initial pour désactiver le bouton
  updateSubmitButtonAppearance();
});

// cette fonction marche, elle me permets d'avoir un affichage dynamique de la gallerie, mais ne fait elle pas doublon ? Refacto possible ?
function refreshGallery() {
  fetch(apiEnd("/works"))
    .then((response) => response.json())
    .then((data) => {
      const galerieModale = document.getElementById("portfolioModal");
      galerieModale.innerHTML = "";

      data.forEach((projet) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        imageContainer.setAttribute("id", projet.id);

        // Crée l'élément image
        const imageModale = document.createElement("img");
        imageModale.classList.add("imageModale");
        imageModale.src = projet.imageUrl;

        // Ajoute l'image à la div
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
}

function closeModalAfterSubmit() {
  modalContainer.classList.remove("active");
  modalAjout.classList.remove("active");
  modal.classList.remove("active");
  resetModalAjout();
}

function resetModalAjout() {
  // Réinitialise la div 'inputPicture'
  const inputPictureDiv = document.querySelector(".inputPicture"); // a partir d'ici
  inputPictureDiv.innerHTML = `
  <i class="fa-regular fa-image"></i>
  <label class="uploadPicture">
      <input
          type="file"
          accept=".jpg,.png"
          max-size="4000"
          id="btnPicture"
          class="btnPicture"
          name="imageUrl"
      />+ Ajouter photo
  </label>
  <br />
  <p>Jpg, png : 4mo max</p>`;
  btnPicture.addEventListener("change", (e) => {
    const previewContainer = document.querySelector(".inputPicture");
    const existingPreviewImage =
      previewContainer.querySelector(".preview-image");

    if (existingPreviewImage) {
      existingPreviewImage.remove();
    }

    const file = e.target.files[0];

    if (file) {
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");

      previewImage.addEventListener("load", () => {
        previewContainer.innerHTML = "";
        previewContainer.appendChild(previewImage);
        updateSubmitButtonAppearance();
      });

      previewImage.src = URL.createObjectURL(file);
    }
  }); // jusqu'a la, ca marche pas

  // Réinitialise le champ de texte pour le titre
  const titleInput = document.getElementById("title");
  if (titleInput) {
    titleInput.value = "";
  }

  // Réinitialise le menu déroulant pour la catégorie
  const categorySelect = document.getElementById("CategorieId");
  if (categorySelect) {
    categorySelect.selectedIndex = 0; // Réinitialise à la première option
  }
}
