const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./auth-controller');
const usersModel = require('../models/users-model');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

jest.mock('../models/users-model');
jest.mock('jsonwebtoken');

describe('Auth Controller - Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste para verificar se algum campo está faltando
  it('deve retornar 400 se algum campo estiver faltando', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Todos os campos são obrigatórios');
  });

  // Teste para verificar se a senha tem menos de 6 caracteres
  it('deve retornar 400 se a senha tiver menos de 6 caracteres', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: '123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A senha deve ter pelo menos 6 caracteres.');
  });

  // Teste para verificar se o email já está cadastrado
  it('deve retornar 400 se o email já estiver cadastrado', async () => {
    usersModel.getUserByEmail.mockReturnValue({ id: '1', email: 'test@example.com' });

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail já cadastrado!');
  });

  // Teste para verificar se o email é inválido
  it('deve retornar 400 se o email for inválido', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'invalid-email', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email inválido.');
  });

  // Teste para verificar se um novo usuário é criado com dados válidos
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

describe('Auth Controller - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste para verificar se algum campo está faltando
  it('deve retornar 400 se algum campo estiver faltando', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Dados invalidos!');
  });

  // Teste para verificar se o email é inválido
  it('deve retornar 400 se o email for inválido', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'invalid-email', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email inválido.');
  });

  // Teste para verificar se o usuário não existe
  it('deve retornar 401 se o usuário não existir', async () => {
    usersModel.getUserByEmail.mockReturnValue(null);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('E-mail ou senha incorretos!');
  });

  // Teste para verificar se a senha está incorreta
  it('deve retornar 401 se a senha estiver incorreta', async () => {
    usersModel.getUserByEmail.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('E-mail ou senha incorretos!');
  });

  // Teste para verificar se o login é bem-sucedido com dados válidos
  it('deve retornar 200 e um token se os dados forem válidos', async () => {
    usersModel.getUserByEmail.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      password: '123456'
    });
    jwt.sign.mockReturnValue('fake-jwt-token');

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      email: 'test@example.com',
      password: undefined
    });
  });
});