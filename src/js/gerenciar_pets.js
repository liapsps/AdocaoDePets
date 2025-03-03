import api from './axiosConfig.js';

document.addEventListener("DOMContentLoaded", () => {
  const petList = document.getElementById("pet-list");

  function displayPets() {
    const pets = [
      {
        id: 1,
        nome: "Buddy",
        raca: "Cachorro",
        tamanho: "M",
        idade: 3,
        sexo: "Macho",
        estadoSaude: "Excelente",
        descricao: "Buddy é um cão amigável que adora brincar. Ele ama passeios ao ar livre e se dá bem com outros cães. Perfeito para famílias que procuram um pet ativo e carinhoso.",
        foto: "../../assets/pet1.jpg"
      },
      // Adicione mais pets conforme necessário
    ];

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

      const editButton = petItem.querySelector(".edit-pet");
      const deleteButton = petItem.querySelector(".delete-pet");

      editButton.addEventListener("click", () => editPet(pet));
      deleteButton.addEventListener("click", () => deletePet(pet.id));
    });
  }

  function editPet(pet) {
    const petItem = document.querySelector(`.edit-pet[data-id="${pet.id}"]`).parentElement;
    petItem.innerHTML = `
      <input type="hidden" class="pet-id" value="${pet.id}">
      <label>Nome:</label>
      <input type="text" class="pet-name" value="${pet.nome}">
      <label>Espécie:</label>
      <input type="text" class="pet-species" value="${pet.raca}">
      <label>Tamanho:</label>
      <input type="text" class="pet-size" value="${pet.tamanho}">
      <label>Idade:</label>
      <input type="number" class="pet-age" value="${pet.idade}">
      <label>Sexo:</label>
      <input type="text" class="pet-sex" value="${pet.sexo}">
      <label>Estado de saúde:</label>
      <input type="text" class="pet-health" value="${pet.estadoSaude}">
      <label>Descrição:</label>
      <textarea class="pet-description">${pet.descricao}</textarea>
      <label>URL da Foto:</label>
      <input type="url" class="pet-photo" value="${pet.foto}">
      <button class="save-pet" data-id="${pet.id}">Salvar</button>
      <button class="cancel-edit" data-id="${pet.id}">Cancelar</button>
    `;

    const saveButton = petItem.querySelector(".save-pet");
    const cancelButton = petItem.querySelector(".cancel-edit");

    saveButton.addEventListener("click", () => savePet(petItem));
    cancelButton.addEventListener("click", () => displayPets());
  }

  function savePet(petItem) {
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
      foto: petItem.querySelector(".pet-photo").value,
    };

    console.log("Pet atualizado:", petData);
    displayPets();
  }

  function deletePet(id) {
    console.log("Pet excluído com ID:", id);
    displayPets();
  }

  displayPets();
});