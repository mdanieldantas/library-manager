const usersModel = require('./users-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

jest.mock('bcrypt');
jest.mock('uuid');

describe('Users Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar todos os usuários', () => {
    const users = usersModel.getAllUsers();
    expect(users).toHaveLength(2);
  });

  it('deve retornar um usuário pelo ID', () => {
    const user = usersModel.getUserById('1');
    expect(user).toEqual({
      id: '1',
      name: 'Isaac Pontes',
      email: 'isaac@email.com',
      password: '123456'
    });
  });

  it('deve retornar um usuário pelo email', () => {
    const user = usersModel.getUserByEmail('isaac@email.com');
    expect(user).toEqual({
      id: '1',
      name: 'Isaac Pontes',
      email: 'isaac@email.com',
      password: '123456'
    });
  });

  it('deve criar um novo usuário', () => {
    uuid.v4.mockReturnValue('3');
    bcrypt.hashSync.mockReturnValue('hashedpassword');

    const newUser = usersModel.createUser('New User', 'newuser@example.com', 'password123');
    expect(newUser).toEqual({
      id: '3',
      name: 'New User',
      email: 'newuser@example.com',
      password: 'hashedpassword'
    });
  });
});