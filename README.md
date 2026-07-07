# API CRUD

Backend de um CRUD desenvolvido com Node.js, Express e MySQL.

---

# Objetivo do Projeto

Este projeto tem como objetivo fornecer uma API REST para gerenciamento da aplicação em diversos serviços.

Atualmente o projeto possui:

- Integração com MySQL
- Cadastro de usuários
- Listagem de usuários
- Criptografia de senhas com bcrypt
- Arquitetura organizada em camadas
- Variáveis de ambiente
- Pool de conexões com MySQL


# Tecnologias Utilizadas

## Backend

- Node.js
- Express
- MySQL
- mysql2
- bcrypt
- dotenv
- cors

## Desenvolvimento

- Nodemon
- Postman

---

# Estrutura do Projeto

```text
backend/
│
├── node_modules/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── services/
|   |   └── authService.js
│   │
│   └── app.js
│
├── .env
├── package.json
├── package-lock.json
└── server.js
```

---

# Arquitetura

A aplicação segue o padrão:

```text
Route
 ↓
Controller
 ↓
Model
 ↓
Database
```

Exemplo:

```text
POST /api/registro
        ↓
authRoutes
        ↓
authController
        ↓
userModel
        ↓
MySQL
```

---

# Configuração do Ambiente

## Instalação

Clone o projeto:

```bash
git clone https://github.com/Marcojaco/ipbFloramar.git
```

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

# Variáveis de Ambiente

Criar um arquivo:

```text
.env
```

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

---

# Banco de Dados

## Criar Banco

```sql
CREATE DATABASE nome_do_banco;
```

Selecionar banco:

```sql
USE nome_do_banco;
```

---

## Tabela Usuarios

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Inicializando o Projeto

## Produção

```bash
node server.js
```

## Desenvolvimento

```bash
npx nodemon server.js
```

---

# Funcionalidades Implementadas

## Listar Usuários

### Endpoint

```http
GET /api/usuarios
```

### Resposta

```json
[
  {
    "id": 1,
    "nome": "Teste",
    "email": "Teste@gmail.com",
    "created_at": "2026-06-14T00:00:00.000Z"
  }
]
```

---

## Cadastro de Usuário

### Endpoint

```http
POST /api/registro
```

### Body

```json
{
  "nome": "Teste Teste",
  "email": "teste@gmail.com",
  "senha": "123456"
}
```

### Resposta

```json
{
  "mensagem": "Usuário registrado com sucesso!",
  "usuarioId": 1
}
```

---

# Segurança Implementada

## Senhas Criptografadas

As senhas são armazenadas utilizando:

```text
bcrypt
```

Exemplo:

```text
$2b$10$4fP4s8v9Hf...
```

Nunca armazenamos senhas em texto puro.

---

## SQL Injection

As consultas utilizam placeholders:

```sql
WHERE email = ?
```

Exemplo:

```js
pool.promise().query(sql, [email]);
```

Isso reduz significativamente riscos de SQL Injection.

---

# Modelos

## userModel

Responsável por:

- Buscar usuários
- Criar usuários
- Consultas SQL

Funções atuais:

```js
buscarTodosUsuarios()
criar()
buscarUsuarioPorEmail()
```

---

# Controllers

## authController

Responsável por:

- Receber requisições
- Validar dados
- Criptografar senhas
- Chamar Models
- Retornar respostas

Funções atuais:

```js
listarUsuarios()
registrarUsuario()
loginUsuario()
```

---

# Rotas

## authRoutes

Rotas atuais:

```http
GET  /api/usuarios
POST /api/registro
GET  /api/login
```

# Padrão de Desenvolvimento

Sempre seguir:

```text
Route
 ↓
Controller
 ↓
Model
 ↓
Database
```

Evitar:

```text
Route
 ↓
SQL direto
```

Toda regra de negócio deve ficar em Controllers ou Services.

---

# Autor

Projeto desenvolvido para estudo.

---

# Changelog

## v0.1.0

- Estrutura inicial do projeto
- Integração Express
- Integração MySQL
- Pool de conexões
- Cadastro de usuários
- Listagem de usuários
- Hash de senha com bcrypt
