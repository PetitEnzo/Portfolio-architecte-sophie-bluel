import { apiEnd } from "./api.js";
export async function fetchCategory() {
  const responseCategories = await fetch(apiEnd("/categories"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await responseCategories.json();
}

export async function createButtonFilter() {
  const FilterContainer = document.querySelector(".filter-buttons");
  const categories = await fetchCategory();
  categories.forEach((categorie) => {
    const buttons = document.createElement("button");
    buttons.innerHTML = categorie.name;
    buttons.setAttribute("id", categorie.id);
    FilterContainer.appendChild(buttons);
    document
      .getElementById(categorie.id)
      .addEventListener("click", function () {
        clickbutton(this, categorie.id.toString()); //toString passe les valeurs de nombres à String
      });
  });
}

export async function createCategoryModal() {
  const FilterModal = document.querySelector(".LabelModal");
  const categories = await fetchCategory();
  categories.forEach((categorie) => {
    const option = document.createElement("option");
    option.innerHTML = categorie.name;
    option.setAttribute("value", categorie.id);
    FilterModal.appendChild(option);
  });
}
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
