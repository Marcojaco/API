const express = require('express');
const authController = require('../controllers/authController');
const { validarCamposRegistro, validarCamposLogin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * Camada Route.
 * Apenas registra endpoints. Nenhuma logica de negocio aqui.
 */

router.get('/usuarios', authController.listarUsuarios);
router.post('/registro', validarCamposRegistro, authController.registrarUsuario);
router.post('/login', validarCamposLogin, authController.loginUsuario);

module.exports = router;
