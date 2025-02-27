const express = require('express');
const authController = require('../controllers/auth-controller');
const authRouter = express.Router();
const { ensureAuth } = require('../middlewares/auth-middleware');


authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get("/teste", ensureAuth, (req,res) => res.json({message:"teste ok"}));

module.exports = authRouter;
