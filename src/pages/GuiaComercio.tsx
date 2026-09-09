import React, { useMemo, useState } from 'react';
import {
  Search, Star, Store, Globe2, SlidersHorizontal, Sparkles, BadgeCheck,
  ArrowRight, Users, Eye, TrendingUp, Crown, CheckCircle2,
  Megaphone,
} from 'lucide-react';
import type { BusinessType, Estabelecimento } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { BusinessCard, CtaBanner, LinhaNegocioSimples } from '../components/ui/Cards';
import { getEstabelecimentos, getPageHeroImages } from '../lib/db';
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
  const heroImages = getPageHeroImages();

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
        kicker="Guia completo"
        title="Guia de Comércio e Serviços de Guararema"
        description="Onde quem visita a Cidade Natureza procura antes de decidir — e onde o seu negócio deveria estar. Gastronomia, hospedagem, experiências e comércio local com reputação real."
        image={heroImages.guiaComercio}
        meta="Diretório colaborativo atualizado pela comunidade"
      />

      {/* Barra de oferta sponsor */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-6 sm:px-8 shadow-xl shadow-olive/15">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-white">O seu negócio por aqui, todo dia.</p>
                  <p className="text-sm text-white/85 mt-1 max-w-2xl">
                    Futuros clientes pesquisam vocês no Guararema.net antes de escolher: mais <strong className="text-white">mesas</strong>, mais <strong className="text-white">hóspedes</strong> e mais <strong className="text-white">serviços contratados</strong> para quem aparece bem.
                  </p>
                </div>
              </div>
              <Link
                to="/cadastro"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-olive-deep font-bold px-7 py-3 text-sm shadow-lg hover:bg-olive-soft transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
              >
                Colocar meu negócio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proposta de valor para quem anuncia */}
      <section className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por que anunciar"
            title="Cliente certo, na hora certa, no lugar em que ele já procura"
            description="Quem decide onde comer, dormir e passear em Guararema passa por aqui. Seja encontrado no momento da escolha — e transforme visita em reserva."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: Eye, titulo: 'Visibilidade no momento da compra', texto: 'Seu card aparece quando alguém busca exatamente o que você oferece — gastronomia, hospedagem, experiência ou serviço.' },
              { icon: Star, titulo: 'Reputação que gera confiança', texto: 'Avaliações da comunidade e o selo de destaque fazem o visitante escolher você com mais segurança e menos hesitação.' },
              { icon: TrendingUp, titulo: 'Ações que trazem resultado real', texto: 'Botão de WhatsApp, ligação, endereço no mapa e fotos: cada detalhe pensado para converter leitura em contato.' },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.titulo} className="bg-surface rounded-3xl border border-olive/10 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-olive/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-olive-deep text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-olive-deep mb-2">{v.titulo}</h3>
                  <p className="text-sm text-muted leading-relaxed">{v.texto}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Store, valor: String(todos.length), rotulo: 'Negócios cadastrados' },
              { icon: Globe2, valor: String(totalCategorias), rotulo: 'Categorias diferentes' },
              { icon: Users, valor: String(totalAvaliacoes), rotulo: 'Avaliações da comunidade' },
              { icon: Sparkles, valor: String(totalDestaques), rotulo: 'Em destaque' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.rotulo} className="bg-surface rounded-3xl border border-olive/10 p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-olive-deep text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-olive-deep leading-none">{s.valor}</p>
                    <p className="text-xs text-muted mt-1">{s.rotulo}</p>
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
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    categoria === c
                      ? 'bg-olive text-white shadow-lg shadow-olive/25'
                      : 'bg-surface border border-olive/15 text-olive-deep hover:bg-olive-soft'
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

          {/* Bloco upgrade plano completo */}
          <section className="mt-12 mb-12">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-olive-deep via-olive-deep to-olive px-6 py-10 sm:px-12 sm:py-12 shadow-xl shadow-olive/15">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 -left-12 w-56 h-56 bg-olive/30 rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute top-5 left-12 w-2 h-2 rounded-full bg-white/40" />
              <div className="absolute bottom-6 right-16 w-3 h-3 rounded-full bg-white/30" />

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-5">
                  <Crown className="w-3.5 h-3.5" /> Plano Destaque
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Quer aparecer antes dos outros? Cards completos com fotos e destaque.
                </h3>
                <p className="text-white/85 mt-3 max-w-2xl mx-auto leading-relaxed">
                  O plano gratuito já resolve, mas quem escolhe o plano Destaque ganha logo, galeria de fotos,
                  horário de funcionamento, WhatsApp na ficha e selo de confiança — tudo isso aparecendo no topo da busca.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-7">
                  <Link
                    to="/contato"
                    className="group inline-flex items-center gap-2 rounded-full bg-white text-olive-deep font-bold px-7 py-3.5 text-sm shadow-lg hover:bg-olive-soft transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Solicitar plano completo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/cadastro"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white border border-white/25 font-semibold px-7 py-3.5 text-sm hover:bg-white/25 transition-colors"
                  >
                    Comece grátis agora
                  </Link>
                </div>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-7 text-white/85 text-xs font-semibold">
                  {[
                    'Sem contrato mensal',
                    'Aprovação em até 48h',
                    'Suporte para atualizações',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/90" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>

      <CtaBanner
        title="Não deixe seu cliente escolher outro lugar"
        description={`Mais de ${todos.length} negócios já estão no Guia. Cadastre o seu agora e receba contatos diretos pelo Guararema.net — grátis e sem compromisso.`}
        textButton="Cadastre minha empresa agora"
        to="/cadastro"
      />
    </>
  );
};