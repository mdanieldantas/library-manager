
// CORREÇÃO DAS ROTAS:
const express = require("express");
const apiRouter = express.Router();
const booksController = require("../controllers/books-controller");
const loansController = require("../controllers/loans-controller");

// GET

// Rotas específicas primeiro
apiRouter.get("/books/search", booksController.findByAuthor); // busca por autor usando query params
// Então rotas com parâmetros
apiRouter.get("/books/:id", booksController.show); // busca por id
// Por último, rotas gerais
apiRouter.get("/books", booksController.index); // busca todos os livros
// Em routes/api.js

// POST

apiRouter.post("/books/search/author", booksController.searchByRequestBody); // busca por autor usando corpo da requisição
apiRouter.post("/books", booksController.save); // cria um novo livro

// PUT
apiRouter.put("/books/:id", booksController.update); // atualiza um livro

//DELETE
apiRouter.delete("/books/:id", booksController.delete); // deleta um livro


apiRouter.get("/loans", loansController.index); // busca todos os emprestimos   

apiRouter.get("/loans/:id",loansController.show); // busca um emprestimo por id

module.exports = apiRouter;






// const express = require ("express");
// const apiRouter = express.Router();
// const booksController = require("../controllers/books-controller");

// apiRouter.get("/books", booksController.index); //  busca todos os livros
// apiRouter.get("/books/:id", booksController.show); // busca por id
// apiRouter.get("/books?author=nome", booksController.findBookByAuthor); 

// module.exports = apiRouter;