import React from 'react';
import { Train, Clock, CheckCircle2, Route, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

const highlights = [
  { icon: Route, title: '6,8 km de trilhos', text: 'Do Centro à Vila de Luís Carlos' },
  { icon: Clock, title: '~2h30 de passeio', text: 'Parada livre na Vila' },
  { icon: Camera, title: 'Pontilhão histórico', text: 'O cenário mais fotografado' },
  { icon: CheckCircle2, title: 'Fins de semana', text: 'Saídas regulares e antecipadas' },
];

export const TrainSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-surface to-mist relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-umber-soft rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <img
              src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1000&auto=format&fit=crop&q=80"
              alt="Maria Fumaça de Guararema"
              loading="lazy"
              className="rounded-[2.5rem] object-cover w-full h-[24rem] lg:h-[30rem] shadow-2xl shadow-olive/20"
            />
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-umber text-white rounded-3xl px-6 py-5 shadow-xl max-w-[15rem]">
              <div className="text-xs font-bold uppercase tracking-widest text-umber-tint mb-1">Trem nº 353</div>
              <div className="text-sm font-semibold leading-snug">A maior locomotiva a vapor em operação no Brasil</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Experiência imperdível"
              title="Um passeio no tempo: a Maria Fumaça"
              description="Embarque na locomotiva a vapor que liga o Centro de Guararema à encantadora Vila de Luís Carlos, atravessando o histórico Pontilhão sobre o Rio Paraíba do Sul."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-9">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="flex items-start gap-3 bg-surface rounded-2xl border border-olive/10 p-4">
                    <div className="w-9 h-9 rounded-xl bg-olive-soft text-olive-deep flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-olive-deep">{h.title}</h4>
                      <p className="text-xs text-muted mt-0.5">{h.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button to="/pontos-turisticos/estacao-de-trem-maria-fumaca-e-pontilhao" size="lg" icon={<Train className="w-5 h-5" />}>
                Ver roteiro da Maria Fumaça
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};