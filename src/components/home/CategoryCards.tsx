import React from 'react';
import { UtensilsCrossed, BedDouble, Sparkles, Store, ArrowRight } from 'lucide-react';
import { Link } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';

const categories = [
  {
    icon: UtensilsCrossed,
    title: 'Pra Comer',
    to: '/pra-comer',
    description: 'Restaurantes, pizzarias, hamburguerias, bares, cafeterias, sorveterias, alambiques e pesqueiros.',
    samples: ['Restaurante Mirante do Paraíba', 'Forneria Toscana', 'Cafeteria Central'],
  },
  {
    icon: BedDouble,
    title: 'Onde Dormir',
    to: '/onde-dormir',
    description: 'Hotéis, hotéis-fazenda, pousadas, chalés, hostels, chácaras, sítios, estúdios e campings.',
    samples: ['Pousada Sapucaia', 'Hotel Fazenda Matão', 'Chalé Luís Carlos'],
  },
  {
    icon: Sparkles,
    title: 'O que Fazer',
    to: '/o-que-fazer',
    description: 'Lazer, histórica, cultural, aventura, rural, ecoturismo, saúde e bem-estar, entretenimento.',
    samples: ['Trilhas da Pedra Montada', 'Bike Box', 'My Park Tickets'],
  },
  {
    icon: Store,
    title: 'Comércio & Serviços',
    to: '/guia-de-comercios-e-servicos',
    description: 'Estética, vestuário, saúde, pets, imóveis, eletrônicos, educação, construção e prestadores.',
    samples: ['Farma Conde', 'Monteiro Supermercados', 'CN Arquitetura'],
  },
];

export const CategoryCards: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="É um prazer ter você aqui!"
          title="Escolha a sua rota"
          description="Tudo o que você precisa para montar o passeio perfeito pela Cidade Natureza."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                to={cat.to}
                className="group flex flex-col bg-surface rounded-3xl border border-olive/10 shadow-sm hover:shadow-xl hover:shadow-olive/10 hover:-translate-y-1 transition-all duration-300 p-7"
              >
                <div className="w-12 h-12 rounded-2xl bg-olive-soft text-olive-deep flex items-center justify-center mb-5 group-hover:bg-umber group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-olive-deep mb-2 group-hover:text-umber transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{cat.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {cat.samples.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-ink/70">
                      <span className="w-1 h-1 rounded-full bg-umber" />
                      {s}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-olive group-hover:text-umber transition-colors">
                  Ver opções
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};