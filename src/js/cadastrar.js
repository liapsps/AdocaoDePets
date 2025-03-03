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