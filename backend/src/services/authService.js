const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const SALT_ROUNDS = 10;

/**
 * Camada Service.
 * Concentra as regras de negocio (hash, comparacao de senha,
 * verificacao de duplicidade) para manter o Controller enxuto,
 * lidando apenas com HTTP.
 */

async function listarUsuarios() {
  return userModel.buscarTodosUsuarios();
}

async function registrarUsuario({ nome, email, senha }) {
  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  try {
    const id = await userModel.criar({ nome, email, senha: senhaHash });
    return { id, nome, email };
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      const erroDuplicado = new Error('E-mail ja cadastrado');
      erroDuplicado.status = 400;
      throw erroDuplicado;
    }
    throw erro;
  }
}

async function loginUsuario({ email, senha }) {
  const usuario = await userModel.buscarUsuariosPorEmail(email);

  if (!usuario) {
    const erro = new Error('Usuario ou senha invalidos');
    erro.status = 401;
    throw erro;
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senha);

  if (!senhaConfere) {
    const erro = new Error('Usuario ou senha invalidos');
    erro.status = 401;
    throw erro;
  }

  return { id: usuario.id, nome: usuario.nome, email: usuario.email };
}

module.exports = {
  listarUsuarios,
  registrarUsuario,
  loginUsuario,
};
