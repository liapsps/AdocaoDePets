document.addEventListener("DOMContentLoaded", function () {
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
        foto: null,
        idade: parseInt(idade),
        locale: null,
        localizations: [],
        raca: especie,
        sexo: sexo,
        tamanho: tamanho,
        saude: saude,
        descricao: descricao,
        status: "published",
      };

      // Enviar dados para a API Strapi
      const responsePet = await api.post(
        "/content-manager/collection-types/api::cadastro-de-pet.cadastro-de-pet/actions/publish?",
        petData
      );

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
