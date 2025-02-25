const { getAllUsers, getUserById, getUserByEmail } = require('./users');

test('getAllUsers deve retornar todos os usuários', () => {
    const users = getAllUsers();
    expect(users.length).toBe(2);
    expect(users[0].name).toBe('John Doe');
    expect(users[1].name).toBe('Jane Doe');
});

test('getUserById deve retornar o usuário correto pelo ID', () => {
    const user = getUserById(1);
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
});

test('getUserByEmail deve retornar o usuário correto pelo email', () => {
    const user = getUserByEmail('U0E5G@example.com');
    expect(user).toBeDefined();
    expect(user.name).toBe('Jane Doe');
});

