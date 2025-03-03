import api from './axiosConfig.js';
document.addEventListener('DOMContentLoaded', async () => {
const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('id');
const token = localStorage.getItem("jwt");
const userRole = localStorage.getItem("role");
if (!token || !userRole) {
alert("Usuário não autenticado. Faça login!");
window.location.href = "entrar.html";
return;
}
if (!petId) {
alert('ID do pet não foi fornecido!');
return;
}
console.log(petId)
try {
const res = await api.get(`/pets/${petId}`, {
params: { populate: "*" },
});
const pet = res.data.data;
if (!pet) {
alert('Pet não encontrado!');
return;
}
const { documentId, nome, raca, tamanho, idade, descricao, sexo,
foto, categoria } = pet;
const petImage = document.getElementById('pet-image');
const petName = document.getElementById('pet-name');
const petCategoria = document.getElementById('pet-categoria');
const petRaca = document.getElementById('pet-raca');
const petTamanho = document.getElementById('pet-tamanho');
const petIdade = document.getElementById('pet-idade');
const petSexo = document.getElementById('pet-sexo');
const petDescricao = document.getElementById('pet-descricao');
petName.textContent = nome || 'Sem nome';
petRaca.textContent = raca || 'N/A';
petCategoria.textContent = categoria.nome || 'N/A';
petTamanho.textContent = tamanho || 'N/A';
petIdade.textContent = idade ?? 'N/A';
petSexo.textContent = sexo || 'N/A';
petDescricao.textContent = descricao || '';
if (foto && foto.url) {
let imgUrl = foto.url;
if (!imgUrl.startsWith('http')) {
imgUrl = `http://localhost:1337${imgUrl}`;
}
petImage.src = imgUrl;
petImage.alt = nome || 'Pet';
}
if (adotarButton) {
adotarButton.href = `formulario_adocao.html?id=${petId}`;
}
} catch (error) {
console.error('Erro ao buscar detalhes do pet:', error);
alert('Não foi possível carregar os detalhes do pet.');
}
});