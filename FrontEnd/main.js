document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://localhost:5678/api/works";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const galerie = document.getElementById("portfolio");

      // Vérifie l'élement avant de modifier le contenu
      if (galerie) {
        // Supprimez mes anciennes photos et titre
        galerie.innerHTML = "";

        // Ajoute chaque projet à la galerie
        data.forEach((projet) => {
          const nouvelElement = document.createElement("div");

          //ajout de class sur mes div, des categories des projets
          nouvelElement.classList.add("modal-div");
          nouvelElement.setAttribute("data-category", projet.category.name);
          nouvelElement.innerHTML = `
          <img src="${projet.imageUrl}" alt="${projet.title}" class="modal-image">
          <h3>${projet.title}</h3>
        `;
          galerie.appendChild(nouvelElement);
        });
      } else {
        console.error("L'élément avec l'ID 'portfolio' n'a pas été trouvé.");
      }
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des données :", error)
    );

  //ajout de la fonction filtre

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

  // Ajoutez un écouteur d'événements à chaque bouton
  document.getElementById("allBtn").addEventListener("click", function () {
    filterProjects("all");
    this.classList.toggle("active");
  });

  document.getElementById("objetsBtn").addEventListener("click", function () {
    filterProjects("Objets");
    this.classList.toggle("active");
  });

  document
    .getElementById("appartementsBtn")
    .addEventListener("click", function () {
      filterProjects("Appartements");
      this.classList.toggle("active");
    });

  document
    .getElementById("hotelsRestaurantsBtn")
    .addEventListener("click", function () {
      filterProjects("Hotels & restaurants");
      this.classList.toggle("active");
    });

  // Récupérer le lien de connexion
  const loginLink = document.getElementById("loginLink");

  // Ajouter un écouteur d'événements au clic
  loginLink.addEventListener("click", function () {
    // Ajoutez ici le code pour gérer la connexion
    window.location.href = "login.html"; // Remplacez ceci par votre logique de connexion
  });
});
