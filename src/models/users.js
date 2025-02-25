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
module.exports = {
  getAllUsers: () => {
    return users;
  },
  getUserById: (id) => {
    return users.find((user) => user.id === id);
  },
  getUserByEmail: (email) => {
    return users.find((user) => user.email === email);
  },
  registerUser: (name, email, password) => {
    const userAlreadyRegistered = users.find((user) => user.email === email);
    if (userAlreadyRegistered) return null;
    const newUser = {
        id: Math.floor(Math.random() * 9999999).toString(),
        name,
        email,
        password,
        role: "standart"
    }
    users.push(newUser);
    return newUser
  },
};
