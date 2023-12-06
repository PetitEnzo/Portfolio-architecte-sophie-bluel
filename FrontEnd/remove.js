// Fonction pour supprimer une image
import { apiEnd } from "./api.js";
export function deleteImage(imageId, token, imageModale) {
  const UserConfirm = confirm("Souhaitez vous supprimer la photo ?"); //Envoi une confirmation à l'user pour validé la supression.
  if (token && UserConfirm) {
    // Envoyer une requête DELETE à votre API
    fetch(apiEnd(`/works/${imageId}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          const imageElement = document.getElementById(`img-${imageId}`);
          const ImageElementModal = document.getElementById(`${imageId}`);
          imageElement.remove();
          ImageElementModal.remove();
        } else {
          console.log("Une erreur est survenue");
        }
      })
      .catch((error) => {
        console.error("Error during delete request:", error);
      });
  }
}
