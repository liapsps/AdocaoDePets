import api from "./axiosConfig.js"

document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("jwt");
  if (token) {
      alert("Usuário já autenticado!");
      window.location.href = "home.html";
      return;
  }

  const loginForm = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const senhaInput = document.getElementById("password");

  if (loginForm) { 
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const identificador = usernameInput.value.trim();
      const senha = senhaInput.value.trim();

      if (!identificador || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      await login(identificador, senha);
    });
  }
});

async function login(identificador, senha) {
  try {

    const res = await api.post("/auth/local", {
      identifier: identificador,
      password: senha,
    });

    const { jwt } = res.data;

    const userRes = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        populate: "*",
      },
    });

    const userData = userRes.data;

    localStorage.setItem("username", userData.username);
    localStorage.setItem("nomeCompleto", userData.nomeCompleto);
    localStorage.setItem("endereco", userData.endereco);
    localStorage.setItem("telefone", userData.telefone);
    localStorage.setItem("id", userData.id);
    localStorage.setItem("role", userData.role.name);
    localStorage.setItem("jwt", jwt);

    window.location.href = "home.html";
  } catch (error) {
    console.error("Erro no login:", error);

    if (error.response) {
      alert(error.response.data.error.message || "Falha no login. Verifique suas credenciais.");
    } else {
      alert("Erro ao conectar com o servidor.");
    }
  }
}

/* // Função para lidar com o login
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
*/