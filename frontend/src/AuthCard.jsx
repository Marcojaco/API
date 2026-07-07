import { useState } from 'react';
import { login, registrar } from './api.js';

const CAMPOS_LOGIN_INICIAL = { email: '', senha: '' };
const CAMPOS_REGISTRO_INICIAL = { nome: '', email: '', senha: '', confirmarSenha: '' };

export default function AuthCard() {
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [camposLogin, setCamposLogin] = useState(CAMPOS_LOGIN_INICIAL);
  const [camposRegistro, setCamposRegistro] = useState(CAMPOS_REGISTRO_INICIAL);

  const girado = modo === 'registro';

  function irParaRegistro() {
    setErro('');
    setSucesso('');
    setModo('registro');
  }

  function irParaLogin(emailPreenchido = '') {
    setErro('');
    if (emailPreenchido) {
      setCamposLogin((c) => ({ ...c, email: emailPreenchido }));
    }
    setModo('login');
  }

  async function aoSubmeterLogin(evento) {
    evento.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const { usuario } = await login(camposLogin);
      setSucesso(`Bem-vindo(a) de volta, ${usuario.nome.split(' ')[0]}.`);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function aoSubmeterRegistro(evento) {
    evento.preventDefault();
    setErro('');

    if (camposRegistro.senha !== camposRegistro.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      await registrar({
        nome: camposRegistro.nome,
        email: camposRegistro.email,
        senha: camposRegistro.senha,
      });
      setSucesso('Conta criada. Agora é só entrar.');
      const emailCriado = camposRegistro.email;
      setCamposRegistro(CAMPOS_REGISTRO_INICIAL);
      setTimeout(() => irParaLogin(emailCriado), 900);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="cena">
      <div className={`carteira ${girado ? 'girada' : ''}`}>
        <section
          className="face face-login"
          aria-hidden={girado}
          style={{ pointerEvents: girado ? 'none' : 'auto' }}
        >
          <header className="face-cabecalho">
            <p className="rotulo">Acesso à conta</p>
            <h1>Bem-vindo de volta</h1>
            <p className="subtitulo">Entra com o seu e-mail e senha.</p>
          </header>

          <form className="formulario" onSubmit={aoSubmeterLogin} tabIndex={girado ? -1 : 0}>
            <label className="campo">
              <span>E-mail</span>
              <input
                type="email"
                required
                autoComplete="email"
                tabIndex={girado ? -1 : 0}
                value={camposLogin.email}
                onChange={(e) => setCamposLogin((c) => ({ ...c, email: e.target.value }))}
                placeholder="voce@exemplo.com"
              />
            </label>

            <label className="campo">
              <span>Senha</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                tabIndex={girado ? -1 : 0}
                value={camposLogin.senha}
                onChange={(e) => setCamposLogin((c) => ({ ...c, senha: e.target.value }))}
                placeholder="••••••••"
              />
            </label>

            {!girado && erro && <p className="mensagem mensagem-erro">{erro}</p>}
            {!girado && sucesso && <p className="mensagem mensagem-sucesso">{sucesso}</p>}

            <button type="submit" className="botao-principal" disabled={carregando}>
              {carregando ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <p className="rodape-face">
            Não tem conta?{' '}
            <button type="button" className="link" onClick={irParaRegistro} tabIndex={girado ? -1 : 0}>
              Criar conta
            </button>
          </p>
        </section>

        <section
          className="face face-registro"
          aria-hidden={!girado}
          style={{ pointerEvents: girado ? 'auto' : 'none' }}
        >
          <header className="face-cabecalho">
            <p className="rotulo">Nova conta</p>
            <h1>Criar sua conta</h1>
            <p className="subtitulo">Leva menos de um minuto.</p>
          </header>

          <form className="formulario" onSubmit={aoSubmeterRegistro} tabIndex={!girado ? -1 : 0}>
            <label className="campo">
              <span>Nome</span>
              <input
                type="text"
                required
                autoComplete="name"
                tabIndex={!girado ? -1 : 0}
                value={camposRegistro.nome}
                onChange={(e) => setCamposRegistro((c) => ({ ...c, nome: e.target.value }))}
                placeholder="Seu nome completo"
              />
            </label>

            <label className="campo">
              <span>E-mail</span>
              <input
                type="email"
                required
                autoComplete="email"
                tabIndex={!girado ? -1 : 0}
                value={camposRegistro.email}
                onChange={(e) => setCamposRegistro((c) => ({ ...c, email: e.target.value }))}
                placeholder="voce@exemplo.com"
              />
            </label>

            <label className="campo">
              <span>Senha</span>
              <input
                type="password"
                required
                autoComplete="new-password"
                tabIndex={!girado ? -1 : 0}
                value={camposRegistro.senha}
                onChange={(e) => setCamposRegistro((c) => ({ ...c, senha: e.target.value }))}
                placeholder="Mínimo 6 caracteres"
              />
            </label>

            <label className="campo">
              <span>Confirmar senha</span>
              <input
                type="password"
                required
                autoComplete="new-password"
                tabIndex={!girado ? -1 : 0}
                value={camposRegistro.confirmarSenha}
                onChange={(e) => setCamposRegistro((c) => ({ ...c, confirmarSenha: e.target.value }))}
                placeholder="Repita a senha"
              />
            </label>

            {girado && erro && <p className="mensagem mensagem-erro">{erro}</p>}
            {girado && sucesso && <p className="mensagem mensagem-sucesso">{sucesso}</p>}

            <button type="submit" className="botao-principal" disabled={carregando}>
              {carregando ? 'Criando…' : 'Criar conta'}
            </button>
          </form>

          <p className="rodape-face">
            Já possui conta?{' '}
            <button type="button" className="link" onClick={() => irParaLogin()} tabIndex={!girado ? -1 : 0}>
              Entrar
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}
