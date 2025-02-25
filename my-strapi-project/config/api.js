// Exporta um objeto de configuração para o módulo
module.exports = {
  rest: {
    // Define o limite padrão de itens retornados em uma solicitação REST
    defaultLimit: 25,
    // Define o limite máximo de itens retornados em uma solicitação REST
    maxLimit: 100,
    // Indica se a contagem total de itens deve ser incluída na resposta
    withCount: true,
  },
};
