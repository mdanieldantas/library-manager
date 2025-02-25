const uuid = require("uuid").v4

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "U0E4G@example.com",
    password: "12",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "U0E5G@example.com",
    password: "12",
  },
];

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

module.exports = {
  getAllUsers: () => {
    return users;
  },
  getUserById: (id) => {
    return users.find((user) => user.id === id);
  },
  getUserByEmail: (email) => {
    return users.find(user => user.email === email);
  },
//   registerUser: (name, email, password) => {
//     const userAlreadyRegistered = users.find(user => user.email === email);
//     if (userAlreadyRegistered) return null;
//     const newUser = {
//         id: Math.floor(Math.random() * 9999999).toString(),
//         name,
//         email,
//         password,
//         role: "standart"
//     }
//     users.push(newUser);
//     return newUser
//   },
  createUser: (name,email,password)=>{
    if (!name || !email || !password) {
        throw new Error("Todos os campos (nome, email, senha) são obrigatórios.");
      }
  
      if (!isValidEmail(email)) {
        throw new Error("Email inválido.");
      }
  
      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
      }
  
      const userAlreadyRegistered = users.find((user) => user.email === email);
      if (userAlreadyRegistered) return null;
    const newUser = {
        id: uuid(),
        name,
        email,
        password,
        role: "standart"
    }
    users.push(newUser);
    return newUser
  },
};
