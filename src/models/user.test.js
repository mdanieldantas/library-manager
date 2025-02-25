const { getAllUsers, getUserById, getUserByEmail, registerUser } = require('./users');

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

test('registerUser deve adicionar um novo usuário', () => {
    const newUser = {
        name: 'Alice Doe',
        email: 'alice@example.com',
        password: '123'
    };
    const createdUser = registerUser(newUser.name, newUser.email, newUser.password);
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.password).toBe(newUser.password);
    expect(createdUser.role).toBe('standart');

    const users = getAllUsers();
    expect(users.length).toBe(3);
    expect(users[2].name).toBe('Alice Doe');
});

test('registerUser não deve adicionar um usuário com email duplicado', () => {
    const duplicateUser = {
        name: 'John Smith',
        email: 'U0E4G@example.com',
        password: '123'
    };
    const createdUser = registerUser(duplicateUser.name, duplicateUser.email, duplicateUser.password);
    expect(createdUser).toBeNull();

    const users = getAllUsers();
    expect(users.length).toBe(3); // Ainda deve ser 3, pois o usuário duplicado não foi adicionado
});