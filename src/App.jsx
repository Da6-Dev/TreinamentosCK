import React, { useState, useEffect } from 'react';

// --- Ícones em SVG que usaremos na interface ---
const PlayIcon = () => (
  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
);

// --- Dados dos vídeos ---
const videoData = {
  'Sistema CK': [
    { title: 'Home - 01', url: 'https://www.youtube.com/watch?v=UR7kyz4Xzdg' },
    { title: 'Parametrização - 02', url: 'https://www.youtube.com/watch?v=UDLi1E-PpAA' },
    { title: 'Cadastrar usuários - 03', url: 'https://www.youtube.com/watch?v=hxnrAl3gk28' },
    { title: 'Matrículas aula experimental - 04', url: 'https://www.youtube.com/watch?v=yaaYHGDcZrM' },
    { title: 'Matrículas aulas realizadas - 05', url: 'https://www.youtube.com/watch?v=-u2T2Lolqn8' },
    { title: 'Agenda - 06', url: 'https://www.youtube.com/watch?v=P3PCX1UDi4M' },
    { title: 'Continuação matrícula + Contrato - 07', url: 'https://www.youtube.com/watch?v=hq8Jm5OR0Uo' },
    { title: 'Relatórios - 08', url: 'https://www.youtube.com/watch?v=o4B_u8AURxc' },
    { title: 'Financeiro - 09', url: 'https://www.youtube.com/watch?v=Yiu31jsnivw' },
    { title: 'Plus do sistema - 10', url: 'https://www.youtube.com/watch?v=T1x3aJgCtOI' }
  ],
  'Comercial': [
    { title: 'Performance de vendas I - 01', url: 'https://www.youtube.com/watch?v=6eZOFelQzco' },
    { title: 'Performance de vendas II - 02', url: 'https://www.youtube.com/watch?v=eO-_oZuOK8M' },
    { title: 'Ação para fechamento de matrículas - 06', url: 'https://drive.google.com/file/d/12qLOfc4vHiXdjcIS809VRmPFhSRAkppL/view' },
    { title: 'Abordagem - 11', url: 'https://www.youtube.com/watch?v=BMYBUPtiuMk' },
    { title: 'Análise - 12', url: 'https://www.youtube.com/watch?v=zP5SoROmwWc' },
    { title: 'Divulgação - 13', url: 'https://www.youtube.com/watch?v=67EFbA8Ptk0' },
    { title: 'Fechamento - 14', url: 'https://www.youtube.com/watch?v=CTEBYYL1FmU' }
  ],
  'Plataforma Evolua': [
    { title: 'Bem-vindo a nosso Onboarding - 01', url: 'https://interativo.octadesk.com/kb/article/introducao' },
    { title: 'Adicionar matrícula - 02', url: 'https://interativo.octadesk.com/kb/article/adicionar-matricula' },
    { title: 'Edição de matrícula - 03', url: 'https://interativo.octadesk.com/kb/article/edicao-de-matricula' },
    { title: 'Painel de engajamento - 04', url: 'https://interativo.octadesk.com/kb/article/engajamentopainel' },
    { title: 'Resetar senha - 05', url: 'https://interativo.octadesk.com/kb/article/resetar-senha' },
  ],
};

const categories = Object.keys(videoData);

function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [watchedVideos, setWatchedVideos] = useState(new Set());

  // Efeito para carregar os vídeos assistidos do localStorage quando o app iniciar
  useEffect(() => {
    const savedWatched = localStorage.getItem('watchedVideos');
    if (savedWatched) {
      setWatchedVideos(new Set(JSON.parse(savedWatched)));
    }
  }, []);

  // Efeito para salvar os vídeos no localStorage sempre que a lista de assistidos mudar
  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify([...watchedVideos]));
  }, [watchedVideos]);

  const handleVideoClick = (url) => {
    // Adiciona a URL à lista de assistidos
    setWatchedVideos(prevWatched => new Set(prevWatched).add(url));
    // Abre o link em uma nova aba
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* --- Barra Lateral (Sidebar) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#ffc700] mb-10">Código Kid</h1>
        <nav>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-[#ffc700] text-slate-900 shadow-md'
                      : 'text-slate-600 hover:bg-yellow-50'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* --- Conteúdo Principal --- */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h2 className="text-4xl font-bold text-slate-800">{activeCategory}</h2>
          <p className="text-slate-500 mt-1">Selecione um vídeo para começar seu treinamento.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoData[activeCategory].map((video) => {
            const isWatched = watchedVideos.has(video.url);
            return (
              <div
                key={video.url}
                onClick={() => handleVideoClick(video.url)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="p-6 flex items-center justify-between">
                  <span className={`font-semibold ${isWatched ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {video.title}
                  </span>
                  {isWatched ? <CheckCircleIcon /> : <PlayIcon />}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;