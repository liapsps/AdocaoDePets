# 🐾 Site de Adoção de Animais

Essa aplicação serve como um portal para conectar pessoas interessadas em adotar animais de estimação com abrigos e ONGs que possuem animais disponíveis para adoção. A plataforma oferece ferramentas para cadastro de animais, busca por filtros e registro de interesse na adoção.

## :technologist: Membros da equipe

- 569565, Ana Julia Chaves, Engenharia de Software
- 542086, Janaina Macário de Sousa, Sistemas de Informação

## :bulb: Objetivo Geral
Facilitar o processo de adoção de animais, conectando adotantes a abrigos e ONGs, promovendo a adoção responsável e ajudando a reduzir o número de animais abandonados.

## :eyes: Público-Alvo
Pessoas que desejam adotar um animal de estimação ou encontrar novos lares para animais disponíveis.

## :star2: Impacto Esperado
Promover a adoção responsável, aumentar a taxa de adoção e reduzir o abandono de animais, criando uma plataforma acessível e funcional.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- **Usuário Adotante:** Pode navegar pelo catálogo de animais, registrar interesse em adoção e acessar informações sobre o processo.
- **Administrador:** Responsável por gerenciar o cadastro de animais, validar interesse de adotantes e monitorar a plataforma.


## :triangular_flag_on_post: Principais funcionalidades da aplicação

- Login/Cadastro de Usuário
- Cadastro e Gerenciamento de Animais para Adoção
- Filtro de Busca por Espécie, Raça, Idade, Tamanho, etc.
- Registro de Interesse na Adoção
- Visualização de Detalhes do Animal

## :spiral_calendar: Entidades ou tabelas do sistema

- **Usuário:** Representa as pessoas que utilizam a aplicação (adotantes e administradores).
- **Animal:** Armazena informações sobre os animais disponíveis para adoção.
- **Interesse:** Registra os usuários interessados em adotar um animal específico.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:

----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

- React.js
- TailwindCSS
- Axios
  
**Backend:**

- Node.js
- Express.js
- PostgreSQL

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade        | Criação | Leitura | Atualização | Remoção |
|------------------|---------|---------|-------------|---------|
| Usuário          | X       | X       | X           | X       |
| Animal           | X       | X       | X           | X       |
| Interesse        | X       | X       |             | X       |


## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL                |
|-------------|--------------------|
| GET         | /api/usuarios      |
| POST        | /api/usuarios      |
| PUT         | /api/usuarios/{id} |
| DELETE      | /api/usuarios/{id} |
| GET         | /api/animais       |
| POST        | /api/animais       |
| PUT         | /api/animais/{id}  |
| DELETE      | /api/animais/{id}  |
| GET         | /api/interesses    |
| POST        | /api/interesses    |
| DELETE      | /api/interesses/{id}|


