const booksModel = require("../models/books-model");

module.exports = {
  // GET /api/books  busca todos os livros
  index: (req, res) => {
    const books = booksModel.getAllBooks();
    return res.json(books);
  },
  // GET /api/books/:id busca por id
  show: (req, res) => {
    const { id } = req.params;
    const book = booksModel.getBookById(id);
    if (!book) return res.status(404).json({ error: "Livro nao encontrado" });
    return res.json(book);
  },

  // GET /api/books/search?author=nome busca por autor
  findByAuthor: (req, res) => {
    const { author } = req.query;

    if (!author) {
      return res
        .status(400)
        .json({ error: "Parâmetro 'author' é obrigatório" });
    }

    const books = booksModel.getBooksByAuthor(author);

    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ error: "Livros não encontrados para este autor" });
    }

    return res.json(books);
  },

  // GET /api/books/title/:title busca por titulo
 

  //----POST-----//

  // POST /api/books/search/author
  searchByRequestBody: (req, res) => {
    const { author } = req.body;

    if (!author) {
      return res
        .status(400)
        .json({ error: "Campo 'author' é obrigatório no corpo da requisição" });
    }

    const books = booksModel.getBooksByAuthor(author);

    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ error: "Livros não encontrados para este autor" });
    }

    return res.json(books);
  },

  // POST /api/books criar um livro
  save: (req, res) => {
    const { title, author, quantiteAvailable } = req.body;
    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof quantiteAvailable !== "number"
    ) {
      return res.status(400).json({ message: "Dados invalidos!" });
    }
    const newBook = booksModel.createBook(title, author, quantiteAvailable);
    return res.status(201).json(newBook);
  },

  // PUT /api/books/:id atualizar o livro
  update: (req, res) => {
    // id do livro  para editar 
    const { id } = req.params;
    // paratros da requisição para atualizar o livro
    const { title, author, quantiteAvailable } = req.body;
    // cria uma variável para armazenar os campos a serem atualizados
     const fieldsToUpdate = {}; 
     // verifica se os parâmetros foram passados e adiciona ao objeto fieldsToUpdate
    if (title) fieldsToUpdate.title = title;  
    if (author) fieldsToUpdate.author = author;
    if (quantiteAvailable) fieldsToUpdate.quantiteAvailable = quantiteAvailable;
    const updatedBook = booksModel.updateBook(id, fieldsToUpdate);
    // verifica se o livro foi atualizado  
    return res.json(updatedBook);
  },

  // DELETE /api/books/:id deletar o livro
  delete: (req, res) => { 
const {id} = req.params;
const deleteBook = booksModel.deleteBook(id);

return res.json(deleteBook);


  }
};
