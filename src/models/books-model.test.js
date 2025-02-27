const booksModel = require('./books-model');
const uuid = require('uuid');

// Mock do módulo uuid para testes previsíveis
jest.mock('uuid', () => ({
  v4: jest.fn()
}));

describe('Books Model', () => {
  // Restaura o array de livros para o estado original antes de cada teste
  beforeEach(() => {
    // Redefine o mock do uuid
    jest.clearAllMocks();
    
    // Restaura o array de livros para o estado original
    const originalBooks = [
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
      }
    ];
    
    // Limpa o array de livros e adiciona os livros originais
    const books = booksModel.getAllBooks();
    books.length = 0;
    originalBooks.forEach(book => books.push(book));
  });

  describe('getAllBooks', () => {
    test('deve retornar todos os livros', () => {
      const books = booksModel.getAllBooks();
      
      expect(books).toHaveLength(2);
      expect(books[0].id).toBe("1");
      expect(books[1].id).toBe("2");
    });
  });

  describe('createBook', () => {
    test('deve criar um novo livro com um id gerado', () => {
      // Configurar o mock do uuid para retornar um valor previsível
      uuid.v4.mockReturnValue('mocked-uuid');
      
      const newBook = booksModel.createBook('Novo Livro', 'Novo Autor', 5);
      
      expect(uuid.v4).toHaveBeenCalled();
      expect(newBook).toEqual({
        id: 'mocked-uuid',
        title: 'Novo Livro',
        author: 'Novo Autor',
        quantiteAvailable: 5
      });
      
      // Verificar se o livro foi adicionado à lista
      const books = booksModel.getAllBooks();
      expect(books).toHaveLength(3);
      expect(books[2]).toEqual(newBook);
    });
  });

  describe('getBookById', () => {
    test('deve retornar um livro pelo id quando existir', () => {
      const book = booksModel.getBookById('1');
      
      expect(book).toEqual({
        id: '1',
        title: 'Book one',
        author: 'Author one',
        quantiteAvailable: 4
      });
    });

    test('deve retornar undefined quando o livro não existir', () => {
      const book = booksModel.getBookById('id-inexistente');
      
      expect(book).toBeUndefined();
    });
  });

  describe('getBookByTitle', () => {
    test('deve retornar um livro pelo título quando existir', () => {
      const book = booksModel.getBookByTitle('Book one');
      
      expect(book).toEqual({
        id: '1',
        title: 'Book one',
        author: 'Author one',
        quantiteAvailable: 4
      });
    });

    test('deve retornar undefined quando o livro não existir', () => {
      const book = booksModel.getBookByTitle('Título Inexistente');
      
      expect(book).toBeUndefined();
    });
  });

  describe('getBooksByAuthor', () => {
    test('deve retornar um livro pelo autor quando existir', () => {
      const book = booksModel.getBooksByAuthor('Author one');
      
      expect(book).toEqual({
        id: '1',
        title: 'Book one',
        author: 'Author one',
        quantiteAvailable: 4
      });
    });

    test('deve retornar undefined quando não existir livro do autor', () => {
      const book = booksModel.getBooksByAuthor('Autor Inexistente');
      
      expect(book).toBeUndefined();
    });
  });

  describe('updateBook', () => {
    test('deve atualizar um livro existente', () => {
      const updatedBook = booksModel.updateBook('1', { 
        title: 'Título Atualizado', 
        quantiteAvailable: 10 
      });
      
      expect(updatedBook).toEqual({
        id: '1',
        title: 'Título Atualizado',
        author: 'Author one',
        quantiteAvailable: 10
      });
      
      // Verificar se o livro foi realmente atualizado na lista
      const book = booksModel.getBookById('1');
      expect(book).toEqual(updatedBook);
    });

    test('deve lançar um erro quando tentar atualizar um livro inexistente', () => {
      expect(() => {
        booksModel.updateBook('id-inexistente', { title: 'Novo Título' });
      }).toThrow('livro não encontrado');
    });
  });

  describe('deleteBook', () => {
    test('deve excluir um livro existente e retorná-lo', () => {
      const deletedBook = booksModel.deleteBook('1');
      
      expect(deletedBook).toEqual({
        id: '1',
        title: 'Book one',
        author: 'Author one',
        quantiteAvailable: 4
      });
      
      // Verificar se o livro foi realmente removido da lista usando o método filter
      const books = booksModel.getAllBooks();
      expect(books).toHaveLength(1);
      expect(books.find(book => book.id === '1')).toBeUndefined();
    });

    test('deve manter a integridade do array após a exclusão', () => {
      // Excluir um livro
      booksModel.deleteBook('1');
      
      // Obter a lista atualizada
      const books = booksModel.getAllBooks();
      
      // Verificar se a lista contém apenas o livro restante com o id correto
      expect(books).toHaveLength(1);
      expect(books[0].id).toBe('2');
    });

    test('deve lançar um erro quando tentar excluir um livro inexistente', () => {
      expect(() => {
        booksModel.deleteBook('id-inexistente');
      }).toThrow('livro não encontrado');
    });
  });
});