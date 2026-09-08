import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { BusinessCard, CtaBanner } from '../components/ui/Cards';
import { getEstabelecimentosPorTipo } from '../lib/db';
import type { BusinessType, Estabelecimento } from '../types';

interface ListagemConfig {
  tipo: BusinessType;
  titulo: string;
  descricao: string;
  heroImage: string;
  kicker: string;
  resumo: string;
}

const configPorTipo: Record<BusinessType, ListagemConfig> = {
  comer: {
    tipo: 'comer',
    titulo: 'Pra Comer',
    descricao: 'Conheça nossa culinária: restaurantes, pizzarias, hamburguerias, bares, cafeterias, sorveterias, alambiques, pesqueiros e muito mais.',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80',
    kicker: 'Gastronomia',
    resumo: 'A comida é parte do roteiro — e em Guararema ela é caprichada.',
  },
  dormir: {
    tipo: 'dormir',
    titulo: 'Onde Dormir',
    descricao: 'Toda a hospitalidade que você merece: hotéis, hotéis-fazenda, pousadas, chalés, hostels, chácaras, sítios, estúdios e campings.',
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&auto=format&fit=crop&q=80',
    kicker: 'Hospedagem',
    resumo: 'Acorde com a natureza ao redor em Guararema.',
  },
  fazer: {
    tipo: 'fazer',
    titulo: 'O que Fazer',
    descricao: 'Independente da sua rota — lazer, histórica, cultural, aventura, rural, ecoturismo, bem-estar ou entretenimento — aqui tem programa.',
    heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=80',
    kicker: 'Experiências',
    resumo: 'Aventura e relaxamento na medida certa.',
  },
  guia: {
    tipo: 'guia',
    titulo: 'Guia de Comércio & Serviços',
    descricao: 'Tudo o que você precisa conhecer: estética e beleza, vestuário, saúde, pets, imóveis, eletrônicos, educação, construção e prestadores especializados.',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80',
    kicker: 'Comércio local',
    resumo: 'A cidade que se cuida e se desenvolve com negócios de gente da terra.',
  },
};

export const ListagemPage: React.FC<{ tipo: BusinessType }> = ({ tipo }) => {
  const config = configPorTipo[tipo];
  const [categoria, setCategoria] = useState('todas');
  const [busca, setBusca] = useState('');

  const todos = getEstabelecimentosPorTipo(tipo);
  const categorias = ['todas', ...Array.from(new Set(todos.map((e) => e.categoria)))];

  const filtradas: Estabelecimento[] = todos.filter((e) => {
    const porCategoria = categoria === 'todas' || e.categoria === categoria;
    const termo = busca.trim().toLowerCase();
    const porBusca =
      termo === '' ||
      e.nome.toLowerCase().includes(termo) ||
      e.descricao.toLowerCase().includes(termo) ||
      e.tags.some((t) => t.toLowerCase().includes(termo));
    return porCategoria && porBusca;
  });

  return (
    <>
      <PageHero crumb="/" kicker={config.kicker} title={config.titulo} description={config.descricao} image={config.heroImage} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {categorias.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    categoria === c
                      ? 'bg-olive text-white shadow-lg shadow-olive/25'
                      : 'bg-surface border border-olive/15 text-olive-deep hover:bg-olive-soft'
                  }`}
                >
                  {c === 'todas' ? 'Todas' : c}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder={`Buscar por nome, tag ou categoria...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
              />
            </div>
          </div>

          {filtradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtradas.map((empresa) => (
                <BusinessCard key={empresa.id} empresa={empresa} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-3xl border border-olive/10">
              <p className="text-olive-deep font-semibold">Nenhum estabelecimento encontrado com esses filtros.</p>
              <p className="text-sm text-muted mt-1">Tente trocar a busca ou selecionar outra categoria.</p>
            </div>
          )}

          <p className="mt-8 text-xs text-muted">
            Relação atualizada pela comunidade Guia Guararema. Faltou algum lugar? Chame a gente pelo contato.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Seu negócio pode estar aqui"
        description="Destaque sua empresa no guia da Cidade Natureza e alcance visitantes do Brasil inteiro."
        textButton="Seja parceiro do Guia"
        to="/contato"
      />
    </>
  );
};