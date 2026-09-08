import React, { useMemo, useState } from 'react';
import { Search, Star, Store, Globe2, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { BusinessType, Estabelecimento } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { BusinessCard, CtaBanner } from '../components/ui/Cards';
import { getEstabelecimentos } from '../lib/db';

type Secao = 'todos' | BusinessType;
type Ordenacao = 'destaque' | 'melhores' | 'az';

const secoes: { id: Secao; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'comer', rotulo: 'Pra Comer' },
  { id: 'dormir', rotulo: 'Onde Dormir' },
  { id: 'fazer', rotulo: 'O que Fazer' },
  { id: 'guia', rotulo: 'Comércio & Serviços' },
];

export const GuiaComercioPage: React.FC = () => {
  const [secao, setSecao] = useState<Secao>('todos');
  const [categoria, setCategoria] = useState('todas');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('destaque');

  const todos = getEstabelecimentos();

  const categoriasDaSecao = useMemo(() => {
    const base = secao === 'todos' ? todos : todos.filter((e) => e.tipo === secao);
    return ['todas', ...Array.from(new Set(base.map((e) => e.categoria).filter(Boolean)))];
  }, [todos, secao]);

  const totalAvaliacoes = todos.reduce((acc, e) => acc + (e.rating?.total ?? 0), 0);
  const totalCategorias = new Set(todos.map((e) => e.categoria).filter(Boolean)).size;
  const totalDestaques = todos.filter((e) => e.destaque).length;

  const filtrados = useMemo(() => {
    let list = secao === 'todos' ? todos : todos.filter((e) => e.tipo === secao);
    if (categoria !== 'todas') list = list.filter((e) => e.categoria === categoria);
    const termo = busca.trim().toLowerCase();
    if (termo) {
      list = list.filter(
        (e) =>
          e.nome.toLowerCase().includes(termo) ||
          e.descricao.toLowerCase().includes(termo) ||
          e.tags.some((t) => t.toLowerCase().includes(termo)) ||
          e.categoria.toLowerCase().includes(termo)
      );
    }
    const media = (e: Estabelecimento) => e.rating?.media ?? 0;
    if (ordenacao === 'melhores') list = [...list].sort((a, b) => media(b) - media(a) || b.nome.localeCompare(a.nome));
    if (ordenacao === 'az') list = [...list].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    if (ordenacao === 'destaque') {
      list = [...list].sort((a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)) || media(b) - media(a));
    }
    return list;
  }, [todos, secao, categoria, busca, ordenacao]);

  const destaques = filtrados.filter((e) => e.destaque).slice(0, 2);
  const restantes = filtrados.filter((e) => !destaques.includes(e));

  return (
    <>
      <PageHero
        crumb="/"
        kicker="Guia completo"
        title="Guia de Comércio e Serviços de Guararema"
        description="Um diretório completo e profissional da Cidade Natureza: gastronomia, hospedagem, experiências e os negócios que a cidade aprova."
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
        meta="Diretório colaborativo atualizado pela comunidade"
      />

      <section className="relative -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-3xl border border-olive/10 shadow-xl shadow-olive/10 p-6 lg:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Store, valor: String(todos.length), rotulo: 'Negócios cadastrados' },
              { icon: Globe2, valor: String(totalCategorias), rotulo: 'Categorias diferentes' },
              { icon: Star, valor: String(totalAvaliacoes), rotulo: 'Avaliações da comunidade' },
              { icon: Sparkles, valor: String(totalDestaques), rotulo: 'Em destaque' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.rotulo} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-olive to-umber text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-olive-deep leading-none">{s.valor}</p>
                    <p className="text-[11px] text-muted mt-1">{s.rotulo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {secoes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSecao(s.id);
                    setCategoria('todas');
                  }}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    secao === s.id
                      ? 'bg-olive text-white shadow-lg shadow-olive/25'
                      : 'bg-surface border border-olive/15 text-olive-deep hover:bg-olive-soft'
                  }`}
                >
                  {s.rotulo}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {categoriasDaSecao.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    categoria === c
                      ? 'bg-umber text-white'
                      : 'bg-umber-soft text-umber-deep hover:bg-umber/15'
                  }`}
                >
                  {c === 'todas' ? 'Todas as categorias' : c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Busque por nome, categoria, tag ou serviço..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
                  className="appearance-none w-full sm:w-56 pl-10 pr-4 py-3 rounded-2xl bg-surface border border-olive/15 text-sm font-semibold text-olive-deep focus:outline-none focus:border-umber transition-colors cursor-pointer"
                >
                  <option value="destaque">Mais relevantes</option>
                  <option value="melhores">Melhor avaliados</option>
                  <option value="az">Ordem alfabética</option>
                </select>
              </div>
            </div>
          </div>

          {filtrados.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-3xl border border-olive/10">
              <p className="text-olive-deep font-semibold">Nenhum negócio encontrado com esses filtros.</p>
              <p className="text-sm text-muted mt-1">Tente remover a busca ou escolher outra categoria.</p>
            </div>
          ) : (
            <>
              {destaques.length > 0 ? (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-umber-soft text-umber-deep text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" /> Destaques da comunidade
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {destaques.map((e) => (
                      <BusinessCard key={e.id} empresa={e} destaque />
                    ))}
                  </div>
                </div>
              ) : null}

              {restantes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restantes.map((e) => (
                    <BusinessCard key={e.id} empresa={e} />
                  ))}
                </div>
              ) : null}
            </>
          )}

          <p className="mt-8 text-xs text-muted">
            Relação atualizada pela comunidade Rota Guararema. Encontrou algo errado ou quer incluir seu negócio? Fale com a gente pelo contato.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Seu negócio merece ser encontrado"
        description="Cadastre sua empresa no guia da Cidade Natureza com fotos, avaliações da comunidade e canais de contato direto."
        textButton="Quero aparecer no guia"
        to="/contato"
      />
    </>
  );
};