document.addEventListener("DOMContentLoaded", function () {
  // Elementos da interface
  const petGrid = document.querySelector(".pet-grid");
  const filterSpecies = document.getElementById("filter-species");
  const filterSize = document.getElementById("filter-size");
  const searchButton = document.getElementById("filter-search");
  const clearButton = document.getElementById("filter-clear");

  // Armazenar todos os pets para filtragem local
  let allPets = [];

  // Extrair texto da estrutura de descrição
  function extractDescription(descriptionStructure) {
    if (!descriptionStructure || !Array.isArray(descriptionStructure)) {
      return "Sem descrição disponível";
    }

    // Concatenar o texto de todos os parágrafos
    return descriptionStructure
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text || "").join("");
        }
        return "";
      })
      .join(" ");
  }

  // Buscar pets da API
  async function fetchPets() {
    try {
      const response = await api.get( // Fazer uma solicitação GET para a API
        "/api/cadastro-de-pets"
      );

      // Extrair pets do novo formato de resposta
      const petsData = response.data || [];

      // Filtrar apenas pets publicados
      allPets = petsData.data;

      // Preencher os filtros de espécies e tamanhos
      populateFilterOptions();

      // Exibir todos os pets inicialmente
      displayPets(allPets);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      petGrid.innerHTML =
        '<p class="error-message">Erro ao carregar os pets. Por favor, tente novamente mais tarde.</p>';
    }
  }

  // Preencher opções dos filtros com base nos dados
  function populateFilterOptions() {
    // Conjunto para armazenar valores únicos
    const especies = new Set();
    const tamanhos = new Set();

    // Coletar valores únicos dos pets
    allPets.forEach((pet) => {
      if (pet.raca) especies.add(pet.raca);
      if (pet.tamanho) tamanhos.add(pet.tamanho);
    });

    // Preencher select de espécies
    filterSpecies.innerHTML = '<option value="">Todas</option>';
    especies.forEach((especie) => {
      const option = document.createElement("option");
      option.value = especie;
      option.textContent = especie;
      filterSpecies.appendChild(option);
    });

    // Preencher select de tamanhos
    filterSize.innerHTML = '<option value="">Todos</option>';
    tamanhos.forEach((tamanho) => {
      const option = document.createElement("option");
      option.value = tamanho;
      option.textContent = tamanho;
      filterSize.appendChild(option);
    });
  }

  // Exibir pets na interface
  function displayPets(pets) {
    // Limpar a grid de pets
    petGrid.innerHTML = "";

    if (pets.length === 0) {
      petGrid.innerHTML =
        '<p class="no-pets">Nenhum pet encontrado com os filtros selecionados.</p>';
      return;
    }

    // Criar um card para cada pet
    pets.forEach((pet) => {
      // Extrair a descrição do formato estruturado
      const descricao = extractDescription(pet.descricao);

      let imagemUrl = "assets/pet1.jpg";

      if (pet.raca === "Cachorro") {
        imagemUrl = "/src/assets/pet3.jpg";
      } else if (pet.raca === "Gato") {
        imagemUrl = "/src/assets/pet5.jpg";
      }

      if (pet.foto && pet.foto.url) {
        // Usar a versão thumbnail se disponível, senão usar a imagem completa
        imagemUrl = pet.foto.formats?.thumbnail?.url || pet.foto.url;

        // Define uma imagem padrão para cada raça de pet

        // Adicionar o domínio da API se a URL for relativa
        if (imagemUrl.startsWith("/")) {
          imagemUrl = API_URL + imagemUrl;
        }
      }

      // Criar o elemento card
      const card = document.createElement("div");
      card.className = "pet-card";

      // Conteúdo do card
      card.innerHTML = `
        <img src="${imagemUrl}" alt="${
        pet.raca || "Pet disponível para adoção"
      }" class="pet-image">
        <h3>${pet.raca || "Pet"}</h3>
        <ul>
          <li><strong>Tamanho:</strong> ${pet.tamanho || "Não informado"}</li>
          <li><strong>Idade:</strong> ${
            pet.idade ? `${pet.idade} ano(s)` : "Não informada"
          }</li>
          <li><strong>Sexo:</strong> ${pet.sexo || "Não informado"}</li>
        </ul>
        <p>${descricao}</p>
        <button class="adotar-button" data-id="${pet.id}">Quero adotar</button>
      `;

      // Adicionar o card à grid
      petGrid.appendChild(card);

      // Adicionar event listener ao botão de adotar
      const adotarButton = card.querySelector(".adotar-button");
      adotarButton.addEventListener("click", function () {
        window.location.href = `formulario_adocao.html?pet=${pet.id}`;
      });
    });
  }

  // Filtrar pets com base nos critérios selecionados
  function filterPets() {
    const selectedEspecie = filterSpecies.value;
    const selectedTamanho = filterSize.value;

    const filteredPets = allPets.filter((pet) => {
      const matchEspecie = !selectedEspecie || pet.raca === selectedEspecie;
      const matchTamanho = !selectedTamanho || pet.tamanho === selectedTamanho;

      return matchEspecie && matchTamanho;
    });

    displayPets(filteredPets);
  }

  // Event listeners para os botões de filtro
  searchButton.addEventListener("click", filterPets);

  clearButton.addEventListener("click", function () {
    filterSpecies.value = "";
    filterSize.value = "";
    displayPets(allPets);
  });

  // Inicializar a página buscando os pets
  fetchPets();
});
