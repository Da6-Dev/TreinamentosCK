import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useParams, Navigate } from 'react-router-dom';

// --- Ícones em SVG que usaremos na interface ---
const PlayIcon = () => (
  <svg className="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
    { title: 'Como ter um vendedor de sucesso na minha equipe - 03', url: 'https://www.youtube.com/watch?v=kc7vEfR9H3g' },
    { title: 'Como conseguir leads - 04', url: 'https://www.youtube.com/watch?v=rC8f-UPROGk' },
    { title: 'Rematrículas - 05', url: 'https://www.youtube.com/watch?v=ZY5qnT8ZapU' },
    { title: 'Ação para fechamento de matrículas - 06', url: 'https://drive.google.com/file/d/12qLOfc4vHiXdjcIS809VRmPFhSRAkppL/view' },
    { title: 'Ação para unidades em implantação - 07', url: 'https://drive.google.com/file/d/1T2ukdvZOlT-oBfGcjX0xYgz_d-3T0L3y/view' },
    { title: 'Ação comercial - 08', url: 'https://drive.google.com/file/d/1CDLsb3qUhHRZ3nK6-1O6P5GHOU2yeADL/view' },
    { title: 'Ação em parceria com empresa - 09', url: 'https://drive.google.com/file/d/1pujN2bSDatc5djdwgDWP-evZTdErahQx/view' },
    { title: 'Ação em parceria com escolas - 10', url: 'https://drive.google.com/file/d/1d7rPwmw8KivbomVCzXBfC2a3q9Al0mck/view' },
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
    { title: 'Inativação de matícula - 06', url: 'https://interativo.octadesk.com/kb/article/inativacao-de-matricula' },
    { title: 'Módulos e Trilhas - 07', url: 'https://interativo.octadesk.com/kb/article/modulos-e-trilhas' },
    { title: 'Central de recursos - 08', url: 'https://interativo.octadesk.com/kb/article/central-de-recursos' },
    { title: 'Organograma e Relatórios - 09', url: 'https://interativo.octadesk.com/kb/article/organograma-e-relatorios-organograma' },
    { title: 'Usuários e Permissões - 10', url: 'https://interativo.octadesk.com/kb/article/usuarios-e-permissoes' },
    { title: 'Cadastro - Acesso professor aluno - 11', url: 'https://interativo.octadesk.com/kb/article/cadastro-acesso-professor-aluno' },
    { title: 'Pedagógico - Relatórios - 12', url: 'https://interativo.octadesk.com/kb/article/pedagogico-relatorios' },
    { title: 'Conheça o Enterbrowser - 13', url: 'https://interativo.octadesk.com/kb/article/conheca-o-enterbrowser' },
    { title: 'Suporte técnico - 14', url: 'https://interativo.octadesk.com/kb/article/suporte-tecnico' },
    { title: 'Conheça a Loja Virtual - 15', url: 'https://interativo.octadesk.com/kb/article/conheca-a-loja-virtual' },
    { title: 'Financeiro - 16', url: 'https://interativo.octadesk.com/kb/article/financeiro' },
    { title: 'Status e Integração - 17', url: 'https://interativo.octadesk.com/kb/article/status-e-integracao' },
    { title: 'Orientações - Mensagens de Alerta - 18', url: 'https://interativo.octadesk.com/kb/article/orientacoes-mensagens-de-alerta' },
    { title: 'Portal de Aula e App Mobile - 19', url: 'https://interativo.octadesk.com/kb/article/portal-de-aula-e-app-mobile' },
    { title: 'Conheça o Onask - 20', url: 'https://interativo.octadesk.com/kb/article/conheca-o-onask' },
  ],
};
const categories = Object.keys(videoData);
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');


// COMPONENTE PARA A PÁGINA DE UMA CATEGORIA
function CategoryPage({ watchedVideos, handleVideoClick }) {
  const { categorySlug } = useParams();
  const categoryName = categories.find(cat => slugify(cat) === categorySlug);

  if (!categoryName) {
    return <div className="p-6 md:p-10 text-xl text-center">Categoria não encontrada.</div>;
  }

  const videos = videoData[categoryName];

  return (
    <div className="flex-1 p-6 md:p-10">
      <header className="mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{categoryName}</h2>
        <p className="text-slate-500 mt-1">Selecione um vídeo para começar seu treinamento.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const isWatched = watchedVideos.has(video.url);
          return (
            <div
              key={video.url}
              onClick={() => handleVideoClick(video.url)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="p-5 flex items-center justify-between gap-4">
                <span className={`font-semibold text-left ${isWatched ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {video.title}
                </span>
                {isWatched ? <CheckCircleIcon /> : <PlayIcon />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// COMPONENTE SIDEBAR (REUTILIZÁVEL)
function Sidebar({ onLinkClick }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold text-[#ffc700]">Código Kid</h1>
        {/* O botão de fechar será renderizado pelo App component para controlar o estado */}
      </div>
      <nav>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <NavLink
                to={`/${slugify(category)}`}
                onClick={onLinkClick} // Fecha o menu ao clicar em um link no modo mobile
                className={({ isActive }) => `w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center ${isActive
                    ? 'bg-[#ffc700] text-slate-900 shadow-md'
                    : 'text-slate-600 hover:bg-yellow-50'
                  }`}
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}


// COMPONENTE PRINCIPAL DA APLICAÇÃO
function App() {
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedWatched = localStorage.getItem('watchedVideos');
    if (savedWatched) {
      setWatchedVideos(new Set(JSON.parse(savedWatched)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify([...watchedVideos]));
  }, [watchedVideos]);

  const handleVideoClick = (url) => {
    setWatchedVideos(prevWatched => {
      const newWatched = new Set(prevWatched);
      newWatched.add(url);
      return newWatched;
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Função para fechar a sidebar, útil para o overlay e links
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <div className="flex">
        {/* --- Overlay para fechar o menu no mobile --- */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* --- Barra Lateral (Sidebar) com lógica de responsividade --- */}
        <div className={`fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
          <Sidebar onLinkClick={closeSidebar} />
        </div>

        {/* --- Área de Conteúdo Principal --- */}
        <div className="flex flex-col flex-1 w-full">
          {/* --- Cabeçalho para Mobile --- */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-[#ffc700]">Código Kid</h1>
            <button onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </button>
          </header>

          {/* --- Roteamento e renderização da página da categoria --- */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to={`/${slugify(categories[0])}`} replace />} />
              <Route
                path="/:categorySlug"
                element={<CategoryPage watchedVideos={watchedVideos} handleVideoClick={handleVideoClick} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;