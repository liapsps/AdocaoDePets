// Array de pets
const pets = [
  {
    id: 1,
    name: "Buddy",
    species: "Cachorro",
    size: "M",
    description: "Um amigão para toda a vida!",
    image: "../assets/pet1.jpg",
  },
  {
    id: 2,
    name: "Mittens",
    species: "Gato",
    size: "M",
    description: "Adora um carinho!",
    image: "../assets/pet2.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    species: "Cachorro",
    size: "G",
    description: "Energia para brincar!",
    image: "../assets/pet3.jpg",
  },
  {
    id: 4,
    name: "Max",
    species: "Cachorro",
    size: "P",
    description: "Muito amoroso, adora caminhadas!",
    image: "../assets/pet4.webp",
  },
  {
    id: 5,
    name: "Luna",
    species: "Gato",
    size: "P",
    description: "Brincalhona, adora explorar!",
    image: "../assets/pet5.jpg",
  },
  {
    id: 6,
    name: "Simba",
    species: "Gato",
    size: "M",
    description: "Amigável demais, ideal para família!",
    image: "../assets/pet6.webp",
  },
];

// Função para popular os filtros dinamicamente
function populateFilters() {
  const nameSelect = document.getElementById("filter-name");
  const speciesSelect = document.getElementById("filter-species");
  const sizeSelect = document.getElementById("filter-size");

  // Criar sets para armazenar valores únicos
  const names = new Set();
  const species = new Set();
  const sizes = new Set();

  // Adicionar opções únicas aos sets
  pets.forEach((pet) => {
    names.add(pet.name);
    species.add(pet.species);
    sizes.add(pet.size);
  });

  // Popular os selects com as opções disponíveis
  names.forEach(
    (name) =>
      (nameSelect.innerHTML += `<option value="${name}">${name}</option>`)
  );
  species.forEach(
    (species) =>
      (speciesSelect.innerHTML += `<option value="${species}">${species}</option>`)
  );
  sizes.forEach(
    (size) =>
      (sizeSelect.innerHTML += `<option value="${size}">${size}</option>`)
  );
}

// Função para exibir os pets na tela
function displayPets(petList) {
  const petGrid = document.querySelector(".pet-grid");
  petGrid.innerHTML = petList
    .map(
      (pet) => `
      <div class="pet-card">
        <img src="${pet.image}" alt="${pet.name}" />
        <div class="pet-card-content">
          <h3>${pet.name}</h3>
          <p>Espécie: ${pet.species}</p>
          <p>Tamanho: ${pet.size}</p>
          <p>Descrição: ${pet.description}</p>
          <a href="../pages/detalhes_pet/${pet.name.toLowerCase()}.html" class="info-button">Mais Informações</a>
        </div>
      </div>
    `
    )
    .join("");
}

// Função para filtrar os pets
function filterPets() {
  const name = document.getElementById("filter-name").value;
  const species = document.getElementById("filter-species").value;
  const size = document.getElementById("filter-size").value;

  const filteredPets = pets.filter(
    (pet) =>
      (!name || pet.name === name) &&
      (!species || pet.species === species) &&
      (!size || pet.size === size)
  );

  displayPets(filteredPets);
}

// Função para limpar os filtros
function clearFilters() {
  document.getElementById("filter-name").value = "";
  document.getElementById("filter-species").value = "";
  document.getElementById("filter-size").value = "";
  displayPets(pets);
}

// Eventos dos botões de busca e limpar
document.getElementById("filter-search").addEventListener("click", filterPets);
document.getElementById("filter-clear").addEventListener("click", clearFilters);

// Inicializa os filtros e exibe os pets ao carregar a página
populateFilters();
displayPets(pets);
