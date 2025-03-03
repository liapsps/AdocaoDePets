import api from './axiosConfig.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('jwt');
  const userRole = localStorage.getItem('role');

  // Verifica se o usuário está autenticado como Admin
  if (!token || userRole !== 'Admin') {
    alert('Acesso negado! Você não possui permissão para acessar esta página.');
    window.location.href = 'home.html';
    return;
  }

  const animaisContainer = document.getElementById('animais-container');
  const editModal = document.getElementById('edit-modal');
  const closeButton = editModal.querySelector('.close-button');
  const editForm = document.getElementById('edit-form');

  // Campos do formulário de edição
  const editNome = document.getElementById('edit-nome');
  const editRaca = document.getElementById('edit-raca');
  const editFoto = document.getElementById('edit-foto');
  const editSexo = document.getElementById('edit-sexo');
  const editTamanho = document.getElementById('edit-tamanho');
  const editDescricao = document.getElementById('edit-descricao');
  const editIdade = document.getElementById('edit-idade');
  const editCategoria = document.getElementById('edit-categoria');
  const editAnimalId = document.getElementById('edit-animal-id');

  // Função para buscar todos os animais e exibi-los
  async function fetchAnimais() {
    try {
      const res = await api.get('/pets', {
        params: { populate: '*' },
        headers: { Authorization: `Bearer ${token}` }
      });
      const animais = res.data.data; // Array de animais
      animaisContainer.innerHTML = '';
      animais.forEach(animal => {
        // Supondo que o retorno tenha os campos diretamente (por exemplo, animal.nome, animal.raca, etc.)
        const { documentId, id, nome, raca, tamanho, idade, descricao, sexo, foto, categoria } = animal;
        let imgUrl = '';
        if (foto && foto.url) {
          imgUrl = foto.url.startsWith('http') ? foto.url : `http://localhost:1337${foto.url}`;
        }
        const card = document.createElement('div');
        card.classList.add('animal-card');
        card.innerHTML = `
          <img src="${imgUrl}" alt="${nome || 'Sem nome'}">
          <h2>${nome || 'Sem nome'}</h2>
          <p><strong>Raça:</strong> ${raca || 'N/A'}</p>
          <p><strong>Tamanho:</strong> ${tamanho || 'N/A'}</p>
          <p><strong>Idade:</strong> ${idade ?? 'N/A'}</p>
          <p><strong>Sexo:</strong> ${sexo || 'N/A'}</p>
          <p><strong>Categoria:</strong> ${categoria ? categoria.nome : 'N/A'}</p>
          <div class="card-buttons">
            <button class="edit-button">Editar</button>
            <button class="delete-button">Deletar</button>
          </div>
        `;
        // Evento de editar: abre o modal com os dados atuais
        const editBtn = card.querySelector('.edit-button');
        editBtn.addEventListener('click', () => openEditModal(animal));
        // Evento de deletar: exibe confirmação e deleta o animal
        const deleteBtn = card.querySelector('.delete-button');
        deleteBtn.addEventListener('click', () => deleteAnimal(documentId));
        animaisContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      animaisContainer.innerHTML = '<p>Erro ao carregar os animais.</p>';
    }
  }

  // Função para abrir o modal de edição e preencher os campos
  async function openEditModal(animal) {
    const { documentId, id, nome, raca, tamanho, idade, descricao, sexo, categoria } = animal;
    editAnimalId.value = documentId;
    editNome.value = nome || '';
    editRaca.value = raca || '';
    // Se não for alterada, o campo foto ficará vazio
    editSexo.value = sexo || '';
    editTamanho.value = tamanho || '';
    editDescricao.value = descricao || '';
    editIdade.value = idade || '';
    // Popula o select de categorias (caso não esteja preenchido ou para atualizar)
    await populateEditCategories();
    // Preenche o select de categoria com o valor atual, se disponível
    if (categoria && categoria.documentId) {
      editCategoria.value = categoria.documentId;
    } else {
      editCategoria.value = '';
    }
    // Exibe o modal
    editModal.style.display = 'block';
  }

  // Função para fechar o modal de edição
  function closeEditModal() {
    editModal.style.display = 'none';
  }
  closeButton.addEventListener('click', closeEditModal);
  window.addEventListener('click', (e) => {
    if (e.target === editModal) {
      closeEditModal();
    }
  });

  // Função para popular o select de categorias no modal de edição
  async function populateEditCategories() {
    try {
      const res = await api.get('/categorias', {
        params: { populate: '*' },
        headers: { Authorization: `Bearer ${token}` }
      });
      const categorias = res.data.data;
      // Limpa o select e adiciona a opção padrão
      editCategoria.innerHTML = '<option value="">Selecione</option>';
      categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.documentId;
        option.textContent = cat.nome;
        editCategoria.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao buscar categorias para edição:', error);
    }
  }

  // Evento do formulário de edição
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = editAnimalId.value;
    let fotoId = null;
    // Se uma nova foto foi selecionada, realiza o upload
    if (editFoto.files && editFoto.files[0]) {
      const formData = new FormData();
      formData.append('files', editFoto.files[0]);
      try {
        const uploadRes = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` }
        });
        const uploadedFile = uploadRes.data[0];
        fotoId = uploadedFile.id;
      } catch (error) {
        console.error('Erro no upload da foto:', error);
      }
    }
    // Monta o corpo da requisição com os dados atualizados
    const body = {
      data: {
        nome: editNome.value.trim(),
        raca: editRaca.value.trim(),
        sexo: editSexo.value,
        tamanho: editTamanho.value,
        descricao: editDescricao.value.trim(),
        idade: parseInt(editIdade.value, 10),
        categoria: { connect: [editCategoria.value] }
      }
    };
    if (fotoId) {
      body.data.foto = fotoId;
    }
    try {
      await api.put(`/pets/${id}`, body, { // Corrigir a string template
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Animal atualizado com sucesso!');
      closeEditModal();
      fetchAnimais(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      alert('Erro ao atualizar o animal.');
    }
  });

  // Função para excluir um animal
  async function deleteAnimal(animalId) {
    if (confirm("Tem certeza que deseja excluir este animal?")) {
      try {
        await api.delete(`/pets/${animalId}`, { // Corrigir a string template
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Animal excluído com sucesso!');
        fetchAnimais(); // Atualiza a lista
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
        alert('Erro ao excluir o animal.');
      }
    }
  }

  // Inicializa a lista de animais
  await fetchAnimais();
});