const express = require('express');
const authController = require('./controllers/auth-controller');
const router = express.Router();
const { ensureAuth } = require('./middlewares/auth-middleware');


router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get("/teste", ensureAuth, (req,res) => res.json({message:"teste ok"}));

module.exports = router;
