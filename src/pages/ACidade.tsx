import React from 'react';
import { ShieldCheck, Leaf, MapPin, TrainFront, Landmark, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CtaBanner } from '../components/ui/Cards';
import { CidadeCarrossel } from '../components/ui/CidadeCarrossel';
import { Link } from '../lib/router';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Qualidade de vida e segurança',
    text: 'Um dos menores índices de criminalidade do estado, com o ritmo gostoso das cidades pequenas de verdade.',
  },
  {
    icon: MapPin,
    title: 'Localização privilegiada',
    text: 'A 80 km da capital e pertinho do litoral, com acesso pelas rodovias Dutra ou Ayrton Senna/Carvalho Pinto.',
  },
  {
    icon: Leaf,
    title: 'Preservação e natureza',
    text: 'Referência estadual em cuidados ambientais: rios limpos, mata atlântica preservada e fauna generosa.',
  },
];

const timelines = [
  { ano: '1652', label: 'Igreja da Freguesia da Escada' },
  { ano: '1891', label: 'Chegada da ferrovia e construção da estação' },
  { ano: '1919', label: 'Fundação da Matriz de São Benedito' },
  { ano: 'Hoje', label: 'A Cidade Natureza que encanta milhares de visitantes' },
];

export const ACidadePage: React.FC = () => {
  return (
    <>
      <PageHero
        crumb="/"
        kicker="A Cidade"
        title="A Cidade Natureza"
        description="Reconhecida pela qualidade de vida, segurança e cuidado com a natureza, Guararema é o refúgio perfeito a uma hora da capital."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80"
      />

      <CidadeCarrossel />

      {/* Narrative */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading
                eyebrow="Nossa história"
                title="Uma cidade construída sobre trilhos e fé"
              />
              <div className="mt-6 space-y-4 text-ink/80 leading-relaxed">
                <p>
                  Guararema nasceu e cresceu ao redor da fé e da ferrovia. A vila que se formou junto à
                  histórica estrada que ligava o Vale do Paraíba ao litoral ganhou, em 1652, a igreja mais
                  antiga da região — a Freguesia da Escada — tornando-se um ponto de parada obrigatória
                  para viajantes e tropeiros.
                </p>
                <p>
                  Com a chegada do trem em 1891, a cidade se conectou ao mundo sem abrir mão da simplicidade.
                  Os antigos trilhos hoje guiam o famoso passeio da Maria Fumaça, unindo o Centro à charmosa
                  Vila de Luís Carlos, e a cidade vive um novo capítulo: ser referência em turismo sustentável.
                </p>
                <p className="text-sm text-muted">
                  É esse equilíbrio entre passado, natureza e hospitalidade que faz Guararema ser chamada,
                  hoje, de Cidade Natureza.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-surface rounded-3xl border border-olive/10 shadow-sm p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-umber mb-6">Linha do tempo</h3>
              <div className="space-y-6 relative before:absolute before:left-[1.55rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-olive/20">
                {timelines.map((t) => (
                  <div key={t.ano} className="relative flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-olive-soft text-olive-deep font-heading text-xs font-bold flex items-center justify-center z-10 shrink-0">
                      {t.ano}
                    </div>
                    <p className="text-sm font-semibold text-ink/80 pt-3">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-surface border-y border-olive/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Por que Guararema"
            title="Três razões para se apaixonar"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-mist rounded-3xl border border-olive/10 p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-olive to-umber text-white flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-olive-deep mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery / icons strip */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Explore"
            title="A cidade tem rota para cada gosto"
            description="Natureza, história, cultura, aventura ou gastronomia: encontre o melhor de Guararema em cada passeio."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: TrainFront, label: 'Ferroviária', to: '/pontos-turisticos/estacao-de-trem-maria-fumaca-e-pontilhao' },
              { icon: Landmark, label: 'Histórica', to: '/pontos-turisticos/igreja-da-freguesia-da-escada-e-sao-longuinho' },
              { icon: Leaf, label: 'Ecoturismo', to: '/pontos-turisticos/pau-dalho' },
              { icon: MapPin, label: 'Pôr do Sol', to: '/pontos-turisticos/mirante-do-gerbasio' },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.label}
                  to={r.to}
                  className="group bg-surface rounded-3xl border border-olive/10 p-6 text-center hover:border-umber/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-7 h-7 text-umber mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-olive-deep">Rota {r.label}</span>
                  <ArrowRight className="w-4 h-4 text-olive mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vem conhecer a Cidade Natureza"
        description="Planejou tudo? Compartilhe seu roteiro com a gente e descubra os segredinhos que ninguém mais conta."
        textButton="Falar com o Guia Guararema"
        to="/contato"
      />
    </>
  );
};