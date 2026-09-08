import React from 'react';
import { ArrowRight, Train, Trees, MapPin, Star, Landmark } from 'lucide-react';
import { Link } from '../../lib/router';
import { Button } from '../ui/Button';
import { Carrossel } from '../ui/Carrossel';
import { getSlidesHero } from '../../lib/db';

const stats = [
  { icon: MapPin, value: '80 km', label: 'De São Paulo' },
  { icon: Trees, value: '+15', label: 'Parques e recantos' },
  { icon: Landmark, value: '1652', label: 'Ano da Igreja da Escada' },
  { icon: Star, value: '4,9/5', label: 'Avaliação dos visitantes' },
];

export const Hero: React.FC = () => {
  const slides = getSlidesHero();

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Hero background carousel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Carrossel
            fotos={slides.map((s) => s.imagem)}
            alt=""
            autoplay
            intervalo={4000}
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.35)_78%)] pointer-events-none" />
      </div>

      {/* Decorative accents */}
      <div className="absolute top-24 left-10 w-2.5 h-2.5 rounded-full bg-umber/50 z-0" />
      <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-olive/40 z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-olive-deep/30 z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold mb-7 shadow-lg shadow-black/30">
          <span className="w-2 h-2 rounded-full bg-umber animate-pulse" />
          A Cidade Natureza · a 80 km de São Paulo
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_8px_40px_rgba(0,0,0,0.6)]">
          Visite, conheça e ame Guararema.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-2xl mx-auto mb-10 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
          Reconhecida pela qualidade de vida, segurança e preservação da natureza, Guararema reúne tudo o que
          você procura: história, gastronomia, ecoturismo e a serenidade de uma cidade de interior.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            to="/pontos-turisticos"
            size="lg"
            className="border-2 border-white"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Conhecer Pontos Turísticos
          </Button>
          <Button variant="light" to="/o-que-fazer" size="lg" icon={<Train className="w-5 h-5" />}>
            Ver o que Fazer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16 max-w-3xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface/85 backdrop-blur rounded-2xl border border-olive/10 shadow-sm px-4 py-5 text-center hover:border-umber/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-umber mx-auto mb-2" />
                <div className="text-2xl font-bold text-olive-deep font-heading">{stat.value}</div>
                <div className="text-[11px] font-semibold text-muted mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <Link
        to="/a-cidade"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/85 text-[10px] font-bold uppercase tracking-[0.25em] hover:text-umber transition-colors"
      >
        Descubra
        <span className="w-5 h-8 rounded-full border-2 border-white/70 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-umber animate-bounce" />
        </span>
      </Link>
    </section>
  );
};