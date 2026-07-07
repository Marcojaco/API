const pool = require('../config/database');

/**
 * Camada Model.
 * Responsavel exclusivamente por consultas SQL (SELECT/INSERT).
 * Nao contem regra de negocio.
 */

async function buscarTodosUsuarios() {
  const [linhas] = await pool
    .promise()
    .query('SELECT id, nome, email, created_at FROM usuarios');
  return linhas;
}

async function buscarUsuariosPorEmail(email) {
  try {
    const [linhas] = await pool
      .promise()
      .query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return linhas[0];
  }catch (erro) {
    console.error("Erro ao buscar usuário por e-mail:", erro);
    throw erro;
  }
}

async function criar(dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;
  const [resultado] = await pool
    .promise()
    .query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
  return resultado.insertId;
}

module.exports = {
  buscarTodosUsuarios,
  buscarUsuariosPorEmail,
  criar,
};
