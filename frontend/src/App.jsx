import { useEffect, useState } from 'react';
import AuthCard from './AuthCard.jsx';

function obterTemaInicial() {
  const salvo = localStorage.getItem('tema');
  if (salvo === 'dark' || salvo === 'light') return salvo;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [tema, setTema] = useState(obterTemaInicial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
  }, [tema]);

  function alternarTema() {
    setTema((atual) => (atual === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="palco">
      <button
        type="button"
        className="botao-tema"
        onClick={alternarTema}
        aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      >
        {tema === 'dark' ? '☀️' : '🌙'}
      </button>
      <AuthCard />
    </div>
  );
}
