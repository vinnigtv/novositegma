import React, { useState } from 'react';
import { MapPin, Store, CalendarDays, Images, LogOut, ExternalLink, RotateCcw, Layout } from 'lucide-react';
import { logout } from '../../lib/auth';
import { resetData } from '../../lib/db';
import { Link } from '../../lib/router';
import { AtracoesManager } from './AtracoesManager';
import { EstabelecimentosManager } from './EstabelecimentosManager';
import { EventosManager } from './EventosManager';
import { CidadeManager } from './CidadeManager';
import { HeroManager } from './HeroManager';

type Secao = 'atracoes' | 'estabelecimentos' | 'cidade' | 'hero' | 'eventos';

const menus: { id: Secao; rotulo: string; icone: React.ReactNode }[] = [
  { id: 'atracoes', rotulo: 'Pontos turísticos', icone: <MapPin className="w-4 h-4" /> },
  { id: 'estabelecimentos', rotulo: 'Pra Comer · Onde Dormir · O que Fazer · Guia', icone: <Store className="w-4 h-4" /> },
  { id: 'hero', rotulo: 'Abertura · Fotos da Home', icone: <Layout className="w-4 h-4" /> },
  { id: 'cidade', rotulo: 'A Cidade · Carrossel', icone: <Images className="w-4 h-4" /> },
  { id: 'eventos', rotulo: 'Eventos', icone: <CalendarDays className="w-4 h-4" /> },
];

export const AdminDashboard: React.FC = () => {
  const [secao, setSecao] = useState<Secao>('atracoes');

  const restaurar = () => {
    if (!window.confirm('Restaurar todos os dados originais do site? Isso apaga as edições feitas neste navegador.')) return;
    resetData();
    window.location.reload();
  };

  const sair = () => {
    logout();
    window.location.hash = '#/';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-mist">
      <header className="bg-olive-deep text-white sticky top-0 z-30 shadow-lg shadow-olive-deep/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10">
              <MapPin className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="font-extrabold leading-tight truncate">Painel do Guararema.net</p>
              <p className="text-[11px] text-white/60 leading-tight">Conteúdo e atrativos do site</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Ver site
            </Link>
            <button
              onClick={restaurar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restaurar padrão
            </button>
            <button
              onClick={sair}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-umber hover:bg-umber-deep transition whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:items-start">
          <nav className="flex lg:flex-col gap-2 lg:sticky lg:top-24 overflow-x-auto pb-1">
            {menus.map((m) => (
              <button
                key={m.id}
                onClick={() => setSecao(m.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  secao === m.id
                    ? 'bg-olive text-white shadow-lg shadow-olive/25'
                    : 'bg-surface border border-olive/10 text-olive-deep hover:bg-olive-soft'
                }`}
              >
                {m.icone}
                {m.rotulo}
              </button>
            ))}
          </nav>

          <main>
            {secao === 'atracoes' ? <AtracoesManager /> : null}
            {secao === 'estabelecimentos' ? <EstabelecimentosManager /> : null}
            {secao === 'hero' ? <HeroManager /> : null}
            {secao === 'cidade' ? <CidadeManager /> : null}
            {secao === 'eventos' ? <EventosManager /> : null}

            <p className="mt-6 text-[11px] leading-relaxed text-muted px-1">
              As edições ficam salvas neste navegador (armazenamento local) e aparecem no site
              imediatamente. Para publicar para todos os visitantes, o conteúdo precisa ser
              atualizado na versão hospedada do projeto.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};