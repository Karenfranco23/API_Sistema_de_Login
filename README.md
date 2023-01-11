### 💻 **Projeto**

API de Autenticação (Sistema de Login)

Nesta aplicação foi feita uma API, onde é possível cadastrar usuário com (email, password, name e role).
Para que os usuários possam acessar as rotas da aplicação, é preciso autenticar o usuário inicial (user admin), essa autenticação é feita pelo email e password do usuário admin cadastrado, gerando assim o Token de acesso, para autenticar a demais rotas. O usuário admin tem permissão para criar usuários, que poderão seguir outras rotas com algumas restrições de acesso.

### 🛠️ **Tecnologias**

- NodeJS v16.17.0

- NestJS v9.0.0

- Prisma ORM v4.8.0

### 🔐 **Segurança**

- Token JWT

### 🌐 **Endpoints**

- POST - /auth: Autenticação do usuário

- POST - /user: Criação de um novo usuário

- GET - /user: Buscar todos os usuários

- GET - /user/id: Buscar o usuário pelo ID

- PATCH - /user/id: Editar um atributo do usuário para ser atualizado

- DELETE - /user/id: Deletar um usuário

### 📄 **Documentos**

- Documentação da API com Swagger ([clique aqui](http://localhost:3000/api)).

