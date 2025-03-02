import api from './axiosConfig.js';

document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("jwt");
    if (token) {
        window.location.href = "home.html";
        return;
    }

    const cadastroForm = document.querySelector("form");
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const enderecoInput = document.getElementById("endereco");
    const telefoneInput = document.getElementById("telefone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        
        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const endereco = enderecoInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        await cadastrar(fullname, email, username, endereco, telefone, password);
        });
    }
});
  
async function cadastrar(fullname, email, username, endereco, telefone, password) {
    try {
        const res = await api.post("/auth/local/register", {
        username: username,
        email: email,
        password: password,
        });

        const { jwt, user } = res.data;
        const userId = user.id;

        await api.put(`/users/${userId}`, {
        nomeCompleto: fullname,
        endereco: endereco,
        telefone: telefone,
        }, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        });

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
        console.error("Erro no cadastro:", error);
        if (error.response) {
        alert(error.response.data.error.message || "Falha no cadastro. Verifique os dados.");
        } else {
        alert("Erro ao conectar com o servidor.");
        }
    }
}

/* // Arquivo responsável por fazer a validação e alteração da interface do usuário com base no status de autenticação
function updateAuthUI() { 
  const token = localStorage.getItem("jwt");
  const isLoggedIn = !!token;

  // Obter dados do usuário para verificar status de admin
  let isAdmin = false;
  if (isLoggedIn) {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      isAdmin = userData && userData.isAdmin === true;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // Selecionar elementos do header
  const loginLink = document.querySelector(
    '.header-left a[href="entrar.html"]'
  );
  const registerLink = document.querySelector(
    '.header-left a[href="cadastrar.html"]'
  );
  const logoutButton = document.getElementById("logout-button");

  // Selecionar links de navegação que requerem autenticação
  const formAdocaoLink = document.querySelector(
    'nav a[href="formulario_adocao.html"]'
  );
  const cadastroAnimaisLink = document.querySelector(
    'nav a[href="cadastro_animais.html"]'
  );

  if (isLoggedIn) {
    // Usuário está logado: esconder links de login/registro e mostrar botão de logout
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) loginLink.style.display = "none";
    if (logoutButton) logoutButton.style.display = "inline-block";

    // Mostrar formulário de adoção para usuários logados
    if (formAdocaoLink) formAdocaoLink.style.display = "inline-block";

    // Mostrar cadastro de animais apenas para administradores
    if (cadastroAnimaisLink) {
      cadastroAnimaisLink.style.display = isAdmin ? "inline-block" : "none";
    }
  } else {
    // Usuário não está logado: mostrar links de login/registro e esconder botão de logout
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
    if (logoutButton) logoutButton.style.display = "none";

    // Esconder links que requerem autenticação
    if (formAdocaoLink) formAdocaoLink.style.display = "none";
    if (cadastroAnimaisLink) cadastroAnimaisLink.style.display = "none";
  }
}

function logout() {
  // Remover dados do usuário do localStorage
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");

  // Redirecionar para a página inicial
  window.location.href = "../pages/home.html";
}

// Atualizar a UI quando a página carregar
document.addEventListener("DOMContentLoaded", updateAuthUI);
*/