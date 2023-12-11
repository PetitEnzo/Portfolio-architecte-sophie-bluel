// Fonction de filtre des projets
export function filterProjects(category) {
  const projects = document.querySelectorAll(".gallery");

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
  clickbutton(this, "1");
});

document
  .getElementById("appartementsBtn")
  .addEventListener("click", function () {
    clickbutton(this, "2");
  });

document
  .getElementById("hotelsRestaurantsBtn")
  .addEventListener("click", function () {
    clickbutton(this, "3");
  });
