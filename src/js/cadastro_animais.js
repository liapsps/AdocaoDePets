import api from './axiosConfig.js';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const racaInput = document.getElementById('raca');
    const fotoInput = document.getElementById('foto');
    const sexoSelect = document.getElementById('sexo');
    const tamanhoSelect = document.getElementById('tamanho');
    const descricaoTextarea = document.getElementById('descricao');
    const idadeInput = document.getElementById('idade');
    const categoriaSelecionada = document.getElementById('categoria');
    console.log(categoriaSelecionada)

    const token = localStorage.getItem("jwt");
    const userRole = localStorage.getItem("role");

    if (!token || !userRole) {
        alert("Usuário não autenticado. Faça login novamente.");
        window.location.href = "entrar.html";
        return;
    }

    if (userRole !== "Admin") {
        alert("Acesso negado! Usuário não autorizado.");
        window.location.href = "home.html";
        return;
    }

    try {
        const res = await api.get("/categorias", {
            headers: { Authorization: `Bearer ${token}`},
            params: { populate: "*" },
        });

        const categorias = res.data.data;
        console.log("Categorias retornadas:", categorias);

        categorias.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria.documentId;
            option.textContent = categoria.nome;
            categoriaSelecionada.appendChild(option);
        });
    } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        let fotoId = null;
        if (fotoInput.files && fotoInput.files[0]) {
          const formData = new FormData();
          formData.append('files', fotoInput.files[0]);

          const uploadRes = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, 
            },
          });

          const uploadedFile = uploadRes.data[0];
          fotoId = uploadedFile.id; 
        }

        const body = {
          data: {
            nome: nomeInput.value.trim(),
            raca: racaInput.value.trim(),
            sexo: sexoSelect.value,
            tamanho: tamanhoSelect.value,
            descricao: descricaoTextarea.value.trim(),
            idade: parseInt(idadeInput.value, 10),
            categoria: { connect: [categoriaSelecionada.value] }
          },
        };

        if (fotoId) {
          body.data.foto = fotoId;
        }

        const createRes = await api.post('/pets', body, {
            headers: { Authorization: `Bearer ${token}` }, 
        });

        // Se chegou aqui, deu certo
        alert('Animal cadastrado com sucesso!');
        form.reset();
      } catch (error) {
        console.error('Erro ao cadastrar animal:', error);
        alert('Ocorreu um erro ao cadastrar o animal. Verifique o console para mais detalhes.');
      }
    });
  }
});