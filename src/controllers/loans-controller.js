const HttpError = require("../errors/HttpError")
const booksModel = require("../models/books-model")
const loansModel = require("../models/loans-model")



module.exports = {
 // GET   /api/loans ---busca todos os emprestimos
 index: (req,res)=>{
    const loans = loansModel.getAllLoans()
    res.json(loans)
 },

 // GET   /api/loans/:id ---busca um emprestimo por id
show:(req,res)=>{
const {id} = req.params
const loan = loansModel.getLoanById(id)
if(!loan) throw new HttpError(404, "emprestimo nao encontrado")
res.json(loan)
},


 // POST  /api/loans ---cria um novo emprestimo
 save: (req, res) => {
   const user = req.user
   const { bookId } = req.body

   if (typeof bookId !== 'string') throw new HttpError(400, 'ID de livro inválido!')

   const book = booksModel.getBookById(bookId)
   if (!book) throw new HttpError(404, 'Livro não encontrado!')
   
   const newLoan = loansModel.createLoan(user, book)
   res.status(201).json(newLoan)
 },

 // POST   /api/loans/:id/return ---devolve um emprestimo 



}