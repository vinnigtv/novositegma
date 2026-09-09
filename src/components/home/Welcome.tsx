import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake, MapPinned, ArrowRight, Quote } from 'lucide-react';
import { Link } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';

const virtues = [
  { icon: ShieldCheck, label: 'Baixíssimo índice de criminalidade' },
  { icon: Leaf, label: 'Fauna e flora muito preservadas' },
  { icon: HeartHandshake, label: 'Clima agradável e recepção calorosa' },
  { icon: MapPinned, label: 'Dutra ou Ayrton Senna/Carvalho Pinto' },
];

export const Welcome: React.FC = () => {
  return (
    <section className="py-24 bg-surface border-y border-olive/10 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-olive-soft rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="Bem-vindo à Guararema!"
              title={
                <>
                  Mas não acelere demais.{' '}
                  <span className="text-umber">Ainda paramos os carros para atravessar.</span>
                </>
              }
            />

            <div className="mt-6 space-y-4 text-ink/80 leading-relaxed">
              <p>
                Apesar de estarmos pertinho de São Paulo — cerca de uma hora por duas ótimas estradas —,
                Guararema guarda as características das pequenas cidades de antigamente: segurança,
                natureza preservada, clima gostoso, atividades ao ar livre, ótima comida e muita hospitalidade.
              </p>
              <p className="text-sm text-muted">
                Se você pretende nos visitar, permita que a gente apresente os pontos mais procurados e, de
                quebra, alguns segredinhos que ninguém mais vai contar para você.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
              {virtues.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-olive-soft/60 border border-olive/10"
                  >
                    <Icon className="w-5 h-5 text-umber flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-olive-deep">{v.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                to="/a-cidade"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-olive hover:text-umber transition-colors"
              >
                Conhecer a história de Guararema
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80"
                alt="Recanto do Américo em Guararema"
                loading="lazy"
                className="rounded-3xl h-64 sm:h-72 object-cover w-full shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=700&auto=format&fit=crop&q=80"
                alt="Vila de Luís Carlos"
                loading="lazy"
                className="rounded-3xl h-64 sm:h-72 object-cover w-full mt-10 shadow-lg"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&auto=format&fit=crop&q=80"
                alt="Parque da Ilha Grande"
                loading="lazy"
                className="rounded-3xl h-40 sm:h-44 object-cover w-3/5 shadow-lg"
              />
              <div className="w-2/5 flex flex-col justify-center items-center bg-olive-deep rounded-3xl p-5 text-white text-center">
                <Quote className="w-6 h-6 mb-1 text-umber-tint" />
                <p className="text-xs font-medium leading-snug">A cidade onde o tempo passa devagar e as memórias ficam para sempre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};