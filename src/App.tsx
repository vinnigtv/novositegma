import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { usePath } from './lib/hash';
import { HomePage } from './pages/Home';
import { ACidadePage } from './pages/ACidade';
import { PontosTuristicosPage } from './pages/PontosTuristicos';
import { AtracaoDetalhePage } from './pages/AtracaoDetalhe';
import { ListagemPage } from './pages/Listagem';
import { GuiaComercioPage } from './pages/GuiaComercio';
import { EstabelecimentoDetalhePage } from './pages/EstabelecimentoDetalhe';
import { EventosPage } from './pages/Eventos';
import { ContatoPage } from './pages/Contato';
import { CadastroPage } from './pages/Cadastro';
import { BlogPage } from './pages/Blog';
import { CidadeNatalPage } from './pages/CidadeNatal';
import { ComoChegarPage } from './pages/ComoChegar';
import { OProjetoPage } from './pages/OProjeto';
import { AdminPage } from './pages/Admin';

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
    case 'guia-de-comercios':
      return segments.length > 1 ? <EstabelecimentoDetalhePage id={segments[1]} /> : <GuiaComercioPage />;
    case 'guia-de-comercios-e-servicos':
      return <GuiaComercioPage />;
    case 'eventos':
      return <EventosPage />;
    case 'contato':
      return <ContatoPage />;
    case 'cadastro':
      return <CadastroPage />;
    case 'blog':
      return <BlogPage />;
    case 'cidade-natal':
      return <CidadeNatalPage />;
    case 'como-chegar':
      return <ComoChegarPage />;
    case 'o-projeto':
      return <OProjetoPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <NotFoundPage />;
  }
}

export function App() {
  const path = usePath();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [path]);

  const isAdmin = path.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen bg-mist text-ink">{renderPage(path)}</main>;
  }

  return (
    <div className="min-h-screen bg-mist text-ink flex flex-col">
      <Navbar />
      <main className="flex-1">{renderPage(path)}</main>
      <Footer />
    </div>
  );
}

export default App;