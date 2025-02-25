// Função para lidar com o login
async function handleLogin(event) {
  event.preventDefault();

  // Obter valores de nome de usuário e senha dos campos de entrada
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Enviar solicitação de login para a API
    const response = await api.post("/api/auth/local", {
      identifier: username,
      password: password,
    });

    if (response.data.jwt) {
      // Armazenar o token JWT e os dados do usuário no localStorage
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Atualizar a UI após o login
      updateAuthUI();

      // Redirecionar para a página de lista de pets
      window.location.href = "../pages/lista_pets.html";
    }
  } catch (error) {
    // Lidar com erros durante o login
    console.error("Error during login:", error);
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
}

// Função para verificar a autenticação
function checkAuth() {
  const token = localStorage.getItem("jwt");
  if (token && window.location.pathname.includes("entrar.html")) {
    // Redirecionar para a página de lista de pets se o usuário já estiver autenticado
    window.location.href = "../pages/lista_pets.html";
  }
}

// Adicionar um ouvinte de evento para verificar a autenticação quando o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", checkAuth);
