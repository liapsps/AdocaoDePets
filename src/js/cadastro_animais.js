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
            headers: { Authorization: `Bearer ${token}` },
            params: { populate: "*" },
        });

        const categorias = res.data.data;
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

/* document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário está logado e é admin
  function checkAdminAccess() {
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user.isAdmin) {
      window.location.href = "../pages/entrar.html";
      return false;
    }
    return true;
  }

  // Verificar permissões ao carregar a página
  if (!checkAdminAccess()) return;

  const formCadastroPet = document.getElementById("formCadastroPet");
  const mensagemDiv = document.getElementById("mensagem");

  formCadastroPet.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      // Obter os campos do formulário
      const especie = document.getElementById("especie").value;
      const tamanho = document.getElementById("tamanho").value;
      const idade = document.getElementById("idade").value;
      const sexo = document.getElementById("sexo").value;
      const saude = document.getElementById("saude").value;
      const descricao = document.getElementById("descricao").value;

      // Preparar os dados para envio
      const petData = {
        idade: parseInt(idade),
        raca: especie,
        sexo: sexo,
        tamanho: tamanho,
        descricao: descricao,
      };

      // Enviar dados para a API Strapi
      const responsePet = await api.post("/api/cadastro-de-pets", {
        data: petData
      });

      // Limpar o formulário e mostrar mensagem de sucesso
      formCadastroPet.reset();
      mostrarMensagem("Pet cadastrado com sucesso!", "sucesso");

      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = "../pages/lista_pets.html";
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      mostrarMensagem(`Erro ao cadastrar animal: ${error.message}`, "erro");
    }
  });

  function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = "block";

    // Esconder a mensagem após 5 segundos
    setTimeout(() => {
      mensagemDiv.style.display = "none";
    }, 5000);
  }
});
*/