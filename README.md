# 📚 Book CRUD API — Express.js + TypeScript + SQLite

API REST para cadastro de livros, construída com **Express.js**, **TypeScript** e **SQLite** (via `better-sqlite3`). Todas as queries são feitas em **SQL puro**, sem ORM.

---

## 🧰 Tecnologias utilizadas

| Tecnologia | Motivo da escolha |
|---|---|
| **Express.js** | Framework HTTP minimalista e amplamente adotado no ecossistema Node.js |
| **TypeScript** | Adiciona tipagem estática, evitando bugs em tempo de compilação |
| **SQLite** | Banco de dados em arquivo local, sem necessidade de instalação de servidor |
| **better-sqlite3** | Driver SQLite com API síncrona, mais simples e performática que alternativas |
| **uuid** | Geração de IDs únicos universais para cada livro |
| **ts-node-dev** | Executa TypeScript diretamente em desenvolvimento com hot-reload |

---

## 📁 Estrutura do projeto

```
book-crud/
├── src/
│   ├── controllers/
│   │   └── bookController.ts   # Lógica e queries SQL de cada endpoint
│   ├── routes/
│   │   └── bookRoutes.ts       # Mapeamento de métodos HTTP e URLs
│   ├── models/
│   │   └── book.ts             # Interface TypeScript do livro
│   ├── database/
│   │   ├── db.ts               # Conexão singleton com o SQLite
│   │   └── migrate.ts          # Criação da tabela na inicialização
│   └── server.ts               # Ponto de entrada da aplicação
├── books.db                    # Gerado automaticamente pelo SQLite
├── tsconfig.json
└── package.json
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) versão **18 ou superior**
- [npm](https://www.npmjs.com/) versão **9 ou superior**

Para verificar as versões instaladas:

```bash
node -v
npm -v
```

---

## 🚀 Instalação

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/book-crud.git
cd book-crud
```

**2. Instale as dependências**

```bash
npm install
```

Isso instalará automaticamente:

- Dependências de produção: `express`, `uuid`, `better-sqlite3`
- Dependências de desenvolvimento: `typescript`, `ts-node-dev` e todos os `@types/*`

---

## ▶️ Rodando o projeto

### Modo desenvolvimento (com hot-reload)

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`.  
A cada alteração nos arquivos `.ts`, ele reinicia automaticamente.

### Modo produção

```bash
# 1. Compila o TypeScript para JavaScript
npm run build

# 2. Executa o código compilado
npm start
```

Os arquivos compilados ficam na pasta `/dist`.

---

## 🗄️ Banco de dados

O arquivo `books.db` é criado **automaticamente** na raiz do projeto na primeira execução. Não é necessário nenhuma configuração manual.

A tabela `books` possui a seguinte estrutura:

| Coluna | Tipo SQLite | Descrição |
|---|---|---|
| `id` | TEXT (PK) | UUID gerado automaticamente |
| `name` | TEXT | Nome do livro |
| `author` | TEXT | Autor |
| `description` | TEXT | Descrição |
| `image_url` | TEXT | URL da imagem de capa |
| `price` | REAL | Preço (decimal) |

> O SQLite usa `REAL` para números decimais (equivalente ao `float`/`double`).  
> O `id` é do tipo `TEXT` porque armazena UUIDs, que são strings.

---

## 🔌 Endpoints

Base URL: `http://localhost:3000`

| Método | Rota | Descrição | Status de sucesso |
|---|---|---|---|
| `GET` | `/books` | Lista todos os livros | `200 OK` |
| `GET` | `/books/:id` | Busca um livro pelo ID | `200 OK` |
| `POST` | `/books` | Cria um novo livro | `201 Created` |
| `PUT` | `/books/:id` | Atualiza um livro existente | `200 OK` |
| `DELETE` | `/books/:id` | Remove um livro | `204 No Content` |

---

## 📨 Exemplos de uso

### Criar um livro — `POST /books`

**Body (JSON):**
```json
{
  "name": "Clean Code",
  "author": "Robert C. Martin",
  "description": "Guia para escrever código limpo e sustentável.",
  "imageUrl": "https://example.com/clean-code.jpg",
  "price": 89.90
}
```

Todos os campos são **obrigatórios** na criação.

---

### Listar todos os livros — `GET /books`

Não requer body. Retorna um array com todos os livros cadastrados (pode ser vazio).

---

### Buscar por ID — `GET /books/:id`

```
GET /books/a3f2c1d4-...
```

Retorna `404 Not Found` se o ID não existir.

---

### Atualizar um livro — `PUT /books/:id`

**Body (JSON) — todos os campos são opcionais:**
```json
{
  "price": 74.90
}
```

Campos não enviados mantêm seus valores originais.

---

### Deletar um livro — `DELETE /books/:id`

```
DELETE /books/a3f2c1d4-...
```

Retorna `204 No Content` sem corpo na resposta.

---
