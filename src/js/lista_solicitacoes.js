import api from './axiosConfig.js';

 document.addEventListener('DOMContentLoaded', async () => {
 const solicitacoesContainer = document.getElementById('solicitacoes-container');
 // Verifica se o usuário está autenticado e é Administrador
 const token = localStorage.getItem("jwt");
 const userRole = localStorage.getItem("role");
 if (!token || userRole !== "Admin") {
 alert("Acesso negado! Você não possui permissão para acessar esta página.");
 window.location.href = "entrar.html"; // ou redirecione para a home
 return;
 }
 // Função para buscar todas as solicitações de adoção
 async function fetchSolicitacoes() {
 try {
 const res = await api.get('/solicitacao-de-adocaos', {
 params: { populate: '*' },
headers: { Authorization: `Bearer ${token}` }
 });
 const solicitacoes = res.data.data; // Array de solicitações
 if (!solicitacoes || solicitacoes.length === 0) {
 solicitacoesContainer.innerHTML = `<p>Nenhuma solicitação de adoção
 encontrada.</p>`;
 return;
 }
 solicitacoesContainer.innerHTML = ""; // Limpa o container
 solicitacoes.forEach(solic => {
 // Considerando que cada solicitação tem os campos:
 // id, justificativa, situacao, pet e adotante
 const { documentId, id, justificativa, situacao, pet, adotante } =
 solic;
 const petNome = pet?.nome || "Sem nome";
 const petRaca = pet?.raca || "N/A";
 const petTamanho = pet?.tamanho || "N/A";
 // Caso o objeto adotante esteja populado, podemos exibir o nome
 dele (opcional)
 const adotanteNome = adotante?.nomeCompleto || "Não definido";
 const card = document.createElement('div');
 card.classList.add('solicitacao-card');
 card.innerHTML = `
 <div class="card-content">
<h2>Solicitação #${id}</h2>
 <p><strong>Pet:</strong> ${petNome} (Raça: ${petRaca}, Tamanho: 
${petTamanho})</p>
 <p><strong>Justificativa:</strong> <span class="justificativa
text">${justificativa || 'Não informado'}</span></p>
 <p><strong>Situação:</strong> <span class="situacao
text">${situacao || 'Não definida'}</span></p>
 <p><strong>Adotante:</strong> ${adotanteNome}</p>
 </div>
 <div class="card-buttons">
 <button class="aceitar-button" ${situacao !== 'Pendente' ?
 'disabled' : ''}>Aceitar</button>
 <button class="recusar-button" ${situacao !== 'Pendente' ?
 'disabled' : ''}>Recusar</button>
 </div>
 `;
 // Botão "Aceitar"
 const aceitarButton = card.querySelector('.aceitar-button');
 aceitarButton.addEventListener('click', async () => {
 if (confirm("Tem certeza que deseja aceitar esta solicitação?")) {
 try {
 // Atualiza a solicitação para "Confirmada"
 await api.put(`/solicitacao-de-adocaos/${documentId}`, {
 data: { situacao: "Confirmado" }
 }, {
 headers: { Authorization: `Bearer ${token}` }
});
 // Atualiza o pet para estabelecer o relacionamento com o
 adotante.
 solicitação
 // Supondo que o objeto "adotante" esteja presente na
 console.log(adotante.id)
 //   
//     
//       
//             
//         
//     
//       
//     
//   
if (pet && adotante) {
 await api.put(`/pets/${pet.documentId}`, {
 data: {
 adotante: adotante.id
 }  
}, {
 headers: { Authorization: `Bearer ${token}` }
 });
 }
 if (pet && adotante) {
 await api.put(`/users/${adotante.id}`, {
 data: {
 pets: { connect: [ pet.documentId ] }
 }
 }, {
 headers: { Authorization: `Bearer ${token}` }
 });
 }
alert('Solicitação confirmada com sucesso!');
 // Atualiza o texto e desabilita os botões
 card.querySelector('.situacao-text').textContent =
 "Confirmada";
 aceitarButton.disabled = true;
 recusarButton.disabled = true;
 } catch (error) {
 console.error(`Erro ao aceitar solicitação ${id}:`, error);
 alert('Erro ao confirmar a solicitação.');
 }
 }
 });
 // Botão "Recusar"
 const recusarButton = card.querySelector('.recusar-button');
 recusarButton.addEventListener('click', async () => {
 if (confirm("Tem certeza que deseja recusar esta solicitação?")) {
 try {
 // Atualiza a solicitação para "Recusada"
 await api.put(`/solicitacao-de-adocaos/${documentId}`, {
 data: { situacao: "Recusado" }
 }, {
 headers: { Authorization: `Bearer ${token}` }
 });
 alert('Solicitação recusada com sucesso!');
 // Atualiza o texto e desabilita os botões
card.querySelector('.situacao-text').textContent = "Recusada";
 aceitarButton.disabled = true;
 recusarButton.disabled = true;
 } catch (error) {
 console.error(`Erro ao recusar solicitação ${id}:`, error);
 alert('Erro ao recusar a solicitação.');
 }
 }
 });
 solicitacoesContainer.appendChild(card);
 });
 } catch (error) {
 console.error('Erro ao buscar solicitações:', error);
 solicitacoesContainer.innerHTML = "<p>Ocorreu um erro ao carregar as solicitações.</p>";
 }
 }
 await fetchSolicitacoes();
 });