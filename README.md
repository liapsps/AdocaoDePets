# 🐾 Pet Lar

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

- **Usuário Interessado:** Pode visualizar funcionalidades básicas do site, se logar e cadastrar.
- **Usuário Adotante:** Pode navegar pelo catálogo de animais, registrar interesse em adoção e acessar informações sobre o processo.
- **Administrador:** Responsável por gerenciar o cadastro de animais, validar interesse de adotantes e monitorar a plataforma.

## :triangular_flag_on_post: Principais funcionalidades da aplicação

- Login/Cadastro de Usuário
- Cadastro e Gerenciamento de Animais para Adoção
- Filtro de Busca por Espécie, Raça, Idade, Tamanho, etc.
- Registro de Interesse na Adoção
- Visualização de Detalhes do Animal
- Gerenciamento de Perfil de Usuário
- Listagem e Gerenciamento de Solicitações de Adoção

## :spiral_calendar: Entidades ou tabelas do sistema

- **Usuário:** Representa as pessoas que utilizam a aplicação (adotantes e administradores).
- **Animal:** Armazena informações sobre os animais disponíveis para adoção.
- **Solicitação de Adoção:** Registra os usuários interessados em adotar um animal específico.

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

- HTML
- CSS
- JavaScript

**Backend:**

- Node.js
- Strapi

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade              | Criação | Leitura | Atualização | Remoção |
| --------------------- | ------- | ------- | ----------- | ------- |
| Usuário               | X       | X       | X           | X       |
| Animal                | X       | X       | X           | X       |
| Solicitação de Adoção | X       | X       | X           | X       |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL                    |
| ----------- | ---------------------- |
| GET         | /api/usuarios          |
| POST        | /api/usuarios          |
| PUT         | /api/usuarios/{id}     |
| DELETE      | /api/usuarios/{id}     |
| GET         | /api/animais           |
| POST        | /api/animais           |
| PUT         | /api/animais/{id}      |
| DELETE      | /api/animais/{id}      |
| GET         | /api/solicitacoes      |
| POST        | /api/solicitacoes      |
| PUT         | /api/solicitacoes/{id} |
| DELETE      | /api/solicitacoes/{id} |

## :gear: Configuração do Projeto

### Pré-requisitos

- Node.js
- Strapi
- PostgreSQL

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd <NOME_DO_DIRETORIO>
   ```

3. Instale as dependências do backend:

   ```bash
   cd my-strapi-project
   npm install
   ```

4. Inicie o servidor Strapi:

   ```bash
   npm run develop
   ```

5. Navegue até o diretório do frontend:

   ```bash
   cd ../src
   ```

6. Abra o arquivo `index.html` no navegador para visualizar a aplicação.

### Configuração do Strapi

1. Configure o banco de dados PostgreSQL no arquivo `config/database.js`:

   ```javascript
   // filepath: /c:/Users/Eridam/OneDrive/Documentos/PetLar/my-strapi-project/config/database.js
   module.exports = ({ env }) => ({
     defaultConnection: "default",
     connections: {
       default: {
         connector: "bookshelf",
         settings: {
           client: "postgres",
           host: env("DATABASE_HOST", "localhost"),
           port: env("DATABASE_PORT", 5432),
           database: env("DATABASE_NAME", "petlar"),
           username: env("DATABASE_USERNAME", "postgres"),
           password: env("DATABASE_PASSWORD", "password"),
           ssl: env.bool("DATABASE_SSL", false),
         },
         options: {},
       },
     },
   });
   ```

2. Configure as permissões e roles no painel administrativo do Strapi.

### Executando o Projeto

1. Inicie o servidor Strapi:

   ```bash
   cd my-strapi-project
   npm run develop
   ```

2. Abra o arquivo `index.html` no navegador para visualizar a aplicação.

### Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-branch
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha contribuição"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-branch
   ```
5. Abra um Pull Request.

### Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
