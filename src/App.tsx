import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { usePath } from './lib/hash';
import { HomePage } from './pages/Home';
import { ACidadePage } from './pages/ACidade';
import { PontosTuristicosPage } from './pages/PontosTuristicos';
import { AtracaoDetalhePage } from './pages/AtracaoDetalhe';
import { ListagemPage } from './pages/Listagem';
import { EventosPage } from './pages/Eventos';
import { ContatoPage } from './pages/Contato';
import { BlogPage } from './pages/Blog';
import { CidadeNatalPage } from './pages/CidadeNatal';
import { ComoChegarPage } from './pages/ComoChegar';
import { OProjetoPage } from './pages/OProjeto';

function NotFoundPage() {
  return (
    <section className="py-32 text-center px-4 bg-mist">
      <div className="max-w-xl mx-auto">
        <p className="text-6xl font-heading font-bold text-olive/20 mb-4">404</p>
        <h1 className="text-3xl font-bold text-olive-deep mb-2">Rota não encontrada</h1>
        <p className="text-sm text-muted mb-6">Essa página não existe por aqui. Que tal recomeçar do Centro?</p>
        <a href="#/" className="inline-flex items-center justify-center rounded-full bg-olive text-white font-semibold px-7 py-3 text-sm hover:bg-olive-deep transition-colors">
          Voltar ao início
        </a>
      </div>
    </section>
  );
}

function renderPage(path: string) {
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return <HomePage />;

  switch (segments[0]) {
    case 'a-cidade':
      return <ACidadePage />;
    case 'pontos-turisticos':
      return segments.length > 1 ? <AtracaoDetalhePage slug={segments[1]} /> : <PontosTuristicosPage />;
    case 'pra-comer':
      return <ListagemPage tipo="comer" />;
    case 'onde-dormir':
      return <ListagemPage tipo="dormir" />;
    case 'o-que-fazer':
      return <ListagemPage tipo="fazer" />;
    case 'guia-de-comercios-e-servicos':
      return <ListagemPage tipo="guia" />;
    case 'eventos':
      return <EventosPage />;
    case 'contato':
      return <ContatoPage />;
    case 'blog':
      return <BlogPage />;
    case 'cidade-natal':
      return <CidadeNatalPage />;
    case 'como-chegar':
      return <ComoChegarPage />;
    case 'o-projeto':
      return <OProjetoPage />;
    default:
      return <NotFoundPage />;
  }
}

export function App() {
  const path = usePath();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [path]);

  return (
    <div className="min-h-screen bg-mist text-ink flex flex-col">
      <Navbar />
      <main className="flex-1">{renderPage(path)}</main>
      <Footer />
    </div>
  );
}

export default App;