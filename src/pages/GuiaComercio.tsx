import React, { useMemo, useState } from 'react';
import { Search, Star, Store, Globe2, SlidersHorizontal, Sparkles, BadgeCheck, ArrowRight } from 'lucide-react';
import type { BusinessType, Estabelecimento } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { BusinessCard, CtaBanner, LinhaNegocioSimples } from '../components/ui/Cards';
import { getEstabelecimentos } from '../lib/db';
import { Link } from '../lib/router';

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
  const aprovados = todos.filter((e) => e.status !== 'pendente');

  const categoriasDaSecao = useMemo(() => {
    const base = secao === 'todos' ? aprovados : aprovados.filter((e) => e.tipo === secao);
    return ['todas', ...Array.from(new Set(base.map((e) => e.categoria).filter(Boolean)))];
  }, [aprovados, secao]);

  const totalAvaliacoes = aprovados.reduce((acc, e) => acc + (e.rating?.total ?? 0), 0);
  const totalCategorias = new Set(aprovados.map((e) => e.categoria).filter(Boolean)).size;
  const totalDestaques = aprovados.filter((e) => e.destaque).length;

  const filtrados = useMemo(() => {
    let list = secao === 'todos' ? aprovados : aprovados.filter((e) => e.tipo === secao);
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
    const pagos = list.filter((e) => (e.plano ?? 'pago') === 'pago');
    const gratuitos = list.filter((e) => (e.plano ?? 'gratuito') === 'gratuito').sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return [...pagos, ...gratuitos];
  }, [aprovados, secao, categoria, busca, ordenacao]);

  const destaques = filtrados.filter((e) => e.destaque && (e.plano ?? 'pago') === 'pago').slice(0, 2);
  const restantes = filtrados.filter((e) => !destaques.includes(e) && (e.plano ?? 'pago') === 'pago');
  const gratuitos = filtrados.filter((e) => (e.plano ?? 'gratuito') === 'gratuito');

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

      {/* Destaque: cadastre sua empresa */}
      <section className="pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-umber via-umber to-umber-deep px-6 py-8 sm:px-10 sm:py-9 shadow-xl shadow-umber/15">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-umber-deep/50 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-6 left-10 w-2 h-2 rounded-full bg-white/40" />
            <div className="absolute bottom-8 right-14 w-3 h-3 rounded-full bg-white/30" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Sua empresa aqui? Cadastre grátis.</h3>
                <p className="text-sm text-white/80 mt-1.5 max-w-xl">
                  Entre na listagem simples do Guararema.net em poucos minutos — sem cartão, sem compromisso.
                </p>
              </div>
              <Link
                to="/cadastro"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-umber-deep font-semibold px-7 py-3.5 text-sm shadow-lg hover:bg-umber-soft transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
              >
                Cadastrar agora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
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

              {gratuitos.length > 0 ? (
                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-olive-soft text-olive-deep text-xs font-bold">
                      <BadgeCheck className="w-3.5 h-3.5" /> Listagem simples
                    </span>
                    <span className="text-xs text-muted">{gratuitos.length} negócios</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gratuitos.map((e) => (
                      <LinhaNegocioSimples key={e.id} empresa={e} />
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}

          <p className="mt-8 text-xs text-muted">
            Relação atualizada pela comunidade Guararema.net. Encontrou algo errado ou quer incluir seu negócio? Fale com a gente pelo contato.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Seu negócio merece ser encontrado"
        description="Cadastre sua empresa grátis no guia da Cidade Natureza. Nome, endereço e contatos aparecem na listagem simples; o card completo com fotos é opcional."
        textButton="Cadastre sua empresa"
        to="/cadastro"
      />
    </>
  );
};