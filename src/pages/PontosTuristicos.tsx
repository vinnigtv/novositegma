import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { AtracaoCard } from '../components/ui/Cards';
import { CtaBanner } from '../components/ui/Cards';
import { getAtracoes } from '../lib/db';
import { categoriaLabels } from '../data/pontosTuristicos';
import type { AttractionCategory } from '../types';

type Filtro = 'todos' | AttractionCategory;

export const PontosTuristicosPage: React.FC = () => {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [busca, setBusca] = useState('');

  const atracoes = getAtracoes();

  const categorias: { id: Filtro; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'natureza', label: 'Natureza' },
    { id: 'historia', label: 'História' },
    { id: 'cultura', label: 'Cultura' },
    { id: 'gastronomia', label: 'Gastronomia' },
  ];

  const filtradas = atracoes.filter((a) => {
    const porCategoria = filtro === 'todos' || a.categoria === filtro;
    const termo = busca.trim().toLowerCase();
    const porBusca =
      termo === '' ||
      a.titulo.toLowerCase().includes(termo) ||
      a.local.toLowerCase().includes(termo) ||
      a.tags.some((t) => t.toLowerCase().includes(termo));
    return porCategoria && porBusca;
  });

  return (
    <>
      <PageHero
        crumb="/"
        kicker="Pontos turísticos"
        title="14 paradas para se apaixonar por Guararema"
        description="Da Pedra Montada ao Pontilhão, passando pelas igrejas históricas e pela Vila de Luís Carlos — escolha por onde começar."
        image="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=80"
        meta={`${atracoes.length} pontos turísticos catalogados`}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {categorias.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFiltro(c.id)}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    filtro === c.id
                      ? 'bg-olive text-white shadow-lg shadow-olive/25'
                      : 'bg-surface border border-olive/15 text-olive-deep hover:bg-olive-soft'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome, local ou tag..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
              />
            </div>
          </div>

          {filtradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtradas.map((a) => (
                <AtracaoCard key={a.slug} atracao={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-3xl border border-olive/10">
              <p className="text-olive-deep font-semibold">Nenhum ponto encontrado com esses filtros.</p>
              <p className="text-sm text-muted mt-1">Tente trocar a busca ou selecionar outra categoria.</p>
            </div>
          )}

          <p className="mt-8 text-xs text-muted">
            Legenda: {Object.entries(categoriaLabels).map(([, v]) => v).join(' · ')} · categorias orientativas
          </p>
        </div>
      </section>

      <CtaBanner
        title="Falta um ponto na lista?"
        description="Conhece um lugar que merece entrar no guia? Mande sua indicação para a equipe do Guia Guararema."
        textButton="Indicar um local"
        to="/contato"
      />
    </>
  );
};