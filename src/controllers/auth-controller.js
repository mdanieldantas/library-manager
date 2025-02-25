const usersModel = require("../models/users-model");

// const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    const existingUser = usersModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    // if (!isValidEmail(email)) {
    //     return res.status(400).json({ message: "Email inválido." });
    //   }

    const newUser = usersModel.createUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined });
  },

  // POST /auth/login
  login: (req, res) => {
    // Implementação do login
  },

  // POST /auth/logout
  logout: (req, res) => {
    // Implementação do logout
  },
};
