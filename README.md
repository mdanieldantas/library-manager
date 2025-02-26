# 📚 Library Manager

## Descrição
O **Library Manager** é um projeto prático de estudos em **Backend** que tem como objetivo gerenciar usuários e autenticação em uma aplicação web. O projeto foi desenvolvido para aprimorar habilidades em Node.js, Express, autenticação com JWT (JSON Web Tokens), e testes automatizados com Jest e Supertest. Ele serve como uma base para entender conceitos como rotas, middlewares, models, e integração de bibliotecas externas.

---

## 🔗 Link Online
O projeto está disponível no repositório do GitHub:  
[**https://github.com/mdanieldantas/library-manager.git**](https://github.com/mdanieldantas/library-manager.git)

---

## 🖼️ Imagens do Projeto
![Projeto](./src/assets/images/1image.png)
![Projeto](./src/assets/images/2image.png)
<!-- 🔲 **Placeholder para imagem da tela de login**  
🔲 **Placeholder para imagem da tela de registro**  
🔲 **Placeholder para imagem dos testes automatizados** -->

---

## 🚀 Funcionalidades
- **🔐 Autenticação de usuários**: Registro e login com JWT.
- **🔒 Proteção de rotas**: Middleware para garantir que apenas usuários autenticados possam acessar determinadas rotas.
- **🛠️ Gerenciamento de usuários**: Criação e consulta de usuários.
- **🧪 Testes automatizados**: Testes de integração e unitários com Jest e Supertest.
- **⚙️ Variáveis de ambiente**: Uso de `.env` para configurações sensíveis.

---

## 🛠️ Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **JWT (JSON Web Tokens)**: Autenticação segura.
- **Bcrypt**: Criptografia de senhas.
- **UUID**: Geração de IDs únicos.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Nodemon**: Reinicialização automática do servidor durante o desenvolvimento.
- **Jest**: Framework de testes.
- **Supertest**: Testes de integração para APIs.

---

## 🏃‍♂️ Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior).
- NPM ou Yarn para gerenciamento de dependências.

### Passos para execução
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/mdanieldantas/library-manager.git
   cd library-manager
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   PORT=3000
   JWT_KEY=a-very-secure-secret-key
   ```

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. **Execute os testes**:
   ```bash
   npm test
   ```

---

## 📂 Estrutura do Projeto
```
library-manager/
├── src/
│   ├── controllers/
│   │   └── auth-controller.js
│   ├── middlewares/
│   │   └── auth-middleware.js
│   ├── models/
│   │   └── users-model.js
│   ├── routes/
│   │   └── auth.js
│   └── index.js
├── tests/
│   └── auth.test.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 📚 Aprendizados
- **Autenticação com JWT**: Como implementar um sistema seguro de autenticação.
- **Middlewares**: Como criar e usar middlewares para proteger rotas.
- **Testes automatizados**: Como escrever testes de integração e unitários com Jest e Supertest.
- **Variáveis de ambiente**: Como gerenciar configurações sensíveis com `.env`.
- **Gerenciamento de dependências**: Como estruturar um projeto Node.js com Express.

---

## 🤝 Contribuições
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📜 Licença
Este projeto está licenciado sob a licença **ISC**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

**M Daniel Dantas**

- **GitHub:** [mdanieldantas](https://github.com/mdanieldantas)
- **LinkedIn:** [mdanieldantas](https://www.linkedin.com/in/mdanieldantas)
- **Portfólio:** [Portfólio de Daniel Dantas](https://danieldantasdev.vercel.app)
- **Email:** [contatomarcosdgomes@gmail.com](mailto:contatomarcosdgomes@gmail.com)
- **Currículo:** [Baixar Currículo](https://docs.google.com/document/d/1_FpPYPXiifH1B3BDWnJuNk05DQfddCOBqFxyT6Citg4/edit?usp=sharing)

