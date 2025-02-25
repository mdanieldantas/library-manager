const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./auth-controller');
const usersModel = require('../models/users-model');

const app = express();
app.use(bodyParser.json());
app.post('/auth/register', authController.register);

jest.mock('../models/users-model');

describe('Auth Controller - Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 400 se algum campo estiver faltando', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Todos os campos são obrigatórios');
  });

  it('deve retornar 400 se a senha tiver menos de 6 caracteres', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: '123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A senha deve ter pelo menos 6 caracteres.');
  });

  it('deve retornar 400 se o email já estiver cadastrado', async () => {
    usersModel.getUserByEmail.mockReturnValue({ id: '1', email: 'test@example.com' });

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail já cadastrado!');
  });

//   it('deve retornar 400 se o email for inválido', async () => {
//     const response = await request(app)
//       .post('/auth/register')
//       .send({ name: 'Test User', email: 'invalid-email', password: '123456' });

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Email inválido.');
//   });

  it('deve retornar 201 e criar um novo usuário se os dados forem válidos', async () => {
    usersModel.getUserByEmail.mockReturnValue(null);
    usersModel.createUser.mockReturnValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword'
    });

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: undefined
    });
  });
});