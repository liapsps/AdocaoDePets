document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário está logado
  function checkUserAccess() {
    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "../pages/entrar.html";
      return false;
    }
    return true;
  }

  // Verificar permissões ao carregar a página
  if (!checkUserAccess()) return;

  const formAdocao = document.getElementById("formAdocao");
  const mensagemDiv = document.getElementById("mensagem-status");

  formAdocao.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      // Obter os campos do formulário
      const nome = document.getElementById("nome").value;
      const idade = document.getElementById("idade").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const endereco = document.getElementById("endereco").value;
      const pet = document.getElementById("pet").value;
      const mensagem = document.getElementById("mensagem").value;

      // Dados do usuário logado
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      // Preparar os dados para envio
      const adocaoData = {
        email: email,
        endereco: endereco,
        idade: parseInt(idade),
        porqueadotar: mensagem,
        nomecompleto: nome,
        telefone: telefone,
        user: userData.id, // Relaciona com o usuário logado
      };

      // Enviar dados para a API Strapi
      const response = await api.post(
        "/api/solicitacao-de-adocaos", {
          data: adocaoData
        }
        
      );

      // Limpar o formulário e mostrar mensagem de sucesso
      formAdocao.reset();
      mostrarMensagem(
        "Solicitação de adoção enviada com sucesso! Entraremos em contato.",
        "sucesso"
      );

      // Redirecionar após 3 segundos
      setTimeout(() => {
        window.location.href = "../pages/home.html";
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar solicitação de adoção:", error);
      mostrarMensagem(`Erro ao enviar solicitação: ${error.message}`, "erro");
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
