import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';
import { AtracaoCard } from '../ui/Cards';
import { getAtracoes } from '../../lib/db';

export const Featured: React.FC = () => {
  const featured = getAtracoes().filter((a) => a.destaque).slice(0, 6);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Pontos turísticos"
            title="Os favoritos da Cidade Natureza"
            description="Destinos escolhidos a dedo por quem conhece Guararema de coração. Perfeitos para o primeiro roteiro."
          />
          <Link
            to="/pontos-turisticos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-olive hover:text-umber transition-colors flex-shrink-0"
          >
            Ver todos os pontos
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((atracao) => (
            <AtracaoCard key={atracao.slug} atracao={atracao} />
          ))}
        </div>
      </div>
    </section>
  );
};