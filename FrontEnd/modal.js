// modal.js
document.addEventListener("DOMContentLoaded", function () {
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

  const addPictureButton = document.querySelector(".AddPicture");
});
