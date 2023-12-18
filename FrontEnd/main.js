// Importation des fonctionnalités depuis d'autres fichiers

import { fetchAndDisplayProjects } from "./projects.js";
import { createButtonFilter } from "./filter.js";
import { createCategoryModal } from "./filter.js";
// Initialisation de l'affichage des projets
fetchAndDisplayProjects();
createButtonFilter();
createCategoryModal();
