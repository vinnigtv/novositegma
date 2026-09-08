import React from 'react';
import { Sparkles, Star, PartyPopper, Snowflake } from 'lucide-react';
import { Link } from '../lib/router';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { getPageHeroImages } from '../lib/db';

const atracoesNatal = [
  {
    icon: Sparkles,
    titulo: 'Casa do Papai Noel',
    texto: 'Uma casa temática montada no centro, com horários de visitação e fotos para toda a família.',
  },
  {
    icon: Star,
    titulo: 'Túneis de luz',
    texto: 'Os tradicionais túneis iluminados transformam a cidade em um dos natais mais bonitos do Vale do Paraíba.',
  },
  {
    icon: PartyPopper,
    titulo: 'Programação cultural',
    texto: 'Coral, orquestra, contação de histórias e apresentações ao redor do coreto durante todo o mês.',
  },
  {
    icon: Snowflake,
    titulo: 'Neve artificial',
    texto: 'Em datas selecionadas, a "neve" cai sobre os visitantes — a alegria das crianças é garantida.',
  },
];

export const CidadeNatalPage: React.FC = () => {
  const heroImages = getPageHeroImages();

  return (
    <>
      <PageHero
        kicker="Eventos especiais"
        title="Cidade Natal"
        description="No fim do ano, Guararema se transforma: luzes, música e uma atmosfera mágica que encanta crianças e adultos."
        image={heroImages.cidadeNatal}
        meta="Dezembro · Centro Histórico"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionHeading
              align="center"
              eyebrow="O Natal da Cidade Natureza"
              title="A cidade inteira vira um presépio"
              description="Tradição que já virou patrimônio dos guararemenses: por semanas, as ruas ganham luz, o coreto recebe coral e a Casa do Papai Noel abre as portas para os pequenos."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atracoesNatal.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.titulo} className="bg-surface rounded-3xl border border-olive/10 p-7 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-olive to-umber text-white flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-olive-deep mb-2">{a.titulo}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a.texto}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img
              src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=900&auto=format&fit=crop&q=80"
              alt="Luzes de Natal"
              loading="lazy"
              className="rounded-[2rem] h-64 object-cover w-full"
            />
            <div className="rounded-[2rem] bg-gradient-to-br from-umber to-umber-deep p-10 flex flex-col justify-center text-white">
              <h3 className="font-bold text-2xl mb-3">Planeje sua noite mágica</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-6">
                Reserve sua hospedagem com antecedência — dezembro é o mês mais movimentado do ano em
                Guararema. Combine a visita com a Vila de Luís Carlos e encerre com um jantar à beira do rio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/onde-dormir"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-umber-deep font-semibold px-6 py-3 text-sm hover:bg-umber-soft transition-colors"
                >
                  Onde dormir
                </Link>
                <Link
                  to="/pra-comer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur text-white font-semibold px-6 py-3 text-sm hover:bg-white/25 transition-colors"
                >
                  Pra comer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};