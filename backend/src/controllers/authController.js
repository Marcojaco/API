const authService = require('../services/authService');

/**
 * Camada Controller.
 * Recebe a requisicao, chama o Service e devolve a resposta HTTP.
 * Nao contem SQL nem regra de negocio.
 */

async function listarUsuarios(req, res) {
  try {
    const usuarios = await authService.listarUsuarios();
    return res.status(200).json(usuarios);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao listar usuarios' });
  }
}

async function registrarUsuario(req, res) {
  try {
    const usuario = await authService.registrarUsuario(req.body);
    return res.status(201).json(usuario);
  } catch (erro) {
    const status = erro.status || 500;
    return res.status(status).json({ erro: erro.message || 'Erro ao registrar usuario' });
  }
}

async function loginUsuario(req, res) {
  try {
    const usuario = await authService.loginUsuario(req.body);
    return res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario });
  } catch (erro) {
    const status = erro.status || 500;
    return res.status(status).json({ erro: erro.message || 'Erro ao realizar login' });
  }
}

module.exports = {
  listarUsuarios,
  registrarUsuario,
  loginUsuario,
};
