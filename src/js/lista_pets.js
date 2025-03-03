import api from './axiosConfig.js';
document.addEventListener("DOMContentLoaded", async () => {
// Elementos do DOM
const petGrid = document.querySelector(".pet-grid");
const filterCategory = document.getElementById("filter-category");
const filterSpecies = document.getElementById("filter-species");
const filterSize = document.getElementById("filter-size");
const filterSearchBtn = document.getElementById("filter-search");
const filterClearBtn = document.getElementById("filter-clear");
let petsData = [];
async function fetchPets() {
try {
const res = await api.get("/pets", {
params: { populate: "*" },
});
petsData = res.data.data;
console.log("Retorno do Strapi:", petsData);
displayPets(petsData);
populateFilters(petsData);
} catch (error) {
console.error("Erro ao buscar pets:", error);
petGrid.innerHTML = "<p>Erro ao carregar os pets.</p>";
}
}
function displayPets(pets) {
petGrid.innerHTML = "";
if (!pets || pets.length === 0) {
petGrid.innerHTML = "<p>Nenhum pet disponível.</p>";
return;
}
pets.forEach((pet) => {
const { documentId, id, nome, raca, tamanho, idade, descricao, foto,
categoria } = pet;
let imgUrl = "";
if (foto && foto.url) {
imgUrl = foto.url;
if (!imgUrl.startsWith("http")) {
imgUrl = `http://localhost:1337${imgUrl}`;
}
}
const card = document.createElement("div");
card.classList.add("pet-card");
card.innerHTML = `
<img src="${imgUrl}" alt="${nome || "Pet"}" class="pet-image">
<h3 class="pet-name">${nome || "Sem nome"}</h3>
<p class="pet-raca">Raça: ${raca || "N/A"}</p>
<p class="pet-tamanho">Tamanho: ${tamanho || "N/A"}</p>
<p class="pet-idade">Idade: ${idade ?? "N/A"}</p>
<p class="pet-categoria">Categoria: ${categoria && categoria.nome ?
categoria.nome : "N/A"}</p>
<p class="pet-descricao">${descricao || ""}</p>
<a class="info-button" href="../pages/detalhes_pet.html?
id=${documentId}">Mais informações</a>
`;
petGrid.appendChild(card);
});
}
function populateFilters(pets) {
filterCategory.innerHTML = `<option value="">Todas</option>`;
filterSpecies.innerHTML = `<option value="">Todas</option>`;
filterSize.innerHTML = `<option value="">Todos</option>`;
const categories = new Set();
const species = new Set();
const sizes = new Set();
pets.forEach((pet) => {
if (pet.categoria && pet.categoria.nome) {
categories.add(pet.categoria.nome);
}
if (pet.raca) {
species.add(pet.raca);
}
if (pet.tamanho) {
sizes.add(pet.tamanho);
}
});
categories.forEach((cat) => {
const option = document.createElement("option");
option.value = cat;
option.textContent = cat;
filterCategory.appendChild(option);
});
species.forEach((sp) => {
const option = document.createElement("option");
option.value = sp;
option.textContent = sp;
filterSpecies.appendChild(option);
});
sizes.forEach((size) => {
const option = document.createElement("option");
option.value = size;
option.textContent = size;
filterSize.appendChild(option);
});
}
function applyFilters() {
const categoryFilter = filterCategory.value.trim().toLowerCase();
const speciesFilter = filterSpecies.value.trim().toLowerCase();
const sizeFilter = filterSize.value;
const filteredPets = petsData.filter((pet) => {
const catName = pet.categoria && pet.categoria.nome
? pet.categoria.nome.toLowerCase()
: "";
// Lê a raça
const spName = pet.raca ? pet.raca.toLowerCase() : "";
const sizeMatch = !sizeFilter || pet.tamanho === sizeFilter;
const categoryMatch = !categoryFilter ||
catName.includes(categoryFilter);
const speciesMatch = !speciesFilter || spName.includes(speciesFilter);
return categoryMatch && speciesMatch && sizeMatch;
});
displayPets(filteredPets);
}
if (filterSearchBtn) {
filterSearchBtn.addEventListener("click", () => {
applyFilters();
});
}
if (filterClearBtn) {
filterClearBtn.addEventListener("click", () => {
filterCategory.value = "";
filterSpecies.value = "";
filterSize.value = "";
displayPets(petsData);
});
}
await fetchPets();
});