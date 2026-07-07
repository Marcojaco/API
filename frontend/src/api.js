const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function tratarResposta(resposta) {
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    const mensagem = dados.erro || 'Algo deu errado. Tenta de novo.';
    throw new Error(mensagem);
  }

  return dados;
}

export async function login({ email, senha }) {
  const resposta = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  return tratarResposta(resposta);
}

export async function registrar({ nome, email, senha }) {
  const resposta = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });

  return tratarResposta(resposta);
}
