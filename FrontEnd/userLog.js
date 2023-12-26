const token = localStorage.getItem("token");

if (token) {
  const mainHeader = document.getElementById("placementHeaderAdmin");
  const editionBlock = document.createElement("div");
  editionBlock.id = "edition";
  editionBlock.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <p>mode d'édition</p>
      `;
  mainHeader.appendChild(editionBlock);

  const logoutLink = document.getElementById("loginLink");
  logoutLink.textContent = "logout";
  logoutLink.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  const filterButtons = document.getElementById("filter-buttons");
  if (filterButtons) {
    filterButtons.remove();
  }

  const ProjetAdmin = document.getElementById("Project");
  if (ProjetAdmin) {
    const AdminBlock = document.createElement("div");
    AdminBlock.id = "Projet-Admin";
    AdminBlock.innerHTML = `
          <i class="fa-regular fa-pen-to-square"></i>
          <button class="modal-btn modal-trigger">modifier</button>
        `;
    ProjetAdmin.appendChild(AdminBlock);
  }
}
