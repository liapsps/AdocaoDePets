import api from './axiosConfig.js';
document.addEventListener('DOMContentLoaded', async () => {
const adocaoForm = document.getElementById('adocaoForm');
const nomeUsuarioInput = document.getElementById('nomeUsuario');
const nomePetInput = document.getElementById('nomePet');
const racaPetInput = document.getElementById('racaPet');
const tamanhoPetInput = document.getElementById('tamanhoPet');
const justificativaTextarea = document.getElementById('justificativa');
const token = localStorage.getItem('jwt');
const userId = localStorage.getItem('id');
const userName = localStorage.getItem('nomeCompleto');
console.log(token)
if (!token || !userId) {
alert("Usuário não autenticado. Faça login novamente.");
window.location.href = "signin.html";
return;
}
const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('id');
nomeUsuarioInput.value = userName;
console.log(petId)
if (petId) {
try {
const res = await api.get(`/pets/${petId}`, {
headers: {
Authorization: `Bearer ${token}`
},
params: { populate: '*' },
});
const pet = res.data.data;
if (pet) {
nomePetInput.value = pet.nome || 'Sem nome';
racaPetInput.value = pet.raca || 'N/A';
tamanhoPetInput.value = pet.tamanho || 'N/A';
}
} catch (error) {
console.error('Erro ao buscar pet:', error);
}
}
if (adocaoForm) {
adocaoForm.addEventListener('submit', async (e) => {
e.preventDefault();
try {
const justificativa = justificativaTextarea.value.trim();
const body = {
data: {
adotante: { connect: [userId] },
pet: { connect: [petId] },
justificativa: justificativa,
situacao: 'Pendente',
},
};
const res = await api.post('/solicitacao-de-adocaos', body, {
headers: {
Authorization: `Bearer ${token}`,
},
});
alert('Solicitação de adoção enviada com sucesso!');
window.location.href = 'home.html';
} catch (error) {
console.error('Erro ao enviar solicitação:', error);
alert('Não foi possível enviar a solicitação. Tente novamente.');
}
});
}
});