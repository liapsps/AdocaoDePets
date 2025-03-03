import api from './axiosConfig.js';

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const petList = document.getElementById("pet-list");

  // Function to fetch and display pets
  async function displayPets() {
    try {
      // Fetch pets from the API
      const response = await api.get('/pets?populate=foto'); // Busca pets do Strapi
      const pets = response.data.data.map(pet => ({
        id: pet.id,
        nome: pet.attributes.nome,
        raca: pet.attributes.raca,
        tamanho: pet.attributes.tamanho,
        idade: pet.attributes.idade,
        sexo: pet.attributes.sexo,
        estadoSaude: pet.attributes.estadoSaude,
        descricao: pet.attributes.descricao,
        foto: pet.attributes.foto?.data?.attributes?.url || 'default.jpg'
      }));

      // Clear the pet list and display fetched pets
      petList.innerHTML = "";
      pets.forEach((pet) => {
        const petItem = document.createElement("div");
        petItem.classList.add("pet-card");
        petItem.innerHTML = `
          <img src="${pet.foto}" alt="${pet.nome}" class="pet-image">
          <h3 class="pet-name">${pet.nome}</h3>
          <p class="pet-raca">Raça: ${pet.raca}</p>
          <p class="pet-tamanho">Tamanho: ${pet.tamanho}</p>
          <p class="pet-idade">Idade: ${pet.idade} anos</p>
          <p class="pet-sexo">Sexo: ${pet.sexo}</p>
          <p class="pet-saude">Estado de saúde: ${pet.estadoSaude}</p>
          <p class="pet-descricao">${pet.descricao}</p>
          <button class="edit-pet" data-id="${pet.id}">Editar</button>
          <button class="delete-pet" data-id="${pet.id}">Excluir</button>
        `;
        petList.appendChild(petItem);

        // Add event listeners for edit and delete buttons
        petItem.querySelector(".edit-pet").addEventListener("click", () => editPet(pet));
        petItem.querySelector(".delete-pet").addEventListener("click", () => deletePet(pet.id));
      });
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  }

  // Function to edit a pet
  function editPet(pet) {
    const petItem = document.querySelector(`.edit-pet[data-id="${pet.id}"]`).parentElement;
    petItem.innerHTML = `
      <input type="hidden" class="pet-id" value="${pet.id}">
      <label>Nome:</label>
      <input type="text" class="pet-name" value="${pet.nome}">
      <label>Raça:</label>
      <input type="text" class="pet-species" value="${pet.raca}">
      <label>Tamanho:</label>
      <input type="text" class="pet-size" value="${pet.tamanho}">
      <label>Idade:</label>
      <input type="number" class="pet-age" value="${pet.idade}">
      <label>Sexo:</label>
      <input type="text" class="pet-sex" value="${pet.sexo}">
      <label>Estado de Saúde:</label>
      <input type="text" class="pet-health" value="${pet.estadoSaude}">
      <label>Descrição:</label>
      <textarea class="pet-description">${pet.descricao}</textarea>
      <label>URL da Foto:</label>
      <input type="url" class="pet-photo" value="${pet.foto}">
      <button class="save-pet" data-id="${pet.id}">Salvar</button>
      <button class="cancel-edit" data-id="${pet.id}">Cancelar</button>
    `;

    // Add event listeners for save and cancel buttons
    petItem.querySelector(".save-pet").addEventListener("click", () => savePet(petItem));
    petItem.querySelector(".cancel-edit").addEventListener("click", () => displayPets());
  }

  // Function to save the edited pet details
  async function savePet(petItem) {
    const id = petItem.querySelector(".pet-id").value;
    const petData = {
      id: id,
      nome: petItem.querySelector(".pet-name").value,
      raca: petItem.querySelector(".pet-species").value,
      tamanho: petItem.querySelector(".pet-size").value,
      idade: petItem.querySelector(".pet-age").value,
      sexo: petItem.querySelector(".pet-sex").value,
      estadoSaude: petItem.querySelector(".pet-health").value,
      descricao: petItem.querySelector(".pet-description").value,
      foto: petItem.querySelector(".pet-photo").value
    };

    try {
      // Send updated pet data to the API
      await api.put(`/pets/${id}`, { data: petData });
      displayPets();
    } catch (error) {
      console.error("Erro ao editar pet:", error);
    }
  }

  // Function to delete a pet
  async function deletePet(id) {
    try {
      // Send delete request to the API
      await api.delete(`/pets/${id}`);
      displayPets();
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
    }
  }

  // Initial call to display pets
  displayPets();
});