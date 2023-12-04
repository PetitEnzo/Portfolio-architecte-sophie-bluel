const apiUrl = "http://localhost:5678/api";
const apiEnd = (endpoint) => apiUrl + endpoint;
console.log(apiEnd("/works"));

function userLog() {
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
    filterButtons.remove();

    const ProjetAdmin = document.getElementById("Project");
    const AdminBlock = document.createElement("div");
    AdminBlock.id = "Projet-Admin";
    AdminBlock.innerHTML = `
    <i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>
    `;
    ProjetAdmin.appendChild(AdminBlock);
  }
}

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

  // Fonction de filtre des projets
  function filterProjects(category) {
    const projects = document.querySelectorAll(".modal-div");

    projects.forEach((project) => {
      const projectCategory = project.getAttribute("data-category");

      if (category === "all" || projectCategory === category) {
        project.style.display = "inline-block"; // Afficher l'élément
      } else {
        project.style.display = "none"; // Masquer l'élément
      }
    });
  }

  // Fonction d'annulation de l'affichage des autres boutons en activ
  const buttonremove = () => {
    document
      .querySelectorAll("#filter-buttons button")
      .forEach((button) => button.classList.remove("active"));
  };

  const clickbutton = (button, filterType) => {
    buttonremove();
    filterProjects(filterType);
    button.classList.add("active");
  };

  // Ajout d'un écouteur d'événements à chaque bouton de filtre
  document.getElementById("allBtn").addEventListener("click", function () {
    clickbutton(this, "all");
  });

  document.getElementById("objetsBtn").addEventListener("click", function () {
    clickbutton(this, "Objets");
  });

  document
    .getElementById("appartementsBtn")
    .addEventListener("click", function () {
      clickbutton(this, "Appartements");
    });

  document
    .getElementById("hotelsRestaurantsBtn")
    .addEventListener("click", function () {
      clickbutton(this, "Hotels & restaurants");
    });
});

// Récupération du lien de connexion
const loginLink = document.getElementById("loginLink");

loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});

const loginForm = document.getElementById("loginForm");
// Ajout d'un écouteur d'événements à la soumission du formulaire
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Récupération des valeurs du formulaire
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Envoi de la requête API de connexion
  fetch(apiEnd("/users/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token); // Stockage local du token
        window.location.href = "index.html";
        userLog();
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Identifiants incorrects.";
        loginForm.appendChild(errorMessage);
      }
    });
});
