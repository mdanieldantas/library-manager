const HttpError = require("../errors/HttpError");

const uuid = require("uuid").v4;

let books = [
  {
    id: "1",
    title: "Book one",
    author: "Author one",
    quantiteAvailable: 4,
    
  },
  {
    id: "2",
    title: "Book two",
    author: "Author two",
    quantiteAvailable: 3,
  },
];

module.exports = {
  getAllBooks: () => books.map(book => ({id: book.id, title: book.title})),

  createBook: (title, author, quantiteAvailable) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantiteAvailable,
    };

    books.push(newBook);
    return newBook;
  },

  getBookById: (id) => books.find((book) => book.id === id),

  getBookByTitle: (title) => books.find((book) => book.title === title),

  getBooksByAuthor: (author) => {
    if (!author) return [];
    
    // Convertendo para minúsculas e usando includes para busca parcial
    const searchTerm = author.toLowerCase();
    return books.filter((book) => 
      book.author.toLowerCase().includes(searchTerm)
    );
  },

  updateBook: (id, updateBook) => {
    // findindex procura o primeiro elemento passado na callback no caso o ID do objeto book
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) throw new HttpError(404,"livro não encontrado");
    // pega o obejeto book na posição do index e atribui a ele um novo obejto com as propriedades do livro antigo e as novas propriedades
    books[bookIndex] = {
      // usa o operador de espalhamento para copiar as propriedades do objeto book antigo na posição index, e depois copia as propriedades do objeto updateBook
      ...books[bookIndex],
      ...updateBook,
    };
    // retorna o livro atualizado
    return books[bookIndex];
  },

  deleteBook: (id) => {
    // findindex procura o primeiro elemento passado na callback no caso o ID do objeto book
    const bookIndex = books.findIndex((book) => book.id === id);
    // se o index for -1 significa que o livro não foi encontrado
    if (bookIndex === -1) throw new HttpError(404,"livro não encontrado");
    // a variavel deleteBook recebe o objeto book na posição do index
    const deleteBook = books[bookIndex];
    // a variavel de objetos books recebe um novo array com todos os objetos que não tem o id igual ao id passado
    books = books.filter((book) => book.id !== id);
    // retonna o livro deletado
    return deleteBook;
  },
  takeBook: (id) => { 
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) throw new HttpError(404,"livro não encontrado");
    books[bookIndex].quantiteAvailable -= 1;
    return books[bookIndex];
  },

  returnBook: (id) => { 
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) throw new HttpError(404,"livro não encontrado");
    books[bookIndex].quantiteAvailable += 1;
    return books[bookIndex];
  },

};
