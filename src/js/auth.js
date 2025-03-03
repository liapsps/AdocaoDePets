// Arquivo responsável por fazer a validação e alteração da interface do usuário com base no status de autenticação
function updateAuthUI() {
    const token = localStorage.getItem("jwt");
    // Remove the early return that prevents UI updates
    // if (token) {
    //   alert("Usuário já autenticado!");
    //   return;
    // }
  
    const isLoggedIn = !!token;
    console.log("Auth status:", isLoggedIn ? "Logged in" : "Not logged in");
  
    // Obter dados do usuário para verificar status de admin
    let isAdmin = false;
    if (isLoggedIn) {
      try {
        const role = localStorage.getItem("role");
        isAdmin = role === "Admin";
        console.log("User role:", role, "Is admin:", isAdmin);
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
      if (registerLink) registerLink.style.display = "none";
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
  
  document.addEventListener("DOMContentLoaded", updateAuthUI);
  
  function logout() {
    // Remover dados do usuário do localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  
    // Redirecionar para a página inicial
    window.location.href = "../pages/home.html";
  }