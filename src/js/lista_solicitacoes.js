import api from './axiosConfig.js';
document.addEventListener('DOMContentLoaded', async () => {
	const solicitacoesContainer = document.getElementById('solicitacoes-container');
	const token = localStorage.getItem("jwt");
	const userId = localStorage.getItem("id");
	if (!token || !userId) {
		alert("Usuário não autenticado. Faça login novamente.");
		window.location.href = "entrar.html";
		return;
	}
	async function fetchSolicitacoes() {
		try {
			const res = await api.get('/solicitacao-de-adocaos', {
				params: {
					'filters[adotante][id][$eq]': userId,
					populate: '*'
				},
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const solicitacoes = res.data.data;
			if (!solicitacoes || solicitacoes.length === 0) {
				solicitacoesContainer.innerHTML = `<p>Você não possui solicitações de adoção.</p>`;
				return;
			}
			solicitacoesContainer.innerHTML = "";
			solicitacoes.forEach(solic => {
				const { id, justificativa, situacao, pet } = solic;
				const documentId = solic.id; // Corrected variable name
				const petNome = pet?.nome || "Sem nome";
				const petRaca = pet?.raca || "N/A";
				const petTamanho = pet?.tamanho || "N/A";
				const card = document.createElement('div');
				card.classList.add('solicitacao-card');
				card.innerHTML = `
					<div class="card-content">
						<h2>Solicitação #${id}</h2>
						<p><strong>Pet:</strong> ${petNome} (Raça: ${petRaca}, Tamanho: ${petTamanho})</p>
						<p><strong>Justificativa:</strong> <span class="justificativa-text">${justificativa || 'Não informado'}</span></p>
						<p><strong>Situação:</strong> <span class="situacao-text">${situacao || 'Não definida'}</span></p>
					</div>
					<div class="card-buttons">
						<button class="edit-button" ${situacao !== 'Pendente' ? 'disabled' : ''}>Editar</button>
						<button class="delete-button">Excluir</button>
					</div>
				`;
				const editButton = card.querySelector('.edit-button');
				editButton.addEventListener('click', async () => {
					const currentJustificativa = card.querySelector('.justificativa-text').textContent;
					const novaJustificativa = prompt("Digite a nova justificativa:", currentJustificativa);
					if (novaJustificativa && novaJustificativa !== currentJustificativa) {
						try {
							await api.put(`/solicitacao-de-adocaos/${documentId}`, {
								data: {
									justificativa: novaJustificativa
								}
							}, {
								headers: {
									Authorization: `Bearer ${token}`
								}
							});
							alert('Solicitação atualizada com sucesso!');
							card.querySelector('.justificativa-text').textContent = novaJustificativa;
						} catch (error) {
							console.error(`Erro ao atualizar solicitação ${id}:`, error);
							alert('Erro ao atualizar a solicitação.');
						}
					}
				});
				const deleteButton = card.querySelector('.delete-button');
				deleteButton.addEventListener('click', async () => {
					if (confirm("Tem certeza que deseja excluir esta solicitação?")) {
						try {
							await api.delete(`/solicitacao-de-adocaos/${documentId}`, {
								headers: {
									Authorization: `Bearer ${token}`
								}
							});
							alert('Solicitação excluída com sucesso!');
							card.remove();
						} catch (error) {
							console.error(`Erro ao excluir solicitação ${id}:`, error);
							alert('Erro ao excluir a solicitação.');
						}
					}
				});
				solicitacoesContainer.appendChild(card);
			});
		} catch (error) {
			console.error('Erro ao buscar solicitações:', error);
			solicitacoesContainer.innerHTML = "<p>Ocorreu um erro ao carregar suas solicitações.</p>";
		}
	}
	await fetchSolicitacoes();
});