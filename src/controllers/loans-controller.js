const loansModel = require("../models/loans-model");
const { show } = require("./books-controller");



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

 // POST   /api/loans/:id/return ---devolve um emprestimo 



}