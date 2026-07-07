/**
 * Camada Middleware.
 * Valida campos obrigatorios antes de a requisicao chegar ao Controller.
 * Nao contem regra de negocio nem acesso a dados.
 */

function validarCamposRegistro(req, res, next) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios' });
  }

  next();
}

function validarCamposLogin(req, res, next) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha sao obrigatorios' });
  }

  next();
}

module.exports = {
  validarCamposRegistro,
  validarCamposLogin,
};
