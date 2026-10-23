import React from 'react';
import { ArrowRight, Train, Trees, MapPin, Star, Landmark, Quote } from 'lucide-react';
import { Button } from '../ui/Button';
import { getSlidesHero } from '../../lib/db';

const stats = [
  { icon: MapPin, value: '80 km', label: 'De São Paulo' },
  { icon: Trees, value: '+15', label: 'Parques e recantos' },
  { icon: Landmark, value: '1652', label: 'Ano da Igreja da Escada' },
  { icon: Star, value: '4,9/5', label: 'Avaliação dos visitantes' },
];

export const Hero: React.FC = () => {
  const slides = getSlidesHero();
  // Três blocos de imagem: use os slides gerenciados no painel (Admin > Hero).
  const fotos = [slides[0], slides[1] ?? slides[0], slides[2] ?? slides[0]];

  return (
    <section className="relative py-20 lg:py-24 bg-surface border-b border-olive/10 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-olive-soft rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-umber-soft rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Conteúdo */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-soft text-olive-deep border border-olive/10 text-xs sm:text-sm font-semibold mb-7">
              <span className="w-2 h-2 rounded-full bg-umber animate-pulse" />
              Guararema · a 80 km de São Paulo
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-olive-deep leading-[1.05] mb-6">
              <span className="block">Visite, conheça e</span>
              <span className="block">ame Guararema.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink/80 font-normal leading-relaxed max-w-xl mb-10">
              Reconhecida pela qualidade de vida, segurança e preservação da natureza, Guararema reúne tudo o que
              você procura: história, gastronomia, ecoturismo e a serenidade de uma cidade de interior.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Button
                to="/pontos-turisticos"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Conhecer Pontos Turísticos
              </Button>
              <Button variant="outline" to="/o-que-fazer" size="lg" icon={<Train className="w-5 h-5" />}>
                Ver o que Fazer
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-12 max-w-lg">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl border border-olive/10 shadow-sm px-4 py-5 text-center hover:border-umber/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-umber mx-auto mb-2" />
                    <div className="text-2xl font-bold text-olive-deep font-heading">{stat.value}</div>
                    <div className="text-[11px] font-semibold text-muted mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mosaico: 3 imagens + frase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={fotos[0].imagem}
                alt={fotos[0].titulo}
                className="rounded-3xl h-64 sm:h-72 object-cover w-full shadow-lg"
              />
              <img
                src={fotos[1].imagem}
                alt={fotos[1].titulo}
                loading="lazy"
                className="rounded-3xl h-64 sm:h-72 object-cover w-full mt-10 shadow-lg"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <img
                src={fotos[2].imagem}
                alt={fotos[2].titulo}
                loading="lazy"
                className="rounded-3xl h-40 sm:h-44 object-cover w-3/5 shadow-lg"
              />
              <div className="w-2/5 flex flex-col justify-center items-center bg-olive-deep rounded-3xl p-5 text-white text-center">
                <Quote className="w-6 h-6 mb-1 text-umber-tint" />
                <p className="text-xs font-medium leading-snug">
                  Um destino para desacelerar, respirar e voltar sempre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
