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
      return res.status(400).json({ error: "Parâmetro 'author' é obrigatório" });
    }
    
    const books = booksModel.getBooksByAuthor(author);
    
    if (!books || books.length === 0) {
      return res.status(404).json({ error: "Livros não encontrados para este autor" });
    }
    
    return res.json(books);
  },

  // 
searchByRequestBody: (req, res) => {
    const { author } = req.body;
    
    if (!author) {
      return res.status(400).json({ error: "Campo 'author' é obrigatório no corpo da requisição" });
    }
    
    const books = booksModel.getBooksByAuthor(author);
    
    if (!books || books.length === 0) {
      return res.status(404).json({ error: "Livros não encontrados para este autor" });
    }
    
    return res.json(books);
  }

  // GET /api/books/title/:title busca por titulo

  // POST /api/books criar um livro

  // PUT /api/books/:id atualizar o livro

  // DELETE /api/books/:id deletar o livro
};
