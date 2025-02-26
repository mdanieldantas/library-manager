const jwt = require("jsonwebtoken");
const usersModel = require("../models/users-model");

module.exports = {
  ensureAuth: (req, res, next) => {
    // pega da requisição do header o authorization e pega o token
    const authHeader = req.headers.authorization;
    // caso não tenha o token retorna um erro
    if (!authHeader)
      return res.status(401).json({ message: "Token não encontrado" });
    // caso tenha pega o token separa o token do titulo Bearer e pega o token
    const token = authHeader.split(" ")[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_KEY)
      const user = usersModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      req.user = user;
      next();
    } catch (error) {
      // caso o token seja inválido retorna um erro
      return res.status(401).json({ message: "Token inválido" });
    }
  },
};
